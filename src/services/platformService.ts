import { announcements } from '../data/announcements'
import { assignments } from '../data/assignments'
import { assessments } from '../data/assessments'
import { courses } from '../data/courses'
import { lessons } from '../data/lessons'
import { modules } from '../data/modules'
import { programs } from '../data/programs'
import { users } from '../data/users'
import type { Announcement, Assessment, Assignment, Course, Lesson, ModuleItem, Program, User } from '../types'

export type PlatformData = {
  programs: Program[]
  courses: Course[]
  modules: ModuleItem[]
  lessons: Lesson[]
  assignments: Assignment[]
  assessments: Assessment[]
  users: User[]
  announcements: Announcement[]
}

export function getPlatformData(): PlatformData {
  return {
    programs: [...programs],
    courses: [...courses],
    modules: [...modules],
    lessons: [...lessons],
    assignments: [...assignments],
    assessments: [...assessments],
    users: [...users],
    announcements: [...announcements],
  }
}

export async function fetchPlatformData(): Promise<PlatformData> {
  return Promise.resolve(getPlatformData())
}

export function getPlatformDataForProgram(programName: string) {
  const data = getPlatformData()
  return {
    ...data,
    courses: data.courses.filter((course) => course.program === programName),
    modules: data.modules.filter((module) => data.courses.some((course) => course.program === programName && course.id === module.courseId)),
    lessons: data.lessons.filter((lesson) => data.modules.some((module) => module.id === lesson.moduleId && data.courses.some((course) => course.program === programName && course.id === module.courseId))),
    assignments: data.assignments.filter((assignment) => data.courses.some((course) => course.program === programName && course.id === assignment.courseId)),
    assessments: data.assessments.filter((assessment) => data.courses.some((course) => course.program === programName && course.id === assessment.courseId)),
    users: data.users.filter((user) => user.program === programName || user.role === 'mentor' || user.role === 'admin'),
    announcements: data.announcements.filter((announcement) => announcement.program === 'All' || announcement.program === programName),
  }
}
