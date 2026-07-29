import { useMemo, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { Card, Button } from '../components/ui'
import { useProgramContext } from '../context/ProgramContext'
import { courses } from '../data/courses'
import { users } from '../data/users'
import { createAnnouncement, getAnnouncements } from '../services/announcementService'

export function AdminDashboardPage() {
  const { activeProgram, programs } = useProgramContext()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<'Program' | 'Course'>('Program')
  const [program, setProgram] = useState<'Songa Girls Initiative' | 'Songa Leadership Academy'>('Songa Girls Initiative')
  const [feedback, setFeedback] = useState('')
  const [items, setItems] = useState(getAnnouncements())

  const selectedProgramCourses = useMemo(() => courses.filter((course) => course.program === activeProgram.name), [activeProgram.name])
  const selectedProgramScholars = useMemo(() => users.filter((user) => user.role === 'scholar' && user.program === activeProgram.name), [activeProgram.name])
  const selectedProgramMentors = useMemo(() => users.filter((user) => user.role === 'mentor' && user.assignedCourse && courses.some((course) => course.program === activeProgram.name && course.name === user.assignedCourse)), [activeProgram.name])
  const selectedProgramAnnouncements = useMemo(() => items.filter((item) => item.program === 'All' || item.program === activeProgram.name), [activeProgram.name, items])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!title.trim() || !description.trim()) {
      setFeedback('Please provide both a title and announcement content.')
      return
    }

    createAnnouncement({ title: title.trim(), description: description.trim(), category, program })
    setItems([...getAnnouncements()])
    setFeedback(`Announcement sent to ${program}.`)
    setTitle('')
    setDescription('')
    setCategory('Program')
    setProgram('Songa Girls Initiative')
  }

  return (
    <PageShell title="Admin dashboard" subtitle="Manage the whole learning ecosystem from one place.">
      <div className="grid-2 dashboard-summary-grid">
        <Card>
          <p className="eyebrow">Platform stats</p>
          <h3>{selectedProgramScholars.length} active scholars</h3>
          <p>{selectedProgramMentors.length} mentors • {selectedProgramCourses.length} courses</p>
        </Card>
        <Card>
          <p className="eyebrow">Program workspace</p>
          <h3>{selectedProgramCourses.length} courses in view</h3>
          <p>Manage content and announcements for {activeProgram.name}.</p>
        </Card>
      </div>

      <div className="grid-2" style={{ marginTop: 16 }}>
        <Card>
          <div className="card-heading-row">
            <div>
              <p className="eyebrow">Send announcement</p>
              <h3>Target one program</h3>
            </div>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Title
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="New module available" />
            </label>
            <label>
              Message
              <textarea rows={4} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Share an update for this cohort." />
            </label>
            <label>
              Type
              <select value={category} onChange={(event) => setCategory(event.target.value as 'Program' | 'Course')}>
                <option value="Program">Program</option>
                <option value="Course">Course</option>
              </select>
            </label>
            <label>
              Program
              <select value={program} onChange={(event) => setProgram(event.target.value as 'Songa Girls Initiative' | 'Songa Leadership Academy')}>
                {programs.map((programOption) => (
                  <option key={programOption.id} value={programOption.name}>{programOption.name}</option>
                ))}
              </select>
            </label>
            {feedback ? <p className="muted-text">{feedback}</p> : null}
            <Button variant="primary" type="submit">Publish announcement</Button>
          </form>
        </Card>

        <Card>
          <div className="card-heading-row">
            <div>
              <p className="eyebrow">Recent announcements</p>
              <h3>Current program messages</h3>
            </div>
          </div>
          <div className="list-stack">
            {selectedProgramAnnouncements.slice().reverse().map((item) => (
              <div key={item.id} className="announcement-item">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
                <span className="badge">{item.program}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  )
}
