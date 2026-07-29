import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function Topbar({ title, onToggleSidebar }: { title?: string; onToggleSidebar?: () => void }) {
  const { role } = useAuth()
  const homeByRole = {
    scholar: '/home',
    graduate: '/graduate/dashboard',
    mentor: '/mentor/dashboard',
    admin: '/admin/dashboard',
  } as const
  const home = role ? homeByRole[role] : '/login'

  return (
    <header className="topbar" role="banner">
      <div className="topbar-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Open menu">Menu</button>
        <Link to={home} className="brand-icon" aria-label="Go to dashboard">S</Link>
        {title ? <h2 className="topbar-title">{title}</h2> : null}
      </div>
    </header>
  )
}

export default Topbar
