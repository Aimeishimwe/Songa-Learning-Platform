export type UserRole = 'scholar' | 'mentor' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
  program?: string
  academy?: string
  course?: string
  progress?: number
  currentModule?: string
  assignmentStatus?: string
  quizScore?: number
  enrolled?: boolean
  enrolledCourses?: string[]
  selectedProgram?: string
  expertise?: string
  assignedCourse?: string
  bio?: string
  avatar?: string
  enrollment?: {
    program: string
    academy: string
    course: string
    cohort: string
  }
}

export interface Program {
  id: string
  name: string
  description: string
  academies: string[]
}

export interface Course {
  id: string
  name: string
  program: string
  academy: string
  description: string
  mentor: string
  duration: string
  progress: number
  status: 'Active' | 'Locked' | 'Coming Soon'
  modules: string[]
  coverImage?: string
}

export interface ModuleItem {
  id: string
  courseId: string
  title: string
  number: number
  status: 'Completed' | 'Current' | 'Locked'
  lessons: string[]
  resources: string[]
  assignmentId?: string
  quizId?: string
}

export interface Lesson {
  id: string
  moduleId: string
  title: string
  type: 'Video' | 'Reading' | 'Quiz' | 'Assignment'
  content: string
  videoUrl?: string
  materialUrl?: string
  attachmentName?: string
}

export interface Assignment {
  id: string
  title: string
  courseId: string
  deadline: string
  instructions: string
  status: 'Draft' | 'Open' | 'Submitted' | 'Graded' | 'Closed'
}

export interface Assessment {
  id: string
  courseId: string
  title: string
  type: 'Quiz' | 'Final'
  date: string
  dueDate?: string
  score?: number
  graded?: boolean
}

export interface Feedback {
  id: string
  submissionId: string
  mentorId: string
  comments: string
  grade: string
  suggestions: string[]
}

export interface Progress {
  userId: string
  courseId: string
  completedLessons: number
  totalLessons: number
  assignmentsCompleted: number
  courseProgress: number
  lastActivity: string
}

export interface Submission {
  id: string
  assignmentId: string
  scholarId: string
  submittedAt: string
  fileName: string
  notes: string
  status: string
}

// Refined Announcement with targeting properties
export interface Announcement {
  id: string
  title: string
  category: 'Foundation' | 'Program' | 'Course'
  date: string
  description: string
  program?: 'All' | 'Songa Girls Initiative' | 'Songa Leadership Academy'
  targetProgramId?: string  // 'program-girls', 'program-leadership', 'All'
  targetCourseId?: string   // course-frontend, course-backend, 'All', or undefined
  targetRole?: UserRole | 'All' // 'scholar', 'mentor', 'admin', 'All'
  createdBy: string
}

export interface EventItem {
  id: string
  title: string
  date: string
  time: string
  description: string
  joinLink: string
}

// Refined backend entities:
export interface Enrollment {
  id: string
  userId: string
  courseId: string
  programId: string
  academy: string
  cohort: string
  enrolledAt: string
  status: 'Active' | 'Completed' | 'Dropped'
}

export interface LessonProgress {
  id: string
  userId: string
  lessonId: string
  courseId: string
  status: 'Not Started' | 'In Progress' | 'Completed'
  lastViewedAt: string
}

export interface MentorCourseAssignment {
  id: string
  mentorId: string
  courseId: string
  assignedAt: string
  status: 'Active' | 'Inactive'
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'Announcement' | 'Grade' | 'Assignment' | 'General'
  read: boolean
  createdAt: string
}
