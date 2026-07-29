import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'

export function ForgotPasswordPage() {
  return (
    <PageShell title="Reset password" subtitle="We will guide you back into your account.">
      <div className="card-stack">
        <p>Enter your email and we will send a secure reset link.</p>
        <label>
          Email
          <input type="email" placeholder="you@example.com" />
        </label>
        <button className="btn btn-primary" type="button">Send reset link</button>
        <Link className="btn btn-secondary" to="/login">Back to login</Link>
      </div>
    </PageShell>
  )
}
