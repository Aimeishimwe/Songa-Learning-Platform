import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { courses } from '../data/courses'
import { usePageView } from '../hooks/usePageView'
import { Card, Skeleton } from '../components/ui'
import { CourseOverviewCard } from '../components/learning'
import { LearningWorkspace } from '../components/learning'

export function CoursePage() {
  const { id } = useParams()
  const location = useLocation()
  const course = courses.find((item) => item.id === id)
  const [loading, setLoading] = useState(true)
  const [workspaceOpen, setWorkspaceOpen] = useState(Boolean((location.state as { openWorkspace?: boolean } | null)?.openWorkspace))
  usePageView(`Course:${course?.name ?? id ?? 'unknown'}`)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [])

  if (!course) {
    return <PageShell title="Course not found" subtitle="The selected course is unavailable."><p>Try another course.</p></PageShell>
  }

  return (
    <PageShell title={course.name} subtitle={course.description}>
      {loading ? (
        <Card className="hero-card">
          <div className="card-heading-row">
            <div style={{ width: '70%' }}>
              <Skeleton width="50%" />
            </div>
            <Skeleton width={48} height={18} />
          </div>
          <Skeleton width="100%" />
          <Skeleton width="40%" />
        </Card>
      ) : workspaceOpen ? (
        <LearningWorkspace course={course} />
      ) : (
        <CourseOverviewCard course={course} onStart={() => setWorkspaceOpen(true)} started={course.progress > 0} />
      )}
    </PageShell>
  )
}
