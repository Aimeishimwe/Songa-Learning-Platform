import { useEffect, useMemo, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { Card, Button } from '../components/ui'
import { useProgramContext } from '../context/ProgramContext'
import { courses as initialCourses } from '../data/courses'
import { lessons as initialLessons } from '../data/lessons'
import { modules as initialModules } from '../data/modules'
import { assignments as initialAssignments } from '../data/assignments'
import { assessments as initialAssessments } from '../data/assessments'
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
  if (typeof window === 'undefined') {
    return { courses: initialCourses, modules: initialModules, lessons: initialLessons, assignments: initialAssignments, assessments: initialAssessments }
  }

  const raw = window.localStorage.getItem(storageKey)
  if (!raw) {
    return { courses: initialCourses, modules: initialModules, lessons: initialLessons, assignments: initialAssignments, assessments: initialAssessments }
  }

  try {
    const parsed = JSON.parse(raw) as AdminCourseState
    return {
      courses: parsed.courses?.length ? parsed.courses : initialCourses,
      modules: parsed.modules?.length ? parsed.modules : initialModules,
      lessons: parsed.lessons?.length ? parsed.lessons : initialLessons,
      assignments: parsed.assignments?.length ? parsed.assignments : initialAssignments,
      assessments: parsed.assessments?.length ? parsed.assessments : initialAssessments,
    }
  } catch {
    return { courses: initialCourses, modules: initialModules, lessons: initialLessons, assignments: initialAssignments, assessments: initialAssessments }
  }
}

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`
}

export function AdminCoursesPage() {
  const { activeProgram } = useProgramContext()
  const [adminState, setAdminState] = useState<AdminCourseState>(() => loadAdminCourseState())
  const [courseForm, setCourseForm] = useState({ name: '', description: '', academy: '', mentor: '', duration: '' })
  const [moduleForms, setModuleForms] = useState<Record<string, { title: string; resources: string }>>({})
  const [lessonForms, setLessonForms] = useState<Record<string, { title: string; type: Lesson['type']; content: string }>>({})
  const [activityForms, setActivityForms] = useState<Record<string, { type: 'Quiz' | 'Assignment'; title: string; date: string }>>({})
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
    }

    setAdminState((current) => ({ ...current, courses: [...current.courses, newCourse] }))
    setCourseForm({ name: '', description: '', academy: '', mentor: '', duration: '' })
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
    }

    setAdminState((current) => ({ ...current, lessons: [...current.lessons, newLesson] }))
    setLessonForms((current) => ({ ...current, [moduleId]: { title: '', type: 'Reading', content: '' } }))
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
    <PageShell title="Courses management" subtitle="Create and organize learning content for each program.">
      <Card style={{ marginBottom: 16 }}>
        <div className="card-heading-row">
          <div>
            <p className="eyebrow">Program workspace</p>
            <h3>{activeProgram.name}</h3>
          </div>
        </div>
        <p className="muted-text">Only courses for this program are shown and edited here.</p>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <div className="card-heading-row">
          <div>
            <p className="eyebrow">Add a course</p>
            <h3>Create a new learning path</h3>
          </div>
        </div>
        <form className="auth-form" onSubmit={addCourse}>
          <label>
            Course name
            <input value={courseForm.name} onChange={(event) => setCourseForm((current) => ({ ...current, name: event.target.value }))} placeholder="Leadership Lab" />
          </label>
          <label>
            Description
            <textarea rows={3} value={courseForm.description} onChange={(event) => setCourseForm((current) => ({ ...current, description: event.target.value }))} placeholder="What scholars will learn." />
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
          <Button variant="primary" type="submit">Save course</Button>
        </form>
      </Card>

      <div className="card-stack">
        {programCourses.map((course) => {
          const courseModules = adminState.modules.filter((module) => module.courseId === course.id)
          return (
            <Card key={course.id}>
              <div className="card-heading-row">
                <div>
                  <p className="eyebrow">Course</p>
                  <h3>{course.name}</h3>
                </div>
                <Button variant="ghost" type="button" onClick={() => removeCourse(course.id)}>Delete</Button>
              </div>
              <p>{course.description}</p>
              <p className="muted-text">Academy: {course.academy} • Mentor: {course.mentor} • Duration: {course.duration}</p>

              <div className="card-stack" style={{ marginTop: 12 }}>
                <h4>Modules</h4>
                {courseModules.length ? courseModules.map((module) => {
                  const moduleLessons = adminState.lessons.filter((lesson) => lesson.moduleId === module.id)
                  return (
                    <div key={module.id} className="card" style={{ padding: 12 }}>
                      <div className="card-heading-row">
                        <strong>{module.title}</strong>
                        <div className="setting-actions">
                          <Button variant="secondary" type="button" onClick={() => { setEditingModuleId(module.id); setModuleForms((current) => ({ ...current, [course.id]: { title: module.title, resources: module.resources.join(', ') } })) }}>Edit</Button>
                          <Button variant="ghost" type="button" onClick={() => removeModule(module.id)}>Remove</Button>
                        </div>
                      </div>
                      {module.resources.length ? <p className="muted-text">Resources: {module.resources.join(', ')}</p> : null}
                      <div className="card-stack" style={{ marginTop: 8 }}>
                        {moduleLessons.length ? moduleLessons.map((lesson) => (
                          <div key={lesson.id} className="announcement-item">
                            <div>
                              <strong>{lesson.title}</strong>
                              <p>{lesson.type} • {lesson.content}</p>
                            </div>
                            <Button variant="ghost" type="button" onClick={() => removeLesson(lesson.id)}>Delete</Button>
                          </div>
                        )) : <p className="muted-text">No lessons yet.</p>}
                      </div>
                      <div className="card-stack" style={{ marginTop: 8 }}>
                        <label>
                          Add a lesson
                          <input
                            value={lessonForms[module.id]?.title ?? ''}
                            onChange={(event) => setLessonForms((current) => ({ ...current, [module.id]: { ...(current[module.id] ?? { title: '', type: 'Reading', content: '' }), title: event.target.value } }))}
                            placeholder="Lesson title"
                          />
                        </label>
                        <label>
                          Lesson type
                          <select
                            value={lessonForms[module.id]?.type ?? 'Reading'}
                            onChange={(event) => setLessonForms((current) => ({ ...current, [module.id]: { ...(current[module.id] ?? { title: '', type: 'Reading', content: '' }), type: event.target.value as Lesson['type'] } }))}
                          >
                            <option value="Video">Video</option>
                            <option value="Reading">Reading</option>
                            <option value="Quiz">Quiz</option>
                            <option value="Assignment">Assignment</option>
                          </select>
                        </label>
                        <label>
                          Lesson notes
                          <textarea
                            rows={2}
                            value={lessonForms[module.id]?.content ?? ''}
                            onChange={(event) => setLessonForms((current) => ({ ...current, [module.id]: { ...(current[module.id] ?? { title: '', type: 'Reading', content: '' }), content: event.target.value } }))}
                            placeholder="A short summary or task"
                          />
                        </label>
                        <Button variant="secondary" type="button" onClick={() => addLesson(module.id)}>Add lesson</Button>
                      </div>
                    </div>
                  )
                }) : <p className="muted-text">There are no modules yet.</p>}
              </div>

              <div className="card-stack" style={{ marginTop: 12 }}>
                <label>
                  {editingModuleId ? 'Edit module' : 'Add a module'}
                  <input
                    value={moduleForms[course.id]?.title ?? ''}
                    onChange={(event) => setModuleForms((current) => ({ ...current, [course.id]: { ...(current[course.id] ?? { title: '', resources: '' }), title: event.target.value } }))}
                    placeholder="Module title"
                  />
                </label>
                <label>
                  Resources
                  <input
                    value={moduleForms[course.id]?.resources ?? ''}
                    onChange={(event) => setModuleForms((current) => ({ ...current, [course.id]: { ...(current[course.id] ?? { title: '', resources: '' }), resources: event.target.value } }))}
                    placeholder="Slides, homework, guide"
                  />
                </label>
                <div className="setting-actions">
                  {editingModuleId ? <Button variant="ghost" type="button" onClick={() => { setEditingModuleId(null); setModuleForms((current) => ({ ...current, [course.id]: { title: '', resources: '' } })) }}>Cancel</Button> : null}
                  <Button variant="primary" type="button" onClick={() => addModule(course.id)}>{editingModuleId ? 'Save module' : 'Add module'}</Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </PageShell>
  )
}
