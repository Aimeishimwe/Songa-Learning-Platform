import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PageShell } from '../components/PageShell'

export function LoginPage() {
  const [email, setEmail] = useState('scholar@songa.org')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const success = login(email, password)
    if (!success) {
      setError('Invalid credentials. Try scholar@songa.org, mentor@songa.org, or admin@songa.org.')
      return
    }

    setError('')
    const currentUser = localStorage.getItem('songa-role')
    if (currentUser) {
      localStorage.setItem('songa-role', 'scholar')
    }

    const role = email.includes('mentor') ? 'mentor' : email.includes('admin') ? 'admin' : email.includes('graduate') ? 'graduate' : 'scholar'
    localStorage.setItem('songa-role', role)

    if (role === 'mentor') {
      navigate('/mentor/dashboard')
    } else if (role === 'admin') {
      navigate('/admin/dashboard')
    } else if (role === 'graduate') {
      navigate('/graduate/dashboard')
    } else {
      navigate('/home')
    }
  }

  return (
    <PageShell title="Sign in" subtitle="Access your learning journey with Songa Academy.">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        {error ? <p className="error-text">{error}</p> : null}
        <button className="btn btn-primary" type="submit">Login</button>
        <Link className="btn btn-secondary" to="/forgot-password">Forgot Password</Link>
      </form>
      <div className="demo-grid">
        <div className="demo-card">
          <strong>Scholar</strong>
          <p>scholar@songa.org / password</p>
        </div>
        <div className="demo-card">
          <strong>Leadership Academy Scholar</strong>
          <p>eric@songa.org / password</p>
        </div>
        <div className="demo-card">
          <strong>Mentor</strong>
          <p>mentor@songa.org / password</p>
        </div>
        <div className="demo-card">
          <strong>Admin</strong>
          <p>admin@songa.org / password</p>
        </div>
      </div>
    </PageShell>
  )
}
