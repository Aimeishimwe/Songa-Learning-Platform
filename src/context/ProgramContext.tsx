import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { programs } from '../data/programs'
import type { Program } from '../types'

type ProgramContextValue = {
  programs: Program[]
  activeProgram: Program
  setActiveProgram: (programName: string) => void
  getProgramCourses: (programName?: string) => Program['name'][]
}

const ProgramContext = createContext<ProgramContextValue | undefined>(undefined)

function getProgramByName(programName: string) {
  return programs.find((program) => program.name === programName) ?? programs[0]
}

export function ProgramProvider({ children }: { children: ReactNode }) {
  const [activeProgramName, setActiveProgramName] = useState(programs[0].name)

  const activeProgram = useMemo(() => getProgramByName(activeProgramName), [activeProgramName])

  const setActiveProgram = (programName: string) => {
    if (getProgramByName(programName)) {
      setActiveProgramName(programName)
    }
  }

  const getProgramCourses = (programName?: string) => {
    const resolvedName = programName ?? activeProgram.name
    return programs.filter((program) => program.name === resolvedName).map((program) => program.name)
  }

  const value = useMemo(() => ({
    programs,
    activeProgram,
    setActiveProgram,
    getProgramCourses,
  }), [activeProgram, getProgramCourses])

  return <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>
}

export function useProgramContext() {
  const context = useContext(ProgramContext)
  if (!context) {
    throw new Error('useProgramContext must be used within a ProgramProvider')
  }
  return context
}
