import { ArrowRight, BookOpen, CheckCircle2, ClipboardCheck, ImageOff, Megaphone, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { useAuth } from '../context/AuthContext'
import { courses } from '../data/courses'
import { users } from '../data/users'

const activities = [
  { icon: ClipboardCheck, text: 'Grace submitted Front-End Assignment', detail: '12 minutes ago', tone: 'purple' },
  { icon: CheckCircle2, text: 'Sarah graded 8 assignments', detail: '42 minutes ago', tone: 'green' },
  { icon: Megaphone, text: 'New learning update published', detail: 'Today, 09:20', tone: 'gold' },
  { icon: BookOpen, text: 'Backend course content updated', detail: 'Yesterday', tone: 'blue' },
  { icon: UserPlus, text: 'New scholar added to Tech Sisters', detail: 'Yesterday', tone: 'rose' },
]
const actions = [{ label: '5 assignments awaiting grading', icon: ClipboardCheck }, { label: '2 announcements scheduled', icon: Megaphone }, { label: '1 course missing a cover image', icon: ImageOff }, { label: '3 quizzes closing today', icon: CheckCircle2 }]
function greeting(hour: number) { return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening' }

export function AdminDashboardPage() {
  const { user } = useAuth(); const name = user?.name.split(' ')[0] ?? 'Aime'
  const programData = ['Songa Girls Initiative', 'Songa Leadership Academy'].map((program, index) => ({ name: program, courses: courses.filter((course) => course.program === program), scholars: users.filter((person) => person.role === 'scholar' && person.program === program), mentors: users.filter((person) => person.role === 'mentor' && person.assignedCourse && courses.some((course) => course.program === program && course.name === person.assignedCourse)), cohort: index === 0 ? 'Tech Sisters · Cohort 1' : 'Leadership · Cohort 1', tone: index === 0 ? 'girls' : 'leadership' }))
  return <PageShell title={`${greeting(new Date().getHours())}, ${name} 👋`} subtitle="Welcome back to Songa Academy. Here’s what’s happening today.">
    <section className="admin-program-overview"><div className="section-title"><div><p className="eyebrow">Foundation programs</p><h2>Two learning ecosystems, one mission.</h2></div></div><div className="admin-program-grid">{programData.map((program) => <article className={`admin-program-card ${program.tone}`} key={program.name}><div className="admin-program-cover"><span>{program.tone === 'girls' ? 'SG' : 'SL'}</span></div><div className="admin-program-body"><p className="eyebrow">Foundation program</p><h3>{program.name}</h3><div className="program-metrics"><span><strong>{program.courses.length}</strong> courses</span><span><strong>{program.scholars.length}</strong> scholars</span><span><strong>{program.mentors.length}</strong> mentors</span></div><p className="cohort-label">Active: {program.cohort}</p><Link to="/admin/programs" className="program-manage-link">Manage program <ArrowRight size={16} /></Link></div></article>)}</div></section>
    <div className="admin-dashboard-grid"><section className="admin-activity-card"><div className="section-title"><div><p className="eyebrow">Recent activity</p><h2>Across Songa today</h2></div></div><div className="activity-timeline">{activities.map(({ icon: Icon, text, detail, tone }) => <div className="activity-row" key={text}><span className={`activity-icon ${tone}`}><Icon size={17} /></span><div><strong>{text}</strong><small>{detail}</small></div></div>)}</div></section><section className="pending-actions-card"><p className="eyebrow">Pending actions</p><h2>Worth your attention</h2><p className="muted-text">Only the things that need a next step.</p><div className="pending-list">{actions.map(({ label, icon: Icon }) => <Link to="/admin/courses" key={label}><Icon size={17} /><span>{label}</span><ArrowRight size={15} /></Link>)}</div></section></div>
  </PageShell>
}
