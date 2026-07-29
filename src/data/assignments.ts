import type { Assignment } from '../types'

export const assignments: Assignment[] = [
  {
    id: 'assignment-frontend-1',
    title: 'Create a personal profile page',
    courseId: 'course-frontend',
    deadline: '2026-07-20',
    instructions: 'Build a simple profile page with your name, image, and contact links.',
    status: 'Submitted',
  },
  {
    id: 'assignment-frontend-2',
    title: 'Build a semantic blog page',
    courseId: 'course-frontend',
    deadline: '2026-08-12',
    instructions: 'Use semantic tags to organize a blog layout.',
    status: 'Graded',
  },
  {
    id: 'assignment-frontend-3',
    title: 'Design a responsive course card section',
    courseId: 'course-frontend',
    deadline: '2026-08-20',
    instructions: 'Create a responsive section using flexbox and spacing.',
    status: 'Open',
  },
]
