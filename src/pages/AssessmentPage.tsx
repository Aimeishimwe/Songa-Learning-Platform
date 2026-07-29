import { useEffect, useState } from 'react'
import { /* useParams */ } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { useAuth } from '../context/AuthContext'
import { assignments } from '../data/assignments'
import { assessments } from '../data/assessments'
import { courses } from '../data/courses'
import { Card, ProgressRing, Skeleton } from '../components/ui'
import { usePageView } from '../hooks/usePageView'

export function AssessmentPage() {
  // route param not used currently
  const { user } = useAuth()
  usePageView('Assessments')

  const course = courses.find((c) => c.name === user?.course) ?? courses[0]

  const courseAssignments = assignments.filter((a) => a.courseId === course.id)
  const courseAssessments = assessments.filter((a) => a.courseId === course.id)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <PageShell title="Assessments" subtitle={`${course.name} • Progress: ${course.progress}%`}>
      <div className="grid-2">
        <Card>
          <div className="card-heading-row">
            <div>
              <p className="eyebrow">Assignments</p>
              <h3>Tasks & deadlines</h3>
            </div>
          </div>
          <div className="list-stack">
            {loading
              ? Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="announcement-item">
                    <div style={{ width: '100%' }}>
                      <Skeleton width="70%" />
                      <Skeleton width="100%" />
                    </div>
                    <Skeleton width={48} height={16} />
                  </div>
                ))
              : courseAssignments.map((a) => (
                  <div key={a.id} className="announcement-item">
                    <div>
                      <strong>{a.title}</strong>
                      <p>{a.instructions}</p>
                      <p className="error-text">Deadline: {a.deadline}</p>
                    </div>
                    <div>
                      <span>{a.status}</span>
                    </div>
                  </div>
                ))}
            {courseAssignments.length === 0 && !loading ? <p>No assignments found.</p> : null}
          </div>
        </Card>

        <Card>
          <div className="card-heading-row">
            <div>
              <p className="eyebrow">Quizzes & Final</p>
              <h3>Scheduled assessments</h3>
            </div>
          </div>
          <div className="list-stack">
            {loading
              ? Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="announcement-item">
                    <div style={{ width: '100%' }}>
                      <Skeleton width="60%" />
                      <Skeleton width="90%" />
                    </div>
                    <div>
                      <Skeleton width={48} height={48} />
                    </div>
                  </div>
                ))
              : courseAssessments.map((s) => (
                  <div key={s.id} className="announcement-item">
                    <div>
                      <strong>{s.title} <small>({s.type})</small></strong>
                      <p>Scheduled: {s.date} • Due: {s.dueDate}</p>
                      {s.graded && s.score !== undefined ? <p>Score: {s.score}%</p> : null}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {s.graded && s.score !== undefined ? <ProgressRing value={s.score} /> : <span>{s.graded ? 'Graded' : 'Pending'}</span>}
                    </div>
                  </div>
                ))}
            {courseAssessments.length === 0 && !loading ? <p>No assessments scheduled.</p> : null}
          </div>
        </Card>
      </div>
    </PageShell>
  )
}
