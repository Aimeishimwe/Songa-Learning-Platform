import { courses as initialCourses } from '../data/courses'
import { lessons as initialLessons } from '../data/lessons'
import { modules as initialModules } from '../data/modules'
import { assignments as initialAssignments } from '../data/assignments'
import { assessments as initialAssessments } from '../data/assessments'
import type { Assessment, Assignment, Course, Lesson, ModuleItem } from '../types'

type AdminCourseState = { courses: Course[]; modules: ModuleItem[]; lessons: Lesson[]; assignments: Assignment[]; assessments: Assessment[] }

const storageKey = 'songa-admin-course-state-v1'

export function getAdminContent(): AdminCourseState {
  if (typeof window === 'undefined') return { courses: initialCourses, modules: initialModules, lessons: initialLessons, assignments: initialAssignments, assessments: initialAssessments }
  try {
    const saved = window.localStorage.getItem(storageKey)
    if (!saved) return { courses: initialCourses, modules: initialModules, lessons: initialLessons, assignments: initialAssignments, assessments: initialAssessments }
    const parsed = JSON.parse(saved) as Partial<AdminCourseState>
    return {
      courses: parsed.courses?.length ? parsed.courses : initialCourses,
      modules: parsed.modules?.length ? parsed.modules : initialModules,
      lessons: parsed.lessons?.length ? parsed.lessons : initialLessons,
      assignments: parsed.assignments?.length ? parsed.assignments : initialAssignments,
      assessments: parsed.assessments?.length ? parsed.assessments : initialAssessments,
    }
  } catch {
    return { courses: initialCourses, modules: initialModules, lessons: initialLessons, assignments: initialAssignments, assessments: initialAssessments }
  }
}
