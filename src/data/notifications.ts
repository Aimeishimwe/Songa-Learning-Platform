import type { Notification } from '../types'

export const notifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'scholar-1',
    title: 'Welcome!',
    message: 'Welcome to Songa Scholars Foundation! Explore your courses and announcements.',
    type: 'General',
    read: false,
    createdAt: '2026-08-01T09:00:00Z'
  },
  {
    id: 'notif-2',
    userId: 'scholar-1',
    title: 'New Announcement',
    message: 'A new platform update announcement has been published.',
    type: 'Announcement',
    read: false,
    createdAt: '2026-08-02T10:15:00Z'
  },
  {
    id: 'notif-3',
    userId: 'scholar-1',
    title: 'Assignment Graded',
    message: 'Your Frontend Basics assignment has been graded. Your score is 85/100.',
    type: 'Grade',
    read: true,
    createdAt: '2026-07-28T14:30:00Z'
  }
]
