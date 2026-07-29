export type UserRole = 'scholar' | 'graduate' | 'mentor' | 'admin'

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

export interface Announcement {
  id: string
  title: string
  category: 'Foundation' | 'Program' | 'Course'
  date: string
  description: string
  program?: 'All' | 'Songa Girls Initiative' | 'Songa Leadership Academy'
}

export interface EventItem {
  id: string
  title: string
  date: string
  time: string
  description: string
  joinLink: string
}
