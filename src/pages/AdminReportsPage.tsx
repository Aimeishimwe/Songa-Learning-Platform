import { useMemo } from 'react'
import { PageShell } from '../components/PageShell'
import { Card } from '../components/ui'
import { useProgramContext } from '../context/ProgramContext'
import { courses } from '../data/courses'
import { users } from '../data/users'

export function AdminReportsPage() {
  const { activeProgram } = useProgramContext()
  const scopedCourses = useMemo(() => courses.filter((course) => course.program === activeProgram.name), [activeProgram.name])
  const scopedScholars = useMemo(() => users.filter((user) => user.role === 'scholar' && user.program === activeProgram.name), [activeProgram.name])

  return (
    <PageShell title="Reports" subtitle="View engagement, completion, and learner growth insights for the selected program.">
      <div className="grid-2">
        <Card>
          <p className="eyebrow">Enrollment</p>
          <h3>{scopedScholars.length} scholars</h3>
          <p>Connected to {activeProgram.name}.</p>
        </Card>
        <Card>
          <p className="eyebrow">Course coverage</p>
          <h3>{scopedCourses.length} courses</h3>
          <p>Active learning tracks available in this workspace.</p>
        </Card>
      </div>
    </PageShell>
  )
}
