import { Navigate, Route, Routes } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useAuth } from '../context/AuthContext'
import { ScholarLayout } from '../layouts/ScholarLayout'
import { MentorLayout } from '../layouts/MentorLayout'
import { AdminLayout } from '../layouts/AdminLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { LoginPage } from '../pages/LoginPage'
import { LandingPage } from '../pages/LandingPage'
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { Suspense, lazy } from 'react'

// Lazy-load heavier pages to improve initial performance
const ScholarDashboardPage = lazy(() => import('../pages/ScholarDashboardPage').then(m => ({ default: m.ScholarDashboardPage })))
const MyLearningPage = lazy(() => import('../pages/MyLearningPage').then(m => ({ default: m.MyLearningPage })))
const ProgramsPage = lazy(() => import('../pages/ProgramsPage').then(m => ({ default: m.ProgramsPage })))
const CoursePage = lazy(() => import('../pages/CoursePage').then(m => ({ default: m.CoursePage })))
const ModulePage = lazy(() => import('../pages/ModulePage').then(m => ({ default: m.ModulePage })))
const AssignmentPage = lazy(() => import('../pages/AssignmentPage').then(m => ({ default: m.AssignmentPage })))
const AssessmentPage = lazy(() => import('../pages/AssessmentPage').then(m => ({ default: m.AssessmentPage })))
const AnnouncementsPage = lazy(() => import('../pages/AnnouncementsPage').then(m => ({ default: m.AnnouncementsPage })))
const ScholarAssignmentsPage = lazy(() => import('../pages/ScholarAssignmentsPage').then(m => ({ default: m.ScholarAssignmentsPage })))
const ProfilePage = lazy(() => import('../pages/ProfilePage').then(m => ({ default: m.ProfilePage })))
const SettingsPage = lazy(() => import('../pages/SettingsPage').then(m => ({ default: m.SettingsPage })))
const MentorDashboardPage = lazy(() => import('../pages/MentorDashboardPage').then(m => ({ default: m.MentorDashboardPage })))
const MentorAssignmentsPage = lazy(() => import('../pages/MentorAssignmentsPage').then(m => ({ default: m.MentorAssignmentsPage })))
const AdminDashboardPage = lazy(() => import('../pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })))
const AdminProgramsPage = lazy(() => import('../pages/AdminProgramsPage').then(m => ({ default: m.AdminProgramsPage })))
const AdminCoursesPage = lazy(() => import('../pages/AdminCoursesPage').then(m => ({ default: m.AdminCoursesPage })))
const AdminUsersPage = lazy(() => import('../pages/AdminUsersPage').then(m => ({ default: m.AdminUsersPage })))
const AdminAnnouncementsPage = lazy(() => import('../pages/AdminAnnouncementsPage').then(m => ({ default: m.AdminAnnouncementsPage })))

function ProtectedRoute({ children, allowedRoles }: { children: ReactElement; allowedRoles: Array<'scholar' | 'mentor' | 'admin'> }) {
  const { user, role } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.includes(role as 'scholar' | 'mentor' | 'admin')) {
    return children
  }

  const homeByRole = { scholar: '/home', mentor: '/mentor/dashboard', admin: '/admin/dashboard' } as const
  return <Navigate to={homeByRole[role as keyof typeof homeByRole] ?? '/login'} replace />
}

export function AppRoutes() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
      <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route element={<ScholarLayout />}>
        <Route path="/home" element={<ProtectedRoute allowedRoles={['scholar']}><ScholarDashboardPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['scholar']}><ScholarDashboardPage /></ProtectedRoute>} />
        <Route path="/learning" element={<ProtectedRoute allowedRoles={['scholar']}><MyLearningPage /></ProtectedRoute>} />
        <Route path="assignments" element={<ProtectedRoute allowedRoles={['scholar']}><ScholarAssignmentsPage /></ProtectedRoute>} />
        <Route path="/programs" element={<ProtectedRoute allowedRoles={['scholar']}><ProgramsPage /></ProtectedRoute>} />
        <Route path="/course/:id" element={<ProtectedRoute allowedRoles={['scholar']}><CoursePage /></ProtectedRoute>} />
        <Route path="/module/:id" element={<ProtectedRoute allowedRoles={['scholar']}><ModulePage /></ProtectedRoute>} />
        <Route path="/assignment/:id" element={<ProtectedRoute allowedRoles={['scholar']}><AssignmentPage /></ProtectedRoute>} />
        <Route path="/quiz/:id" element={<ProtectedRoute allowedRoles={['scholar']}><AssessmentPage /></ProtectedRoute>} />
        <Route path="/announcements" element={<ProtectedRoute allowedRoles={['scholar']}><AnnouncementsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={['scholar']}><ProfilePage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute allowedRoles={['scholar']}><SettingsPage /></ProtectedRoute>} />
      </Route>

      <Route element={<MentorLayout />}>
        <Route path="/mentor/dashboard" element={<ProtectedRoute allowedRoles={['mentor']}><MentorDashboardPage /></ProtectedRoute>} />
        <Route path="/mentor/assignments" element={<ProtectedRoute allowedRoles={['mentor']}><MentorAssignmentsPage /></ProtectedRoute>} />
        <Route path="/mentor/profile" element={<ProtectedRoute allowedRoles={['mentor']}><ProfilePage /></ProtectedRoute>} />
        <Route path="/mentor/settings" element={<ProtectedRoute allowedRoles={['mentor']}><SettingsPage /></ProtectedRoute>} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/programs" element={<ProtectedRoute allowedRoles={['admin']}><AdminProgramsPage /></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={['admin']}><AdminCoursesPage /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsersPage /></ProtectedRoute>} />
        <Route path="/admin/announcements" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnnouncementsPage /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={['admin']}><ProfilePage /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><SettingsPage /></ProtectedRoute>} />
      </Route>

      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
