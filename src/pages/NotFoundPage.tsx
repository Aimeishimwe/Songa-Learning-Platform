import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'

export function NotFoundPage() {
  return (
    <PageShell title="Page not found" subtitle="The requested page does not exist.">
      <Link className="btn btn-primary" to="/login">Return home</Link>
    </PageShell>
  )
}
