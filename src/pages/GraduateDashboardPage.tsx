import { PageShell } from '../components/PageShell'

export function GraduateDashboardPage() {
  return (
    <PageShell title="Graduate dashboard" subtitle="Welcome back, your learning journey continues beyond the classroom.">
      <div className="grid-2">
        <div className="card">
          <p className="eyebrow">My journey</p>
          <h3>Completed programs and alumni opportunities</h3>
          <p>You remain connected with the Songa community and future learning opportunities.</p>
        </div>
        <div className="card">
          <p className="eyebrow">Upcoming opportunities</p>
          <h3>Mentorship and career events</h3>
          <p>Stay engaged through upcoming programs and future academies.</p>
        </div>
      </div>
    </PageShell>
  )
}
