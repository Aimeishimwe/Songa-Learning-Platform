import type { Announcement } from '../types'

export const announcements: Announcement[] = [
  {
    id: 'announcement-1',
    title: 'Welcome to Songa Academy',
    category: 'Foundation',
    date: '2026-07-20',
    description: 'Welcome to the new learning experience for scholars and mentors.',
    program: 'All',
  },
  {
    id: 'announcement-2',
    title: 'New assignment released',
    category: 'Course',
    date: '2026-07-22',
    description: 'A new frontend assignment is now available for active Songa Girls Initiative learners.',
    program: 'Songa Girls Initiative',
  },
  {
    id: 'announcement-3',
    title: 'Live session reminder',
    category: 'Program',
    date: '2026-07-24',
    description: 'Join the live session this Thursday to discuss course progress.',
    program: 'Songa Girls Initiative',
  },
  {
    id: 'announcement-4',
    title: 'Leadership Academy check-in',
    category: 'Program',
    date: '2026-07-25',
    description: 'A new leadership learning update is ready for your academy cohort.',
    program: 'Songa Leadership Academy',
  },
]

export function getAnnouncementsForProgram(program?: string) {
  const activeProgram = program ?? 'All'
  return announcements.filter((item) => item.program === 'All' || item.program === activeProgram)
}
