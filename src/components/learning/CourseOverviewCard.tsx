import { Card, Button } from '../ui'
import type { Course } from '../../types'

type CourseOverviewCardProps = {
  course: Course
  onStart: () => void
  started: boolean
}

export function CourseOverviewCard({ course, onStart, started }: CourseOverviewCardProps) {
  return (
    <Card className="hero-card">
      <div className="card-heading-row">
        <div>
          <p className="eyebrow">Course overview</p>
        </div>
        <span className="badge">{course.status}</span>
      </div>
      <p>{course.description}</p>
      <div className="course-meta-list">
        <div>
          <p className="eyebrow">Mentor</p>
          <p>{course.mentor}</p>
        </div>
        <div>
          <p className="eyebrow">Estimated duration</p>
          <p>{course.duration}</p>
        </div>
      </div>
      <div className="progress-row" style={{ marginTop: 16 }}>
        <span>{course.progress}% complete</span>
        <span>{course.progress > 0 ? 'In progress' : 'Not started'}</span>
      </div>
      <div className="meter" style={{ marginTop: 8 }}>
        <div style={{ width: `${course.progress}%` }} />
      </div>
      <div style={{ marginTop: 16 }}>
        <Button variant="primary" onClick={onStart}>{started ? 'Continue learning' : 'Start learning'}</Button>
      </div>
    </Card>
  )
}
