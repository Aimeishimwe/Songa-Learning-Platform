import { useParams } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { modules } from '../data/modules'
import { lessons } from '../data/lessons'
import { useEffect, useState } from 'react'
import { SkeletonList } from '../components/ui'

export function ModulePage() {
  const { id } = useParams()
  const moduleItem = modules.find((item) => item.id === id)
  const moduleLessons = lessons.filter((lesson) => lesson.moduleId === id)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [id])

  if (!moduleItem) {
    return <PageShell title="Module unavailable" subtitle="This module cannot be loaded." />
  }

  return (
    <PageShell title={moduleItem.title} subtitle="A practical learning experience built around the course flow.">
      <div className="grid-2">
        <div className="card">
          <h3>Lesson flow</h3>
          <div className="list-stack">
            {loading ? <SkeletonList count={3} lines={1} /> : moduleLessons.map((lesson) => (
              <div key={lesson.id} className="announcement-item">
                <div>
                  <strong>{lesson.title}</strong>
                  <p>{lesson.content}</p>
                </div>
                <span>{lesson.type}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Resources</h3>
          <div className="list-stack">
            {loading ? <SkeletonList count={2} lines={1} /> : moduleItem.resources.map((resource) => (
              <div key={resource} className="announcement-item">
                <div><strong>{resource}</strong></div>
                <span>Download</span>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" type="button">Mark lesson complete</button>
        </div>
      </div>
    </PageShell>
  )
}
