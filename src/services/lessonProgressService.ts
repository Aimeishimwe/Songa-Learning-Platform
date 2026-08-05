import { lessonProgresses } from '../data/lessonProgress'
import type { LessonProgress } from '../types'

export function getLessonProgresses() {
  return lessonProgresses
}

export function getLessonProgress(userId: string, lessonId: string) {
  return lessonProgresses.find(lp => lp.userId === userId && lp.lessonId === lessonId)
}

export function updateLessonProgress(userId: string, lessonId: string, courseId: string, status: LessonProgress['status']) {
  let progress = lessonProgresses.find(lp => lp.userId === userId && lp.lessonId === lessonId)
  if (progress) {
    progress.status = status
    progress.lastViewedAt = new Date().toISOString().slice(0, 10)
  } else {
    progress = {
      id: `lp-${Date.now()}`,
      userId,
      lessonId,
      courseId,
      status,
      lastViewedAt: new Date().toISOString().slice(0, 10)
    }
    lessonProgresses.push(progress)
  }
  return progress
}
