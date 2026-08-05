import { useEffect, useMemo, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { Card, Button } from '../components/ui'
import { useProgramContext } from '../context/ProgramContext'
import { getPlatformData } from '../services/platformService'
import type { Assessment, Assignment, Course, Lesson, ModuleItem } from '../types'

type AdminCourseState = {
  courses: Course[]
  modules: ModuleItem[]
  lessons: Lesson[]
  assignments: Assignment[]
  assessments: Assessment[]
}

const storageKey = 'songa-admin-course-state-v1'

function loadAdminCourseState(): AdminCourseState {
  const platformData = getPlatformData()
  if (typeof window === 'undefined') {
    return { courses: platformData.courses, modules: platformData.modules, lessons: platformData.lessons, assignments: platformData.assignments, assessments: platformData.assessments }
  }

  const raw = window.localStorage.getItem(storageKey)
  if (!raw) {
    return { courses: platformData.courses, modules: platformData.modules, lessons: platformData.lessons, assignments: platformData.assignments, assessments: platformData.assessments }
  }

  try {
    const parsed = JSON.parse(raw) as AdminCourseState
    return {
      courses: parsed.courses?.length ? parsed.courses : platformData.courses,
      modules: parsed.modules?.length ? parsed.modules : platformData.modules,
      lessons: parsed.lessons?.length ? parsed.lessons : platformData.lessons,
      assignments: parsed.assignments?.length ? parsed.assignments : platformData.assignments,
      assessments: parsed.assessments?.length ? parsed.assessments : platformData.assessments,
    }
  } catch {
    return { courses: platformData.courses, modules: platformData.modules, lessons: platformData.lessons, assignments: platformData.assignments, assessments: platformData.assessments }
  }
}

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`
}

export function AdminCoursesPage() {
  const { activeProgram } = useProgramContext()
  const [adminState, setAdminState] = useState<AdminCourseState>(() => loadAdminCourseState())
  const [courseForm, setCourseForm] = useState({ name: '', description: '', academy: '', mentor: '', duration: '', coverImage: '' })
  const [moduleForms, setModuleForms] = useState<Record<string, { title: string; resources: string }>>({})
  const [lessonForms, setLessonForms] = useState<Record<string, { title: string; type: Lesson['type']; content: string; videoUrl: string; materialUrl: string; attachmentName: string }>>({})
  const [activityForms, setActivityForms] = useState<Record<string, { type: 'Quiz' | 'Assignment'; title: string; date: string; moduleId: string; instructions: string }>>({})
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null)

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(adminState))
  }, [adminState])

  const programCourses = useMemo(() => adminState.courses.filter((course) => course.program === activeProgram.name), [adminState.courses, activeProgram.name])

  const addCourse = (event: React.FormEvent) => {
    event.preventDefault()
    if (!courseForm.name.trim() || !courseForm.description.trim()) return

    const newCourse: Course = {
      id: createId('course'),
      name: courseForm.name.trim(),
      program: activeProgram.name,
      academy: courseForm.academy.trim() || 'New Academy',
      description: courseForm.description.trim(),
      mentor: courseForm.mentor.trim() || 'Pending mentor',
      duration: courseForm.duration.trim() || '4 weeks',
      progress: 0,
      status: 'Active',
      modules: [],
      coverImage: courseForm.coverImage,
    }

    setAdminState((current) => ({ ...current, courses: [...current.courses, newCourse] }))
    setCourseForm({ name: '', description: '', academy: '', mentor: '', duration: '', coverImage: '' })
  }

  const addModule = (courseId: string) => {
    const draft = moduleForms[courseId]
    if (!draft?.title.trim()) return

    if (editingModuleId) {
      setAdminState((current) => ({
        ...current,
        modules: current.modules.map((module) => module.id === editingModuleId ? { ...module, title: draft.title.trim(), resources: draft.resources.split(',').map((item) => item.trim()).filter(Boolean) } : module),
      }))
      setEditingModuleId(null)
      setModuleForms((current) => ({ ...current, [courseId]: { title: '', resources: '' } }))
      return
    }

    const newModule: ModuleItem = {
      id: createId('module'),
      courseId,
      title: draft.title.trim(),
      number: adminState.modules.filter((module) => module.courseId === courseId).length + 1,
      status: 'Locked',
      lessons: [],
      resources: draft.resources.split(',').map((item) => item.trim()).filter(Boolean),
    }

    setAdminState((current) => ({
      ...current,
      modules: [...current.modules, newModule],
      courses: current.courses.map((course) => course.id === courseId ? { ...course, modules: [...course.modules, newModule.id] } : course),
    }))

    setModuleForms((current) => ({ ...current, [courseId]: { title: '', resources: '' } }))
  }

  const addLesson = (moduleId: string) => {
    const draft = lessonForms[moduleId]
    if (!draft?.title.trim()) return

    const newLesson: Lesson = {
      id: createId('lesson'),
      moduleId,
      title: draft.title.trim(),
      type: draft.type,
      content: draft.content.trim() || 'Add notes for this learning section.',
      videoUrl: draft.videoUrl.trim() || undefined,
      materialUrl: draft.materialUrl || undefined,
      attachmentName: draft.attachmentName || undefined,
    }

    setAdminState((current) => ({ ...current, lessons: [...current.lessons, newLesson] }))
    setLessonForms((current) => ({ ...current, [moduleId]: { title: '', type: 'Reading', content: '', videoUrl: '', materialUrl: '', attachmentName: '' } }))
  }
  const addActivity = (courseId: string) => {
  const draft = activityForms[courseId]

  if (!draft?.title.trim()) return

  if (draft.type === 'Assignment') {
    const newAssignment: Assignment = {
      id: createId('assignment'),
      title: draft.title.trim(),
      courseId,
      deadline: draft.date,
      instructions: draft.instructions.trim() || 'Add assignment instructions.',
      status: 'Draft',
    }

    setAdminState((current) => ({
      ...current,
      assignments: [...current.assignments, newAssignment],
      modules: current.modules.map((module) => module.id === draft.moduleId ? { ...module, assignmentId: newAssignment.id } : module),
    }))
  }

  if (draft.type === 'Quiz') {
    const newAssessment: Assessment = {
      id: createId('assessment'),
      courseId,
      title: draft.title.trim(),
      type: 'Quiz',
      date: draft.date,
      dueDate: draft.date,
      graded: false,
    }

    setAdminState((current) => ({
      ...current,
      assessments: [...current.assessments, newAssessment],
      modules: current.modules.map((module) => module.id === draft.moduleId ? { ...module, quizId: newAssessment.id } : module),
    }))
  }

  setActivityForms((current) => ({
    ...current,
    [courseId]: {
      type: 'Assignment',
      title: '',
      date: '', moduleId: '', instructions: '',
    },
  }))
}

  const removeCourse = (courseId: string) => {
    setAdminState((current) => ({
      ...current,
      courses: current.courses.filter((course) => course.id !== courseId),
      modules: current.modules.filter((module) => module.courseId !== courseId),
      lessons: current.lessons.filter((lesson) => !current.modules.some((module) => module.id === lesson.moduleId && module.courseId === courseId)),
    }))
  }

  const removeModule = (moduleId: string) => {
    setAdminState((current) => ({
      ...current,
      modules: current.modules.filter((module) => module.id !== moduleId),
      courses: current.courses.map((course) => ({ ...course, modules: course.modules.filter((item) => item !== moduleId) })),
      lessons: current.lessons.filter((lesson) => lesson.moduleId !== moduleId),
    }))
  }

  const removeLesson = (lessonId: string) => {
    setAdminState((current) => ({ ...current, lessons: current.lessons.filter((lesson) => lesson.id !== lessonId) }))
  }

  return (
    <PageShell title="Learning Management" subtitle="Build courses, structure modules, draft lessons, and prepare assignments from one focused workspace.">
      <Card className="admin-ops-hero">
        <div>
          <p className="eyebrow">Learning operations center</p>
          <h3>{activeProgram.name}</h3>
          <p>Keep the selected program aligned with a clear draft-to-preview-to-publish lesson workflow.</p>
        </div>
        <div className="admin-ops-badges">
          <span>Programs</span>
          <span>Courses</span>
          <span>Modules</span>
          <span>Lessons</span>
          <span>Assignments</span>
          <span>Assessments</span>
        </div>
      </Card>

      <div className="admin-ops-grid">
        <Card className="admin-ops-side-card">
          <div className="card-heading-row">
            <div>
              <p className="eyebrow">Create a learning path</p>
              <h3>New course</h3>
            </div>
          </div>
          <form className="auth-form" onSubmit={addCourse}>
            <label>
              Course name
              <input value={courseForm.name} onChange={(event) => setCourseForm((current) => ({ ...current, name: event.target.value }))} placeholder="Leadership Lab" />
            </label>
            <label>
              Description
              <textarea rows={4} value={courseForm.description} onChange={(event) => setCourseForm((current) => ({ ...current, description: event.target.value }))} placeholder="What scholars will learn." />
            </label>
            <label>
              Academy
              <input value={courseForm.academy} onChange={(event) => setCourseForm((current) => ({ ...current, academy: event.target.value }))} placeholder="New academy" />
            </label>
            <label>
              Mentor
              <input value={courseForm.mentor} onChange={(event) => setCourseForm((current) => ({ ...current, mentor: event.target.value }))} placeholder="Mentor name" />
            </label>
            <label>
              Duration
              <input value={courseForm.duration} onChange={(event) => setCourseForm((current) => ({ ...current, duration: event.target.value }))} placeholder="4 weeks" />
            </label>
            <label>Course cover image URL<input value={courseForm.coverImage} onChange={(event) => setCourseForm((current) => ({ ...current, coverImage: event.target.value }))} placeholder="https://..." /></label>
            <label>Or upload a cover image<input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => setCourseForm((current) => ({ ...current, coverImage: String(reader.result) })); reader.readAsDataURL(file) }} /></label>
            <Button variant="primary" type="submit">Save course</Button>
          </form>
        </Card>

        <Card className="admin-ops-side-card">
          <div className="card-heading-row">
            <div>
              <p className="eyebrow">Lesson workflow</p>
              <h3>Draft to publish</h3>
            </div>
          </div>
          <div className="admin-lesson-flow">
            <div><strong>Draft</strong><span>Create the lesson structure and title.</span></div>
            <div><strong>Add content blocks</strong><span>Shape the notes and supporting materials.</span></div>
            <div><strong>Preview</strong><span>Review the lesson before it goes live.</span></div>
            <div><strong>Publish</strong><span>Make it available for the course journey.</span></div>
          </div>
          <div className="admin-ops-summary">
            <div><strong>{programCourses.length}</strong><span>courses</span></div>
            <div><strong>{adminState.modules.filter((module) => programCourses.some((course) => course.id === module.courseId)).length}</strong><span>modules</span></div>
            <div><strong>{adminState.lessons.length}</strong><span>lessons</span></div>
          </div>
        </Card>
      </div>

      <div className="card-stack">
        {programCourses.map((course) => {
          const courseModules = adminState.modules.filter((module) => module.courseId === course.id)
          return (
            <Card key={course.id} className="admin-module-stack-card">
              <div className="card-heading-row">
                <div>
                  <p className="eyebrow">Course</p>
                  <h3>{course.name}</h3>
                </div>
                <Button variant="ghost" type="button" onClick={() => removeCourse(course.id)}>Delete course</Button>
              </div>
              <p>{course.description}</p>
              {course.coverImage ? <img className="admin-course-cover" src={course.coverImage} alt={`${course.name} cover`} /> : null}
              <p className="muted-text">Academy: {course.academy} • Mentor: {course.mentor} • Duration: {course.duration}</p>

              <div className="admin-module-stack" style={{ marginTop: 14 }}>
                {courseModules.length ? courseModules.map((module) => {
                  const moduleLessons = adminState.lessons.filter((lesson) => lesson.moduleId === module.id)
                  return (
                    <div key={module.id} className="admin-module-card">
                      <div className="card-heading-row">
                        <div>
                          <p className="eyebrow">Module {module.number}</p>
                          <h3>{module.title}</h3>
                        </div>
                        <div className="setting-actions">
                          <Button variant="secondary" type="button" onClick={() => { setEditingModuleId(module.id); setModuleForms((current) => ({ ...current, [course.id]: { title: module.title, resources: module.resources.join(', ') } })) }}>Edit module</Button>
                          <Button variant="ghost" type="button" onClick={() => removeModule(module.id)}>Remove</Button>
                        </div>
                      </div>
                      {module.resources.length ? <p className="muted-text">Resources: {module.resources.join(', ')}</p> : null}

                      <div className="admin-lesson-list">
                        {moduleLessons.length ? moduleLessons.map((lesson) => (
                          <div key={lesson.id} className="admin-lesson-row">
                            <div>
                              <strong>{lesson.title}</strong>
                              <p>{lesson.type} • {lesson.content}</p>
                            </div>
                            <Button variant="ghost" type="button" onClick={() => removeLesson(lesson.id)}>Delete</Button>
                          </div>
                        )) : <p className="muted-text">No lessons yet. Add the first lesson to start the learning path.</p>}
                      </div>

                      <div className="admin-lesson-editor">
                        <div className="admin-lesson-builder-heading">
                          <div>
                            <p className="eyebrow">Lesson editor</p>
                            <h4>Create a lesson for {module.title}</h4>
                          </div>
                          <span>Draft • Preview • Publish</span>
                        </div>
                        <div className="admin-form-grid">
                          <label>
                            Lesson title
                            <input value={lessonForms[module.id]?.title ?? ''} onChange={(event) => setLessonForms((current) => ({ ...current, [module.id]: { ...(current[module.id] ?? { title: '', type: 'Reading', content: '', videoUrl: '', materialUrl: '', attachmentName: '' }), title: event.target.value } }))} placeholder="e.g. What is HTML?" />
                          </label>
                          <label>
                            Lesson type
                            <select value={lessonForms[module.id]?.type ?? 'Reading'} onChange={(event) => setLessonForms((current) => ({ ...current, [module.id]: { ...(current[module.id] ?? { title: '', type: 'Reading', content: '', videoUrl: '', materialUrl: '', attachmentName: '' }), type: event.target.value as Lesson['type'] } }))}>
                              <option value="Video">Video</option>
                              <option value="Reading">Reading</option>
                              <option value="Quiz">Quiz</option>
                              <option value="Assignment">Assignment</option>
                            </select>
                          </label>
                          <label className="full">
                            Lesson notes
                            <textarea rows={6} value={lessonForms[module.id]?.content ?? ''} onChange={(event) => setLessonForms((current) => ({ ...current, [module.id]: { ...(current[module.id] ?? { title: '', type: 'Reading', content: '', videoUrl: '', materialUrl: '', attachmentName: '' }), content: event.target.value } }))} placeholder="Write a rich lesson summary and instructions for scholars." />
                          </label>
                          <label>
                            Video link (optional)
                            <input value={lessonForms[module.id]?.videoUrl ?? ''} onChange={(event) => setLessonForms((current) => ({ ...current, [module.id]: { ...(current[module.id] ?? { title: '', type: 'Reading', content: '', videoUrl: '', materialUrl: '', attachmentName: '' }), videoUrl: event.target.value } }))} placeholder="https://youtube.com/..." />
                          </label>
                          <label>
                            Supporting material (optional)
                            <input type="file" onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => setLessonForms((current) => ({ ...current, [module.id]: { ...(current[module.id] ?? { title: '', type: 'Reading', content: '', videoUrl: '', materialUrl: '', attachmentName: '' }), materialUrl: String(reader.result), attachmentName: file.name } })); reader.readAsDataURL(file) }} />
                          </label>
                          <div className="setting-actions full">
                            <Button variant="secondary" type="button" onClick={() => addLesson(module.id)}>Create lesson</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }) : <p className="muted-text">There are no modules yet. Add your first module to start building the course journey.</p>}
              </div>

              <div className="admin-lesson-editor" style={{ marginTop: 14 }}>
                <div className="admin-lesson-builder-heading">
                  <div>
                    <p className="eyebrow">Module builder</p>
                    <h4>{editingModuleId ? 'Update the module' : 'Add a new module'}</h4>
                  </div>
                  <span>Resources • sequence</span>
                </div>
                <div className="admin-form-grid">
                  <label className="full">
                    Module title
                    <input value={moduleForms[course.id]?.title ?? ''} onChange={(event) => setModuleForms((current) => ({ ...current, [course.id]: { ...(current[course.id] ?? { title: '', resources: '' }), title: event.target.value } }))} placeholder="Module title" />
                  </label>
                  <label className="full">
                    Resources
                    <input value={moduleForms[course.id]?.resources ?? ''} onChange={(event) => setModuleForms((current) => ({ ...current, [course.id]: { ...(current[course.id] ?? { title: '', resources: '' }), resources: event.target.value } }))} placeholder="Slides, homework, guide" />
                  </label>
                  <div className="setting-actions full">
                    {editingModuleId ? <Button variant="ghost" type="button" onClick={() => { setEditingModuleId(null); setModuleForms((current) => ({ ...current, [course.id]: { title: '', resources: '' } })) }}>Cancel</Button> : null}
                    <Button variant="primary" type="button" onClick={() => addModule(course.id)}>{editingModuleId ? 'Save module' : 'Add module'}</Button>
                  </div>
                </div>
              </div>

              <div className="admin-lesson-editor" style={{ marginTop: 14 }}>
                <div className="admin-lesson-builder-heading">
                  <div>
                    <p className="eyebrow">Learning activities</p>
                    <h4>Attach assignments and quizzes</h4>
                  </div>
                  <span>Monitor completion</span>
                </div>
                <div className="admin-form-grid">
                  <label>
                    Activity type
                    <select value={activityForms[course.id]?.type ?? 'Assignment'} onChange={(event) => setActivityForms((current) => ({ ...current, [course.id]: { ...(current[course.id] ?? { type: 'Assignment', title: '', date: '', moduleId: '', instructions: '' }), type: event.target.value as 'Quiz' | 'Assignment' } }))}>
                      <option value="Assignment">Assignment</option>
                      <option value="Quiz">Quiz</option>
                    </select>
                  </label>
                  <label>
                    Activity title
                    <input value={activityForms[course.id]?.title ?? ''} onChange={(event) => setActivityForms((current) => ({ ...current, [course.id]: { ...(current[course.id] ?? { type: 'Assignment', title: '', date: '', moduleId: '', instructions: '' }), title: event.target.value } }))} placeholder="Assignment or quiz title" />
                  </label>
                  <label>
                    Due date
                    <input type="date" value={activityForms[course.id]?.date ?? ''} onChange={(event) => setActivityForms((current) => ({ ...current, [course.id]: { ...(current[course.id] ?? { type: 'Assignment', title: '', date: '', moduleId: '', instructions: '' }), date: event.target.value } }))} />
                  </label>
                  <label>
                    Place inside module
                    <select value={activityForms[course.id]?.moduleId ?? ''} onChange={(event) => setActivityForms((current) => ({ ...current, [course.id]: { ...(current[course.id] ?? { type: 'Assignment', title: '', date: '', moduleId: '', instructions: '' }), moduleId: event.target.value } }))}>
                      <option value="">Choose a module</option>
                      {courseModules.map((module) => <option key={module.id} value={module.id}>Module {module.number}: {module.title}</option>)}
                    </select>
                  </label>
                  <label className="full">
                    Instructions
                    <textarea rows={4} value={activityForms[course.id]?.instructions ?? ''} onChange={(event) => setActivityForms((current) => ({ ...current, [course.id]: { ...(current[course.id] ?? { type: 'Assignment', title: '', date: '', moduleId: '', instructions: '' }), instructions: event.target.value } }))} placeholder="What should scholars do?" />
                  </label>
                  <div className="setting-actions full">
                    <Button variant="secondary" type="button" onClick={() => addActivity(course.id)}>Add activity</Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </PageShell>
  )
}
