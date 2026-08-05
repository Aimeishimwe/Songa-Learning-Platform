import { mentorCourseAssignments } from '../data/mentorCourseAssignments'
import type { MentorCourseAssignment } from '../types'

export function getMentorCourseAssignments() {
  return mentorCourseAssignments
}

export function assignMentorToCourse(mentorId: string, courseId: string) {
  const existing = mentorCourseAssignments.find(mca => mca.mentorId === mentorId && mca.courseId === courseId)
  if (existing) {
    existing.status = 'Active'
    return existing
  }

  const assignment: MentorCourseAssignment = {
    id: `mca-${Date.now()}`,
    mentorId,
    courseId,
    assignedAt: new Date().toISOString().slice(0, 10),
    status: 'Active'
  }
  mentorCourseAssignments.push(assignment)
  return assignment
}

export function removeMentorFromCourse(mentorId: string, courseId: string) {
  const existing = mentorCourseAssignments.find(mca => mca.mentorId === mentorId && mca.courseId === courseId)
  if (existing) {
    existing.status = 'Inactive'
  }
  return existing
}
