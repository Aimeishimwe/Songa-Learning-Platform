import type { Enrollment } from '../types'

export const enrollments: Enrollment[] = [
  {
    id: 'enroll-1',
    userId: 'scholar-1',
    courseId: 'course-frontend',
    programId: 'program-girls',
    academy: 'Tech Sisters',
    cohort: 'Cohort 1',
    enrolledAt: '2026-01-15',
    status: 'Active'
  },
  {
    id: 'enroll-2',
    userId: 'scholar-2',
    courseId: 'course-communication',
    programId: 'program-girls',
    academy: 'Her Influence Academy',
    cohort: 'Cohort 2',
    enrolledAt: '2026-02-10',
    status: 'Active'
  },
  {
    id: 'enroll-3',
    userId: 'scholar-3',
    courseId: 'course-leadership',
    programId: 'program-leadership',
    academy: 'Leadership Development Academy',
    cohort: 'Cohort 3',
    enrolledAt: '2026-03-01',
    status: 'Active'
  }
]
