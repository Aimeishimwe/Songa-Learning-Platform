import { useProgramContext } from '../../context/ProgramContext'

export function ProgramSelector() {
  const { programs, activeProgram, setActiveProgram } = useProgramContext()

  return (
    <div className="card" style={{ marginBottom: 16, padding: '14px 16px' }}>
      <div className="card-heading-row">
        <div>
          <p className="eyebrow">Current program</p>
          <h3>{activeProgram.name}</h3>
        </div>
        <label style={{ minWidth: 220 }}>
          <span className="muted-text">Switch workspace</span>
          <select value={activeProgram.name} onChange={(event) => setActiveProgram(event.target.value)} style={{ marginTop: 6 }}>
            {programs.map((program) => (
              <option key={program.id} value={program.name}>
                {program.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}
