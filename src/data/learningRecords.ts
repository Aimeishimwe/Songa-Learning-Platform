import type { Feedback, Progress, Submission } from '../types'

export const submissions: Submission[] = [
  { id: 'submission-1', assignmentId: 'assignment-frontend-1', scholarId: 'scholar-1', submittedAt: '2026-07-19', fileName: 'aime-profile-page.zip', notes: 'I focused on clear structure and simple styling.', status: 'Reviewed' },
  { id: 'submission-2', assignmentId: 'assignment-frontend-2', scholarId: 'scholar-1', submittedAt: '2026-08-01', fileName: 'semantic-blog.zip', notes: 'Please review my section structure.', status: 'Under Review' },
]

export const feedback: Feedback[] = [
  {
    id: 'feedback-1',
    submissionId: 'submission-1',
    mentorId: 'mentor-1',
    comments: 'Strong structure and clear hierarchy. Your next improvement is tightening spacing consistency between sections.',
    grade: '88%',
    suggestions: ['Use one spacing scale', 'Add alt text that describes image purpose', 'Keep link labels specific'],
  },
]

export const progress: Progress[] = [
  { userId: 'scholar-1', courseId: 'course-frontend', completedLessons: 2, totalLessons: 4, assignmentsCompleted: 1, courseProgress: 45, lastActivity: 'CSS fundamentals' },
  { userId: 'scholar-2', courseId: 'course-communication', completedLessons: 5, totalLessons: 8, assignmentsCompleted: 2, courseProgress: 63, lastActivity: 'Storytelling' },
  { userId: 'scholar-3', courseId: 'course-leadership', completedLessons: 2, totalLessons: 8, assignmentsCompleted: 0, courseProgress: 24, lastActivity: 'Confidence Building' },
]

