import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { usePageView } from '../hooks/usePageView'
import { Card, Button, Skeleton } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { getPlatformData } from '../services/platformService'

export function MyLearningPage() {
  usePageView('MyCourses')
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  useEffect(() => { const timer = setTimeout(() => setLoading(false), 300); return () => clearTimeout(timer) }, [])
  const learningContent = getPlatformData()
  const display = learningContent.courses.filter((course) => (user?.enrolledCourses ?? []).includes(course.id))

  return <PageShell title="My Courses" subtitle="Your enrolled learning paths.">
    <div className="card-stack">
      {loading ? Array.from({ length: 2 }).map((_, index) => <Card key={index}><Skeleton width="60%" /><Skeleton width="100%" /><Skeleton width="120px" height="38px" /></Card>) : display.map((course) => {
        const courseModules = learningContent.modules.filter((module) => module.courseId === course.id)
        return <Card key={course.id} className="course-list-card">
          <div className="card-heading-row"><div><p className="eyebrow">{course.program}</p><h3>{course.name}</h3></div><span className="badge">Enrolled</span></div>
          <p className="muted-text">{course.academy}</p>
          <div className="course-module-list">
            {courseModules.map((module) => <div key={module.id}><span>Module {module.number}</span><strong>{module.title}</strong></div>)}
          </div>
          <Link to={`/course/${course.id}`}><Button variant="primary">Open course</Button></Link>
        </Card>
      })}
    </div>
  </PageShell>
}
