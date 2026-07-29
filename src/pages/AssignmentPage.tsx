import { useParams } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { assignments } from '../data/assignments'
import { Card, Button, SkeletonList } from '../components/ui'
import { usePageView } from '../hooks/usePageView'
import { useEffect, useState } from 'react'

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

export function AssignmentPage() {
  const { id } = useParams()
  usePageView('Assignment')
  const assignment = assignments.find((item) => item.id === id)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [id])

  if (!assignment) {
    return <PageShell title="Assignment not found" subtitle="The requested assignment is unavailable." />
  }

  const status = getAssignmentStatus(assignment.deadline, assignment.status)
  const submissionClosed = status === 'Closed'

  return (
    <PageShell title={assignment.title} subtitle="Submit your work and track your progress.">
      <div className="card-stack">
        {loading ? (
          <SkeletonList count={2} lines={2} />
        ) : (
          <>
            <Card>
              <p className="eyebrow">Instructions</p>
              <p>{assignment.instructions}</p>
              <p><strong>Deadline:</strong> {assignment.deadline}</p>
              <p><strong>Status:</strong> {status}</p>
              {submissionClosed ? <p className="error-text">Submission is now closed because the deadline has passed.</p> : null}
            </Card>
            <Card>
              <label>
                Submission notes
                <textarea rows={5} placeholder="Add your submission summary" disabled={submissionClosed} />
              </label>
              <label>
                Upload file
                <input type="file" disabled={submissionClosed} />
              </label>
              <Button variant="primary" disabled={submissionClosed}>{submissionClosed ? 'Submission closed' : 'Submit assignment'}</Button>
            </Card>
          </>
        )}
      </div>
    </PageShell>
  )
}
