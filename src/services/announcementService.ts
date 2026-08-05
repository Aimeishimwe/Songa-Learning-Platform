import { announcements } from '../data/announcements'
import type { Announcement } from '../types'

export function getAnnouncements() {
  return announcements
}

export function createAnnouncement(input: {
  title: string
  description: string
  category: Announcement['category']
  program: NonNullable<Announcement['program']>
  targetProgramId?: string
  targetCourseId?: string
  targetRole?: Announcement['targetRole']
  createdBy?: string
}) {
  const announcement: Announcement = {
    id: `announcement-${Date.now()}`,
    title: input.title,
    category: input.category,
    date: new Date().toISOString().slice(0, 10),
    description: input.description,
    program: input.program,
    targetProgramId: input.targetProgramId || (input.program === 'All' ? 'All' : (input.program === 'Songa Girls Initiative' ? 'program-girls' : 'program-leadership')),
    targetCourseId: input.targetCourseId,
    targetRole: input.targetRole || 'All',
    createdBy: input.createdBy || 'admin-1',
  }

  announcements.push(announcement)
  return announcement
}
