import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { ProgramSelector } from '../components/ui/ProgramSelector'
import { Topbar } from '../components/ui/Topbar'
import { useState } from 'react'

export function AdminLayout() {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar isOpen={open} onClose={() => setOpen(false)} collapsed={collapsed} onToggleCollapse={() => setCollapsed((value) => !value)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar onToggleSidebar={() => setOpen((v) => !v)} />
        <main className="content-area">
          <ProgramSelector />
          <Outlet />
        </main>
      </div>
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}
    </div>
  )
}
