import { PageShell } from '../components/PageShell'

export function MentorAssignmentsPage() {
  return (
    <PageShell title="Assignments management" subtitle="Review learner submissions and provide feedback.">
      <div className="card-stack">
        <div className="card">
          <div className="card-heading-row">
            <div>
              <p className="eyebrow">Awaiting review</p>
              <h3>Create a responsive course card section</h3>
            </div>
            <span className="badge">Pending</span>
          </div>
          <button className="btn btn-secondary" type="button">Review submission</button>
        </div>
      </div>
    </PageShell>
  )
}
