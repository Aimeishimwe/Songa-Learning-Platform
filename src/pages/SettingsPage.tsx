import { useMemo, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { Card, Button } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { programs as initialPrograms } from '../data/programs'
import { courses as initialCourses } from '../data/courses'
import { usePageView } from '../hooks/usePageView'
import type { Course, Program } from '../types'

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`
}

export function SettingsPage() {
  usePageView('Settings')
  const { role, user, updateProfile } = useAuth()
  const [accountForm, setAccountForm] = useState({ name: user?.name ?? '', email: user?.email ?? '' })
  const [programsState, setProgramsState] = useState<Program[]>(() => initialPrograms)
  const [courseState, setCourseState] = useState<Course[]>(() => initialCourses)
  const [programForm, setProgramForm] = useState({ name: '', description: '', academies: '' })
  const [courseForm, setCourseForm] = useState({ name: '', description: '', program: initialPrograms[0].name, academy: '', mentor: '', duration: '' })
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null)

  const adminTools = useMemo(() => role === 'admin', [role])

  const saveAccount = () => updateProfile?.({ name: accountForm.name.trim() || user?.name || '', email: accountForm.email.trim() || user?.email || '' })

  const addOrUpdateProgram = (event: React.FormEvent) => {
    event.preventDefault()
    if (!programForm.name.trim() || !programForm.description.trim()) return

    if (editingProgramId) {
      setProgramsState((current) => current.map((program) => program.id === editingProgramId ? { ...program, name: programForm.name.trim(), description: programForm.description.trim(), academies: programForm.academies.split(',').map((item) => item.trim()).filter(Boolean) } : program))
    } else {
      setProgramsState((current) => [...current, { id: createId('program'), name: programForm.name.trim(), description: programForm.description.trim(), academies: programForm.academies.split(',').map((item) => item.trim()).filter(Boolean) }])
    }

    setProgramForm({ name: '', description: '', academies: '' })
    setEditingProgramId(null)
  }

  const editProgram = (program: Program) => {
    setEditingProgramId(program.id)
    setProgramForm({ name: program.name, description: program.description, academies: program.academies.join(', ') })
  }

  const removeProgram = (programId: string) => {
    setProgramsState((current) => current.filter((program) => program.id !== programId))
    setCourseState((current) => current.filter((course) => course.program !== programsState.find((program) => program.id === programId)?.name))
  }

  const addCourse = (event: React.FormEvent) => {
    event.preventDefault()
    if (!courseForm.name.trim() || !courseForm.description.trim()) return

    setCourseState((current) => [...current, {
      id: createId('course'),
      name: courseForm.name.trim(),
      program: courseForm.program,
      academy: courseForm.academy.trim() || 'New Academy',
      description: courseForm.description.trim(),
      mentor: courseForm.mentor.trim() || 'Pending mentor',
      duration: courseForm.duration.trim() || '4 weeks',
      progress: 0,
      status: 'Active',
      modules: [],
    }])

    setCourseForm({ name: '', description: '', program: courseForm.program, academy: '', mentor: '', duration: '' })
  }

  const removeCourse = (courseId: string) => {
    setCourseState((current) => current.filter((course) => course.id !== courseId))
  }

  return (
    <PageShell title="Settings" subtitle="Control your account preferences and platform administration.">
      <div className="settings-grid">
        <Card>
          <h3>Account</h3>
          <div className="card-stack">
            <label>
              Full name
              <input value={accountForm.name} onChange={(event) => setAccountForm((current) => ({ ...current, name: event.target.value }))} />
            </label>
            <label>
              Email
              <input type="email" value={accountForm.email} onChange={(event) => setAccountForm((current) => ({ ...current, email: event.target.value }))} />
            </label>
            <div>
              <h4 style={{ margin: '8px 0' }}>Change password</h4>
              <label>
                Current password
                <input type="password" />
              </label>
              <label>
                New password
                <input type="password" />
              </label>
              <div className="setting-actions">
                <Button variant="ghost">Reset</Button>
                <Button variant="primary" type="button" onClick={saveAccount}>Save changes</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3>Notifications</h3>
          <div className="card-stack">
            <div className="setting-row">
              <div>
                <label>Email notifications</label>
                <div className="setting-help">Receive activity and assignment emails</div>
              </div>
              <input className="toggle" type="checkbox" defaultChecked />
            </div>

            <div className="setting-row">
              <div>
                <label>Push notifications</label>
                <div className="setting-help">Live session reminders and urgent updates</div>
              </div>
              <input className="toggle" type="checkbox" />
            </div>

            <div className="setting-row">
              <div>
                <label>Assignment reminders</label>
                <div className="setting-help">Remind me before due dates</div>
              </div>
              <input className="toggle" type="checkbox" defaultChecked />
            </div>

            <div className="setting-actions">
              <Button variant="ghost">Reset</Button>
              <Button variant="primary">Save notifications</Button>
            </div>
          </div>
        </Card>
      </div>

      {adminTools ? (
        <div className="settings-grid" style={{ marginTop: 16 }}>
          <Card>
            <h3>Admin program manager</h3>
            <form className="auth-form" onSubmit={addOrUpdateProgram}>
              <label>
                Program name
                <input value={programForm.name} onChange={(event) => setProgramForm((current) => ({ ...current, name: event.target.value }))} placeholder="New program" />
              </label>
              <label>
                Description
                <textarea rows={3} value={programForm.description} onChange={(event) => setProgramForm((current) => ({ ...current, description: event.target.value }))} placeholder="What this program focuses on" />
              </label>
              <label>
                Academies
                <input value={programForm.academies} onChange={(event) => setProgramForm((current) => ({ ...current, academies: event.target.value }))} placeholder="Academy A, Academy B" />
              </label>
              <div className="setting-actions">
                <Button variant="secondary" type="button" onClick={() => { setEditingProgramId(null); setProgramForm({ name: '', description: '', academies: '' }) }}>Clear</Button>
                <Button variant="primary" type="submit">{editingProgramId ? 'Save program' : 'Create program'}</Button>
              </div>
            </form>
            <div className="card-stack" style={{ marginTop: 12 }}>
              {programsState.map((program) => (
                <div key={program.id} className="announcement-item">
                  <div>
                    <strong>{program.name}</strong>
                    <p>{program.description}</p>
                  </div>
                  <div className="setting-actions">
                    <Button variant="secondary" type="button" onClick={() => editProgram(program)}>Edit</Button>
                    <Button variant="ghost" type="button" onClick={() => removeProgram(program.id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3>Admin course manager</h3>
            <form className="auth-form" onSubmit={addCourse}>
              <label>
                Course name
                <input value={courseForm.name} onChange={(event) => setCourseForm((current) => ({ ...current, name: event.target.value }))} placeholder="Course title" />
              </label>
              <label>
                Description
                <textarea rows={3} value={courseForm.description} onChange={(event) => setCourseForm((current) => ({ ...current, description: event.target.value }))} placeholder="Describe the learning experience" />
              </label>
              <label>
                Program
                <select value={courseForm.program} onChange={(event) => setCourseForm((current) => ({ ...current, program: event.target.value }))}>
                  {programsState.map((program) => <option key={program.id} value={program.name}>{program.name}</option>)}
                </select>
              </label>
              <label>
                Academy
                <input value={courseForm.academy} onChange={(event) => setCourseForm((current) => ({ ...current, academy: event.target.value }))} placeholder="Academy" />
              </label>
              <label>
                Mentor
                <input value={courseForm.mentor} onChange={(event) => setCourseForm((current) => ({ ...current, mentor: event.target.value }))} placeholder="Mentor" />
              </label>
              <label>
                Duration
                <input value={courseForm.duration} onChange={(event) => setCourseForm((current) => ({ ...current, duration: event.target.value }))} placeholder="4 weeks" />
              </label>
              <Button variant="primary" type="submit">Create course</Button>
            </form>
            <div className="card-stack" style={{ marginTop: 12 }}>
              {courseState.map((course) => (
                <div key={course.id} className="announcement-item">
                  <div>
                    <strong>{course.name}</strong>
                    <p>{course.program} • {course.academy}</p>
                  </div>
                  <Button variant="ghost" type="button" onClick={() => removeCourse(course.id)}>Delete</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : null}
    </PageShell>
  )
}
