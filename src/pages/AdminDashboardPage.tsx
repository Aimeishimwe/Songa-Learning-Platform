import { ArrowRight, BookOpen, CheckCircle2, ClipboardCheck, Megaphone, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { useAuth } from '../context/AuthContext'
import { getPlatformData } from '../services/platformService'

const learningOperations = [
  { title: 'Learning Management', description: 'Create and organize programs, courses, modules, lessons, and learning activities.', to: '/admin/courses', icon: BookOpen },
  { title: 'Lesson workflow', description: 'Move content from draft to preview and publish in a single workspace.', to: '/admin/courses', icon: ClipboardCheck },
  { title: 'Announcements', description: 'Publish foundation, program, and course updates for the right audiences.', to: '/admin/announcements', icon: Megaphone },
]

const learnerOperations = [
  { title: 'Scholars', description: 'View, enroll, and follow learner progress across all active programs.', to: '/admin/users', icon: UserPlus },
  { title: 'Mentors', description: 'Assign mentors and keep guidance connected to each course journey.', to: '/admin/users', icon: CheckCircle2 },
]

export function AdminDashboardPage() {
  const { user } = useAuth()
  const name = user?.name.split(' ')[0] ?? 'Aime'
  const { courses, users } = getPlatformData()
  const programData = ['Songa Girls Initiative', 'Songa Leadership Academy'].map((program, index) => ({
    name: program,
    courses: courses.filter((course) => course.program === program),
    scholars: users.filter((person) => person.role === 'scholar' && person.program === program),
    mentors: users.filter((person) => person.role === 'mentor' && person.assignedCourse && courses.some((course) => course.program === program && course.name === person.assignedCourse)),
    cohort: index === 0 ? 'Tech Sisters · Cohort 1' : 'Leadership · Cohort 1',
    tone: index === 0 ? 'girls' : 'leadership',
  }))

  return (
    <PageShell title={`Welcome back, ${name}`} subtitle="Run the academy as a learning operations center.">
      <section className="admin-program-overview">
        <div className="section-title">
          <div>
            <p className="eyebrow">Foundation programs</p>
            <h2>Two learning ecosystems, one mission.</h2>
          </div>
        </div>
        <div className="admin-program-grid">
          {programData.map((program) => (
            <article className={`admin-program-card ${program.tone}`} key={program.name}>
              <div className="admin-program-cover"><span>{program.tone === 'girls' ? 'SG' : 'SL'}</span></div>
              <div className="admin-program-body">
                <p className="eyebrow">Foundation program</p>
                <h3>{program.name}</h3>
                <div className="program-metrics">
                  <span><strong>{program.courses.length}</strong> courses</span>
                  <span><strong>{program.scholars.length}</strong> scholars</span>
                  <span><strong>{program.mentors.length}</strong> mentors</span>
                </div>
                <p className="cohort-label">Active: {program.cohort}</p>
                <Link to="/admin/courses" className="program-manage-link">Open learning workspace <ArrowRight size={16} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="admin-dashboard-grid">
        <section className="admin-activity-card">
          <div className="section-title">
            <div>
              <p className="eyebrow">Learning management</p>
              <h2>Programs, courses, modules, lessons</h2>
            </div>
          </div>
          <div className="pending-list">
            {learningOperations.map(({ title, description, to, icon: Icon }) => (
              <Link to={to} key={title}>
                <Icon size={17} />
                <span>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
                <ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </section>

        <section className="pending-actions-card">
          <p className="eyebrow">Learner management</p>
          <h2>Scholars and mentors in focus</h2>
          <p className="muted-text">Stay close to progress, enrollments, and guidance.</p>
          <div className="pending-list">
            {learnerOperations.map(({ title, description, to, icon: Icon }) => (
              <Link to={to} key={title}>
                <Icon size={17} />
                <span>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
                <ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  )
}
