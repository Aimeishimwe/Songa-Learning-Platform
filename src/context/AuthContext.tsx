import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { User, UserRole } from '../types'
import { users } from '../data/users'
import { track } from '../services/analytics'

type AuthContextValue = {
  user: User | null
  role: UserRole | null
  login: (email: string, password: string) => boolean
  logout: () => void
  enrollCourse?: (courseId: string) => void
  setSelectedProgram?: (programName: string) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)

  const login = (email: string, password: string) => {
    const found = users.find((item) => item.email === email && item.password === password)
    if (!found) {
      return false
    }

    // ensure mutable user copy for local session
    const sessionUser: User = { ...found }
    if (!sessionUser.enrolledCourses) {
      sessionUser.enrolledCourses = sessionUser.course ? [sessionUser.course.replace(/ /g, '-').toLowerCase()] : []
    }
    if (!sessionUser.selectedProgram) {
      sessionUser.selectedProgram = sessionUser.program
    }

    setUser(sessionUser)
    setRole(sessionUser.role)
    try { track('login', { email: found.email, role: found.role }) } catch {}
    return true
  }

  const logout = () => {
    setUser(null)
    setRole(null)
  }

  const enrollCourse = (courseId: string) => {
    if (!user) return
    const enrolled = user.enrolledCourses ?? []
    const exists = enrolled.includes(courseId)
    const updated = exists ? enrolled.filter((c) => c !== courseId) : [...enrolled, courseId]
    setUser({ ...user, enrolledCourses: updated })
  }

  const setSelectedProgram = (programName: string) => {
    if (!user) return
    setUser({ ...user, selectedProgram: programName })
  }

  const value = useMemo(() => ({ user, role, login, logout, enrollCourse, setSelectedProgram }), [user, role])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
