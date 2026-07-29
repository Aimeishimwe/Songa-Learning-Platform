import type { Assessment } from '../types'

export const assessments: Assessment[] = [
  {
    id: 'quiz-1',
    courseId: 'course-frontend',
    title: 'Module 1 Quiz',
    type: 'Quiz',
    date: '2026-07-30',
    dueDate: '2026-08-02',
    score: 82,
    graded: true,
  },
  {
    id: 'quiz-2',
    courseId: 'course-frontend',
    title: 'Module 2 Quiz',
    type: 'Quiz',
    date: '2026-08-06',
    dueDate: '2026-08-09',
    graded: false,
  },
  {
    id: 'final-frontend',
    courseId: 'course-frontend',
    title: 'Final Assessment',
    type: 'Final',
    date: '2026-08-25',
    dueDate: '2026-08-25',
    graded: false,
  },
]

export default assessments
