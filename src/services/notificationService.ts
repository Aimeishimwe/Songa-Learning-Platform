import { notifications } from '../data/notifications'
import type { Notification } from '../types'

export function getNotifications(userId: string) {
  return notifications.filter(n => n.userId === userId)
}

export function createNotification(userId: string, title: string, message: string, type: Notification['type']) {
  const notification: Notification = {
    id: `notif-${Date.now()}`,
    userId,
    title,
    message,
    type,
    read: false,
    createdAt: new Date().toISOString()
  }
  notifications.push(notification)
  return notification
}

export function markAsRead(notificationId: string) {
  const notification = notifications.find(n => n.id === notificationId)
  if (notification) {
    notification.read = true
  }
  return notification
}

export function markAllAsRead(userId: string) {
  notifications.forEach(n => {
    if (n.userId === userId) {
      n.read = true
    }
  })
}
