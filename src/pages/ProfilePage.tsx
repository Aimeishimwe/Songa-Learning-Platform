import { PageShell } from '../components/PageShell'
import { useAuth } from '../context/AuthContext'
import { Card, Avatar } from '../components/ui'
import { usePageView } from '../hooks/usePageView'

export function ProfilePage() {
  const { user, role } = useAuth()
  usePageView('Profile')

  return (
    <PageShell title="Profile" subtitle={role === 'mentor' ? 'Your mentoring profile and assigned learning area.' : role === 'admin' ? 'Your platform administration profile.' : 'Your learning profile and current journey.'}>
      <div className="card-stack">
        <Card>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Avatar name={user?.name} />
            <div>
              <h3>{user?.name ?? 'Aime Uwase'}</h3>
              <p>{user?.email ?? 'scholar@songa.org'}</p>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            {role === 'mentor' ? <><p><strong>Area of expertise:</strong> {user?.expertise ?? 'Not set'}</p><p><strong>Assigned course:</strong> {user?.assignedCourse ?? 'Not assigned'}</p></> : role === 'admin' ? <p><strong>Role:</strong> Platform administrator</p> : <><p><strong>Program:</strong> {user?.program ?? 'Songa Girls Initiative'}</p><p><strong>Academy:</strong> {user?.academy ?? 'Tech Sisters'}</p><p><strong>Current course:</strong> {user?.course ?? 'Front-End Web Development'}</p></>}
          </div>
        </Card>
      </div>
    </PageShell>
  )
}
