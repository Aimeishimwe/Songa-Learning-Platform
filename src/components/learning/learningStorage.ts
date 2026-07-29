type ProgressState = {
  activeItemId: string | null
  completedItems: string[]
}

const storageKey = 'songa-learning-progress'

export function saveCourseProgress(courseId: string, state: ProgressState) {
  const raw = localStorage.getItem(storageKey)
  const existing = raw ? JSON.parse(raw) : {}
  existing[courseId] = state
  localStorage.setItem(storageKey, JSON.stringify(existing))
}

export function loadCourseProgress(courseId: string): ProgressState {
  const raw = localStorage.getItem(storageKey)
  if (!raw) return { activeItemId: null, completedItems: [] }

  const parsed = JSON.parse(raw)
  return parsed[courseId] ?? { activeItemId: null, completedItems: [] }
}
