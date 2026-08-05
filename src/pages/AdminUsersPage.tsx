import { useMemo, useState } from 'react'
import { PageShell } from '../components/PageShell'
import { Card, Button } from '../components/ui'
import { useProgramContext } from '../context/ProgramContext'
import { users as initialUsers } from '../data/users'
import type { User } from '../types'

export function AdminUsersPage() {
  const { activeProgram } = useProgramContext()
  const [usersState, setUsersState] = useState<User[]>(() => initialUsers)
  const [search, setSearch] = useState('')

  const scopedUsers = useMemo(() => usersState.filter((user) => user.program === activeProgram.name || user.role === 'admin' || user.role === 'mentor').filter((user) => {
    if (!search) return true
    return `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())
  }), [activeProgram.name, search, usersState])

  const toggleStatus = (userId: string) => {
    setUsersState((current) => current.map((user) => user.id === userId ? { ...user, enrolled: user.enrolled === false ? true : false } : user))
  }

  const removeUser = (userId: string) => {
    setUsersState((current) => current.filter((user) => user.id !== userId))
  }

  return (
    <PageShell title="Learner Management" subtitle="Manage scholars, mentors, enrollments, and progress monitoring within the selected program.">
      <Card style={{ marginBottom: 16 }}>
        <div className="card-heading-row">
          <div>
            <p className="eyebrow">Program scope</p>
            <h3>{activeProgram.name}</h3>
          </div>
        </div>
        <label>
          Search users
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a scholar or mentor" />
        </label>
      </Card>

      <div className="card-stack">
        {scopedUsers.map((user) => (
          <Card key={user.id}>
            <div className="card-heading-row">
              <div>
                <h3>{user.name}</h3>
                <p>{user.role} • {user.program ?? 'No program assigned'}</p>
              </div>
              <div className="setting-actions">
                <Button variant="secondary" type="button" onClick={() => toggleStatus(user.id)}>{user.enrolled === false ? 'Activate' : 'Suspend'}</Button>
                <Button variant="ghost" type="button" onClick={() => removeUser(user.id)}>Remove</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}
