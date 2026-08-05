import { enrollments } from '../data/enrollments'
import type { Enrollment } from '../types'

export function getEnrollments() {
  return enrollments
}

export function enrollUserInCourse(userId: string, courseId: string, programId: string, academy: string, cohort: string) {
  const existing = enrollments.find(e => e.userId === userId && e.courseId === courseId)
  if (existing) {
    existing.status = 'Active'
    return existing
  }

  const enrollment: Enrollment = {
    id: `enroll-${Date.now()}`,
    userId,
    courseId,
    programId,
    academy,
    cohort,
    enrolledAt: new Date().toISOString().slice(0, 10),
    status: 'Active'
  }
  enrollments.push(enrollment)
  return enrollment
}

export function updateEnrollmentStatus(enrollmentId: string, status: Enrollment['status']) {
  const enrollment = enrollments.find(e => e.id === enrollmentId)
  if (enrollment) {
    enrollment.status = status
  }
  return enrollment
}
