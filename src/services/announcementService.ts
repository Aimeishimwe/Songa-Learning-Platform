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
}) {
  const announcement: Announcement = {
    id: `announcement-${Date.now()}`,
    title: input.title,
    category: input.category,
    date: new Date().toISOString().slice(0, 10),
    description: input.description,
    program: input.program,
  }

  announcements.push(announcement)
  return announcement
}
