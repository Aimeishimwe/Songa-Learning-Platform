import { useEffect, useState } from 'react'
import { ArrowRight, CalendarClock, CheckCircle2, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { useAuth } from '../context/AuthContext'
import { Card, Button, Skeleton } from '../components/ui'
import Recommendations from '../components/Recommendations'
import { usePageView } from '../hooks/usePageView'
import { getPlatformData } from '../services/platformService'

function greetingFor(hour: number) { return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening' }
function assignmentStatus(deadline: string, status: string) { if (new Date(`${deadline}T00:00:00`) < new Date(new Date().setHours(0, 0, 0, 0))) return 'Closed'; return ['Graded', 'Submitted', 'Draft'].includes(status) ? status : 'Open' }

export function ScholarDashboardPage() {
  const { user } = useAuth(); usePageView('ScholarDashboard')
  const platformData = getPlatformData()
  const scholar = user ?? platformData.users[0]
  const featuredCourse = platformData.courses.find((course) => course.name === scholar.enrollment?.course || scholar.enrolledCourses?.includes(course.id)) ?? platformData.courses[0]
  const courseModules = platformData.modules.filter((module) => module.courseId === featuredCourse.id)
  const completedModules = courseModules.filter((module) => module.status === 'Completed').length
  const currentModule = courseModules.find((module) => module.status === 'Current') ?? courseModules[0]
  const announcements = platformData.announcements.filter((item) => (item.program === 'All' || item.program === (scholar.enrollment?.program ?? scholar.program ?? 'All')) && item.category !== 'Foundation').slice(0, 3)
  const currentAssignment = platformData.assignments.filter((item) => item.courseId === featuredCourse.id).map((item) => ({ ...item, state: assignmentStatus(item.deadline, item.status) })).find((item) => item.state !== 'Closed')
  const [loading, setLoading] = useState(true)
  useEffect(() => { const timer = setTimeout(() => setLoading(false), 350); return () => clearTimeout(timer) }, [])
  const firstName = scholar.name.split(' ')[0]
  return <PageShell title={`${greetingFor(new Date().getHours())}, ${firstName}`} subtitle="Your next learning step is waiting for you.">
    <section className="learning-hero-card"><div className="learning-hero-copy"><p className="eyebrow">Continue learning</p><h2>{featuredCourse.name}</h2><p>{featuredCourse.academy} · {currentModule ? `Module ${currentModule.number}: ${currentModule.title}` : 'Your learning path'}</p><div className="hero-progress"><div><span>You are {featuredCourse.progress}% through this course</span><strong>{completedModules}/{courseModules.length} modules</strong></div><div className="meter"><div style={{ width: `${featuredCourse.progress}%` }} /></div></div><Link to={`/course/${featuredCourse.id}`} state={{ openWorkspace: true }}><Button variant="primary">Continue learning <ArrowRight size={16} /></Button></Link></div><div className="learning-hero-art"><span className="code-line">&lt;/&gt;</span><Sparkles /><span className="hero-course-chip">Building your future</span></div></section>
    <section className="dashboard-section"><div className="section-title"><div><p className="eyebrow">Your learning journey</p><h2>My courses</h2></div><Link to="/learning" className="link">View all</Link></div><div className="course-glance-grid">{platformData.courses.filter(course => scholar.enrolledCourses?.includes(course.id)).slice(0, 3).map((course) => <Link to={`/course/${course.id}`} className="course-glance" key={course.id}><div className={`course-art ${course.id.replace('course-', '')}`}><span>{course.academy}</span></div><div><span className="course-status">{course.status}</span><h3>{course.name}</h3><p>Last activity: keep building</p><div className="meter"><div style={{ width: `${course.progress}%` }} /></div><small>{course.progress}% complete</small></div></Link>)}</div></section>
    <div className="grid-2 dashboard-action-grid"><Card className="assignment-feature"><div className="feature-icon orange"><CalendarClock size={21} /></div><p className="eyebrow">Assignments</p><h3>{currentAssignment?.title ?? 'You are all caught up'}</h3><p className="muted-text">{currentAssignment ? `Due ${new Date(`${currentAssignment.deadline}T00:00:00`).toLocaleDateString('en', { month: 'long', day: 'numeric' })} · ${currentAssignment.state}` : 'Your next learning challenge will appear here. Keep exploring.'}</p>{currentAssignment && <Link to={`/assignment/${currentAssignment.id}`}><Button variant="secondary">Open assignment</Button></Link>}</Card><Card className="momentum-feature"><div className="feature-icon emerald"><CheckCircle2 size={21} /></div><p className="eyebrow">Your momentum</p><h3>Every lesson adds up.</h3><p className="muted-text">You have completed {completedModules} modules in {featuredCourse.name}. Keep showing up for your future self.</p></Card></div>
    <section className="announcement-panel"><div className="section-title"><div><p className="eyebrow">Announcements</p><h2>What is happening</h2></div><Link to="/announcements" className="link">See all updates</Link></div><div className="announcement-grid">{loading ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} height="116px" />) : announcements.map((item) => <article key={item.id} className="announcement-story"><span className="badge">{item.category}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
    <Recommendations />
  </PageShell>
}
