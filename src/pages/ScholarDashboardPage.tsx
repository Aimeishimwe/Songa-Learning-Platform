import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { users } from '../data/users'
import { getAnnouncementsForProgram } from '../data/announcements'
import { assignments } from '../data/assignments'
import { courses } from '../data/courses'
import { modules } from '../data/modules'
import { useAuth } from '../context/AuthContext'
import { Card, Button, ProgressRing, Skeleton } from '../components/ui'
import Recommendations from '../components/Recommendations'
import { usePageView } from '../hooks/usePageView'

function greetingFor(hour: number) {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function assignmentStatus(deadline: string, status: string) {
  if (new Date(`${deadline}T00:00:00`) < new Date(new Date().setHours(0, 0, 0, 0))) return 'Closed'
  return status === 'Graded' || status === 'Submitted' || status === 'Draft' ? status : 'Open'
}

export function ScholarDashboardPage() {
  const { user } = useAuth()
  usePageView('ScholarDashboard')
  const scholar = user ?? users[0]
  const featuredCourse = courses.find((course) => course.name === scholar.enrollment?.course || scholar.enrolledCourses?.includes(course.id)) ?? courses[0]
  const courseModules = modules.filter((module) => module.courseId === featuredCourse.id)
  const completedModules = courseModules.filter((module) => module.status === 'Completed').length
  const currentModule = courseModules.find((module) => module.status === 'Current') ?? courseModules[0]
  const announcements = getAnnouncementsForProgram(scholar.enrollment?.program ?? scholar.program ?? 'All').filter((item) => item.category !== 'Foundation').slice(0, 3)
  const currentAssignment = assignments.filter((item) => item.courseId === featuredCourse.id).map((item) => ({ ...item, state: assignmentStatus(item.deadline, item.status) })).find((item) => item.state !== 'Closed')
  const [loading, setLoading] = useState(true)

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 350); return () => clearTimeout(timer) }, [])

  return <PageShell title={`${greetingFor(new Date().getHours())}, ${scholar.name.split(' ')[0]}`} subtitle="Your next learning steps, all in one place.">
    <div className="grid-2 dashboard-summary-grid">
      <Card className="dashboard-course-card">
        <p className="eyebrow">Current course</p>
        <h3>{featuredCourse.name}</h3>
        <p className="muted-text">{scholar.enrollment?.academy ?? scholar.academy}</p>
        <div className="dashboard-progress-line"><span>{completedModules} of {courseModules.length} modules complete</span><strong>{featuredCourse.progress}%</strong></div>
        <div className="meter"><div style={{ width: `${featuredCourse.progress}%` }} /></div>
      </Card>
      <Card className="dashboard-progress-card">
        <div><p className="eyebrow">Learning progress</p><h3>Keep your momentum</h3><p className="muted-text">Pick up where you left off when you are ready.</p></div>
        <ProgressRing value={featuredCourse.progress} />
      </Card>
    </div>

    <div className="grid-2 dashboard-action-grid">
      <Card>
        <p className="eyebrow">Continue learning</p>
        {loading ? <Skeleton width="70%" height="28px" /> : <><h3>{currentModule ? `Module ${currentModule.number}: ${currentModule.title}` : 'Course content'}</h3><p className="muted-text">Continue from your latest checkpoint.</p></>}
        <Link to={`/course/${featuredCourse.id}`} state={{ openWorkspace: true }}><Button variant="primary">Continue <ArrowRight size={16} /></Button></Link>
      </Card>
      <Card>
        <p className="eyebrow">Next assignment</p>
        <h3>{currentAssignment?.title ?? 'No open assignments'}</h3>
        <p className="muted-text">{currentAssignment ? `Due ${new Date(`${currentAssignment.deadline}T00:00:00`).toLocaleDateString('en', { month: 'short', day: 'numeric' })}` : 'You are up to date with your course work.'}</p>
        {currentAssignment ? <Link to={`/assignment/${currentAssignment.id}`}><Button variant="secondary">Open assignment</Button></Link> : null}
      </Card>
    </div>

    <Card className="dashboard-announcements-card">
      <div className="card-heading-row"><div><p className="eyebrow">Announcements</p><h3>Latest learning updates</h3></div><Link to="/announcements" className="link">View all</Link></div>
      <div className="list-stack">
        {loading ? Array.from({ length: 2 }).map((_, index) => <Skeleton key={index} height="42px" />) : announcements.map((item) => <div key={item.id} className="announcement-item"><div><strong>{item.title}</strong><p>{item.description}</p></div><span className="badge">{item.category}</span></div>)}
      </div>
    </Card>
    <Recommendations />
  </PageShell>
}
