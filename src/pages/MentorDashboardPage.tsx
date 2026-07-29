import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Card, Button } from '../components/ui'
import { PageShell } from '../components/PageShell'
import { useAuth } from '../context/AuthContext'

export function MentorDashboardPage() {
  const { user } = useAuth()
  const course = user?.assignedCourse ?? 'Front-End Web Development'

  return <PageShell title="Mentor dashboard" subtitle="Focus on the learners and reviews that need your attention.">
    <div className="grid-2 dashboard-summary-grid">
      <Card className="dashboard-course-card"><p className="eyebrow">Assigned course</p><h3>{course}</h3><p className="muted-text">Cohort 1 · 20 scholars</p></Card>
      <Card className="dashboard-course-card"><p className="eyebrow">Pending review</p><h3>8 submissions</h3><p className="muted-text">3 learners may need additional support.</p></Card>
    </div>
    <div className="grid-2 dashboard-action-grid">
      <Card><p className="eyebrow">Cohort progress</p><h3>65% completion</h3><p className="muted-text">Review learner progress and identify who needs support.</p><Link to="/mentor/cohorts"><Button variant="secondary">View cohort <ArrowRight size={16} /></Button></Link></Card>
      <Card><p className="eyebrow">Next action</p><h3>Review recent submissions</h3><p className="muted-text">Give clear feedback while the work is still fresh.</p><Link to="/mentor/assignments"><Button variant="primary">Open reviews <ArrowRight size={16} /></Button></Link></Card>
    </div>
  </PageShell>
}
