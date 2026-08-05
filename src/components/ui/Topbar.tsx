import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Check, MessageSquare } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getNotifications, markAsRead, markAllAsRead } from '../../services/notificationService'
import type { Notification } from '../../types'
import logo from '../../assets/S_logo.png'

export function Topbar({ title, onToggleSidebar }: { title?: string; onToggleSidebar?: () => void }) {
  const { user, role } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const [notifs, setNotifs] = useState<Notification[]>([])

  useEffect(() => {
    if (user) {
      setNotifs(getNotifications(user.id))
    }
  }, [user])

  const homeByRole = {
    scholar: '/home',
    mentor: '/mentor/dashboard',
    admin: '/admin/dashboard',
  } as const
  const home = role ? homeByRole[role] : '/login'

  const unreadCount = notifs.filter(n => !n.read).length

  const handleMarkRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    markAsRead(id)
    if (user) {
      setNotifs(getNotifications(user.id))
    }
  }

  const handleMarkAllRead = () => {
    if (user) {
      markAllAsRead(user.id)
      setNotifs(getNotifications(user.id))
    }
  }

  return (
    <header className="topbar" role="banner" style={{ position: 'relative' }}>
      <div className="topbar-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Open menu">Menu</button>
        <Link to={home} className="brand-icon" aria-label="Go to dashboard"><img src={logo} alt="Songa Scholars" /></Link>
        {title ? <h2 className="topbar-title">{title}</h2> : null}
      </div>

      {user && (
        <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginRight: '24px', position: 'relative' }}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="btn-secondary"
            style={{ 
              position: 'relative', 
              padding: '8px', 
              borderRadius: '50%', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0,0,0,0.1)'
            }}
            aria-label="View notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: '-4px', 
                right: '-4px', 
                background: 'var(--color-danger, #ef4444)', 
                color: 'white', 
                fontSize: '10px', 
                fontWeight: 'bold',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {showDropdown && (
            <div className="card" style={{ 
              position: 'absolute', 
              top: '45px', 
              right: '0', 
              width: '320px', 
              zIndex: 1000, 
              padding: '12px',
              maxHeight: '400px',
              overflowY: 'auto',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              border: '1px solid rgba(0,0,0,0.1)',
              background: '#fff'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Notifications</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={handleMarkAllRead}
                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {notifs.length === 0 ? (
                <div style={{ padding: '16px 0', textAlign: 'center', color: '#888', fontSize: '12px' }}>
                  No notifications yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {notifs.map(n => (
                    <div 
                      key={n.id} 
                      style={{ 
                        padding: '8px', 
                        borderRadius: '6px', 
                        background: n.read ? '#fff' : 'rgba(231,185,78,0.08)',
                        borderLeft: n.read ? '3px solid #ccc' : '3px solid var(--color-accent)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        fontSize: '12px',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontWeight: 'bold' }}>{n.title}</span>
                        {!n.read && (
                          <button 
                            onClick={(e) => handleMarkRead(n.id, e)}
                            style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', padding: '2px' }}
                            title="Mark as read"
                          >
                            <Check size={14} />
                          </button>
                        )}
                      </div>
                      <p style={{ margin: 0, color: '#555' }}>{n.message}</p>
                      <span style={{ fontSize: '10px', color: '#999', marginTop: '4px' }}>
                        {new Date(n.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Topbar
