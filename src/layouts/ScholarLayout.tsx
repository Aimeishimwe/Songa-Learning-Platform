import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/ui/Topbar'
import { useState } from 'react'

export function ScholarLayout() {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar isOpen={open} onClose={() => setOpen(false)} collapsed={collapsed} onToggleCollapse={() => setCollapsed((value) => !value)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar onToggleSidebar={() => setOpen((v) => !v)} />
        <main className="content-area" role="main">
          <Outlet />
        </main>
      </div>
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}
    </div>
  )
}
