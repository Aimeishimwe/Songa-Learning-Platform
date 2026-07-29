import { PageShell } from '../components/PageShell'
import { Card, Button } from '../components/ui'
import { useProgramContext } from '../context/ProgramContext'
import { programs as initialPrograms } from '../data/programs'
import { useState } from 'react'
import type { Program } from '../types'

export function AdminProgramsPage() {
  const { activeProgram, setActiveProgram } = useProgramContext()
  const [programsState, setProgramsState] = useState<Program[]>(() => initialPrograms)
  const [form, setForm] = useState({ name: '', description: '', academies: '' })

  const saveProgram = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name.trim() || !form.description.trim()) return

    const newProgram: Program = {
      id: `program-${Date.now()}`,
      name: form.name.trim(),
      description: form.description.trim(),
      academies: form.academies.split(',').map((item) => item.trim()).filter(Boolean),
    }

    setProgramsState((current) => [...current, newProgram])
    setActiveProgram(newProgram.name)
    setForm({ name: '', description: '', academies: '' })
  }

  return (
    <PageShell title="Programs management" subtitle="Create, edit, and organize programs.">
      <Card style={{ marginBottom: 16 }}>
        <div className="card-heading-row">
          <div>
            <p className="eyebrow">Active workspace</p>
            <h3>{activeProgram.name}</h3>
          </div>
        </div>
        <p className="muted-text">Switching the workspace updates the program context for all admin pages.</p>
      </Card>

      <Card>
        <form className="auth-form" onSubmit={saveProgram}>
          <label>
            Program name
            <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="New program" />
          </label>
          <label>
            Description
            <textarea rows={3} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="Describe the initiative" />
          </label>
          <label>
            Academies
            <input value={form.academies} onChange={(event) => setForm((current) => ({ ...current, academies: event.target.value }))} placeholder="Academy A, Academy B" />
          </label>
          <Button variant="primary" type="submit">Create program</Button>
        </form>
      </Card>

      <div className="card-stack" style={{ marginTop: 16 }}>
        {programsState.map((program) => (
          <Card key={program.id}>
            <div className="card-heading-row">
              <div>
                <h3>{program.name}</h3>
                <p>{program.description}</p>
              </div>
              <Button variant="secondary" type="button" onClick={() => setActiveProgram(program.name)}>Use this program</Button>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}
