import { PageShell } from '../components/PageShell'

export function MentorCohortsPage() {
  return (
    <PageShell title="My cohorts" subtitle="Monitor progress for all assigned cohorts.">
      <div className="card-stack">
        <div className="card">
          <div className="card-heading-row">
            <div>
              <p className="eyebrow">Front-End Development</p>
              <h3>Cohort 1</h3>
            </div>
            <span className="badge">20 scholars</span>
          </div>
          <p>65% completion rate</p>
        </div>
      </div>
    </PageShell>
  )
}
