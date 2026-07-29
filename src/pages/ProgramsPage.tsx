import { useState } from 'react'
import { PageShell } from '../components/PageShell'
import { programs } from '../data/programs'
import { courses } from '../data/courses'
import { useAuth } from '../context/AuthContext'
import { Card, Button } from '../components/ui'

export function ProgramsPage() {
  const { user, enrollCourse, setSelectedProgram } = useAuth()
  const [selected, setSelected] = useState<string | null>(user?.selectedProgram ?? null)

  const handleSelect = (programName: string) => {
    setSelected(programName)
    setSelectedProgram && setSelectedProgram(programName)
  }

  return (
    <PageShell title="Programs" subtitle="Explore the learning opportunities offered by Songa.">
      <div className="card-stack">
        {programs.map((program) => (
          <Card key={program.id} className={selected === program.name ? 'fade-up' : ''}>
            <div className="card-heading-row">
              <div>
                <p className="eyebrow">Program</p>
                <h3>{program.name}</h3>
              </div>
              <div>
                {/* Only mentors/admins can select programs */}
                {user?.role && user.role !== 'scholar' ? (
                  <Button variant={selected === program.name ? 'secondary' : 'ghost'} onClick={() => handleSelect(program.name)}>{selected === program.name ? 'Selected' : 'Select'}</Button>
                ) : (
                  <span className="muted-text-small">Managed by mentor</span>
                )}
              </div>
            </div>
            <p>{program.description}</p>
            <div style={{ marginTop: 12 }}>
              <div className="chip-row">
                {program.academies.map((academy) => (
                  <span key={academy} className="chip">{academy}</span>
                ))}
              </div>

              <div style={{ marginTop: 12 }}>
                <h4>Courses</h4>
                <div className="card-stack">
                  {courses.filter((c) => program.academies.includes(c.academy)).map((course) => (
                    <div key={course.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>{course.name}</strong>
                        <div className="muted-text-small">{course.description}</div>
                      </div>
                      <div>
                        {/* Only mentors/admins can enroll/unenroll scholars */}
                        {user?.role && user.role !== 'scholar' ? (
                          <Button variant="ghost" onClick={() => enrollCourse && enrollCourse(course.id)}>
                            {user?.enrolledCourses?.includes(course.id) ? 'Unenroll' : 'Enroll'}
                          </Button>
                        ) : (
                          <span className="muted-text-small">{user?.enrolledCourses?.includes(course.id) ? 'Enrolled' : ''}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}
