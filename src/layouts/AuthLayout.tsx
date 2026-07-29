import { Outlet } from 'react-router-dom'
import logo from '../assets/S_logo.png'

export function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-hero">
          <img src={logo} alt="Songa Academy logo" />
        </div>
        <Outlet />
      </div>
    </div>
  )
}
