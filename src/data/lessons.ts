import type { Lesson } from '../types'

export const lessons: Lesson[] = [
  {
    id: 'lesson-frontend-1',
    moduleId: 'module-frontend-1',
    title: 'Welcome to the course',
    type: 'Video',
    content: 'Watch the introduction and meet the learning path for the course.',
  },
  {
    id: 'lesson-frontend-2',
    moduleId: 'module-frontend-2',
    title: 'Semantic HTML structure',
    type: 'Reading',
    content: 'Review how to structure pages with proper headings, sections, and links.',
  },
  {
    id: 'lesson-frontend-3',
    moduleId: 'module-frontend-3',
    title: 'Flexbox and layouts',
    type: 'Video',
    content: 'Learn how to create responsive cards and aligned sections.',
  },
  {
    id: 'lesson-frontend-4',
    moduleId: 'module-frontend-4',
    title: 'Interactivity with JavaScript',
    type: 'Reading',
    content: 'Start adding simple interactions to your web pages.',
  },
]
