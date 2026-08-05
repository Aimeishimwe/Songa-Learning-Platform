import { BookOpen, ClipboardList, LayoutDashboard, LogOut, Megaphone, PanelLeftClose, PanelLeftOpen, Settings, UserRound, UsersRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/S_logo.png'

type NavItem = { to: string; label: string; icon: LucideIcon }

const scholarLinks: NavItem[] = [
  { to: '/home', label: 'Home', icon: LayoutDashboard },
  { to: '/learning', label: 'My Courses', icon: BookOpen },
  { to: '/assignments', label: 'Assignments', icon: ClipboardList },
  { to: '/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/profile', label: 'Profile', icon: UserRound },
  { to: '/settings', label: 'Settings', icon: Settings },
]

const mentorLinks: NavItem[] = [
  { to: '/mentor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/mentor/assignments', label: 'Assignments', icon: ClipboardList },
  { to: '/mentor/profile', label: 'Profile', icon: UserRound },
  { to: '/mentor/settings', label: 'Settings', icon: Settings },
]

const adminLinks: NavItem[] = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/courses', label: 'Learning Management', icon: BookOpen },
  { to: '/admin/users', label: 'Learner Management', icon: UsersRound },
  { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

type SidebarProps = { isOpen?: boolean; onClose?: () => void; collapsed?: boolean; onToggleCollapse?: () => void }

export function Sidebar({ isOpen = false, onClose, collapsed = false, onToggleCollapse }: SidebarProps) {
  const { role, logout } = useAuth()
  const navigate = useNavigate()
  const links = role === 'mentor' ? mentorLinks : role === 'admin' ? adminLinks : scholarLinks
  const home = role === 'mentor' ? '/mentor/dashboard' : role === 'admin' ? '/admin/dashboard' : '/home'
  const cls = `sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`.trim()

  return <aside className={cls} aria-hidden={!isOpen && typeof window !== 'undefined' && window.innerWidth < 720}>
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="sidebar-collapse-toggle" onClick={onToggleCollapse} aria-label="Toggle platform navigation">
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
        <button className="sidebar-close" onClick={onClose} aria-label="Close menu">Close</button>
      </div>
      <Link to={home} className="brand-block" aria-label="Go to dashboard">
        <div className="brand-icon"><img src={logo} alt="" /></div>
        {!collapsed && <div><p className="brand-title">Songa Scholars</p><p className="brand-subtitle">Foundation Platform</p></div>}
      </Link>
      <nav className="nav-list">
        {links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} title={label} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => onClose?.()}>
          <Icon size={19} aria-hidden="true" /> {!collapsed && <span>{label}</span>}
        </NavLink>)}
      </nav>
    </div>
    <button className="logout-button" onClick={() => { logout(); navigate('/', { replace: true }) }} type="button"><LogOut size={18} aria-hidden="true" /> Log out</button>
  </aside>
}
