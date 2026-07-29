import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { useAuth } from '../context/AuthContext'
import { assignments } from '../data/assignments'
import { assessments } from '../data/assessments'
import { courses } from '../data/courses'
import { Card, ProgressRing } from '../components/ui'
import { usePageView } from '../hooks/usePageView'

function getAssignmentStatus(deadline: string, rawStatus: string) {
  const deadlineDate = new Date(`${deadline}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (deadlineDate < today) return 'Closed'
  if (rawStatus === 'Graded') return 'Graded'
  if (rawStatus === 'Submitted') return 'Submitted'
  if (rawStatus === 'Draft') return 'Draft'
  return 'Open'
}

export function ScholarAssignmentsPage() {
  const { user } = useAuth()
  usePageView('ScholarAssignments')

  const course = courses.find((item) => {
    if (user?.enrollment?.course) {
      return item.name === user.enrollment.course
    }
    return item.name === user?.course
  }) ?? courses[0]

  const courseAssignments = assignments
    .filter((assignment) => assignment.courseId === course.id)
    .map((assignment) => ({ ...assignment, computedStatus: getAssignmentStatus(assignment.deadline, assignment.status) }))
  const courseAssessments = assessments.filter((assessment) => assessment.courseId === course.id)

  return (
    <PageShell title="My Assignments" subtitle={`Current: ${course.name} • Progress ${course.progress}%`}>
      <div className="grid-2">
        <Card>
          <div className="card-heading-row">
            <div>
              <p className="eyebrow">Assignments</p>
              <h3>Your tasks</h3>
            </div>
          </div>

          <div className="list-stack">
            {courseAssignments.length === 0 ? (
              <p>No active assignments.</p>
            ) : (
              courseAssignments.map((assignment) => (
                <div key={assignment.id} className="announcement-item">
                  <div>
                    <strong>{assignment.title}</strong>
                    <p>{assignment.instructions}</p>
                    <p className="muted-text">Deadline: {assignment.deadline}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <span className={`status-pill ${assignment.computedStatus === 'Closed' ? 'status-closed' : 'status-open'}`}>{assignment.computedStatus}</span>
                    {assignment.computedStatus === 'Closed' ? <span className="muted-text">Submission closed</span> : <Link to={`/assignment/${assignment.id}`} className="link">Open</Link>}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card>
          <div className="card-heading-row">
            <div>
              <p className="eyebrow">Assessments</p>
              <h3>Quizzes & finals</h3>
            </div>
          </div>
          <div className="list-stack">
            {courseAssessments.length === 0 ? (
              <p>No scheduled assessments.</p>
            ) : (
              courseAssessments.map((assessment) => (
                <div key={assessment.id} className="announcement-item">
                  <div>
                    <strong>{assessment.title} <small>({assessment.type})</small></strong>
                    <p>Scheduled: {assessment.date} • Due: {assessment.dueDate ?? '—'}</p>
                    {assessment.graded && assessment.score !== undefined ? <p>Score: {assessment.score}%</p> : null}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {assessment.graded && assessment.score !== undefined ? <ProgressRing value={assessment.score} /> : <span>{assessment.graded ? 'Graded' : 'Pending'}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </PageShell>
  )
}

export default ScholarAssignmentsPage
