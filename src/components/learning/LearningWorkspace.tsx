import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, Button } from '../ui'
import type { Course, Assignment, Assessment } from '../../types'
import { loadCourseProgress, saveCourseProgress } from './learningStorage'
import { getPlatformData } from '../../services/platformService'

type LearningItemType = 'lesson' | 'video' | 'quiz' | 'assignment'

type LearningItem = {
  id: string
  type: LearningItemType
  title: string
  content: string
  description?: string
  duration?: string
  objectives?: string[]
  quiz?: Assessment
  assignment?: Assignment
}

type LearningWorkspaceProps = {
  course: Course
}

function buildLearningItems(courseId: string) {
  const { modules, lessons, assignments, assessments } = getPlatformData()
  const courseModules = modules.filter((module) => module.courseId === courseId)
  const items: LearningItem[] = []

  courseModules.forEach((module) => {
    items.push({
      id: `${module.id}-overview`,
      type: 'lesson',
      title: `Module ${module.number}: ${module.title}`,
      content: module.resources.length ? `Resources: ${module.resources.join(', ')}` : 'This module is ready for learning content.',
      description: 'Module overview',
      duration: 'Start here',
    })
    const moduleLessons = lessons.filter((lesson) => lesson.moduleId === module.id)
    moduleLessons.forEach((lesson) => {
      items.push({
        id: lesson.id,
        type: lesson.type === 'Video' ? 'video' : lesson.type === 'Quiz' ? 'quiz' : lesson.type === 'Assignment' ? 'assignment' : 'lesson',
        title: lesson.title,
        content: lesson.content,
        duration: '8 min',
        objectives: ['Understand the concept', 'Apply the idea in practice'],
        description: lesson.videoUrl ? `Video: ${lesson.videoUrl}` : lesson.attachmentName ? `Material: ${lesson.attachmentName}` : undefined,
      })
    })

    if (module.assignmentId) {
      const assignment = assignments.find((item) => item.id === module.assignmentId)
      if (assignment) {
        items.push({
          id: assignment.id,
          type: 'assignment',
          title: assignment.title,
          content: assignment.instructions,
          description: 'Submit your work within the course workspace.',
          duration: '30 min',
        })
      }
    }

    const quiz = assessments.find((item) => item.id === module.quizId)
    if (quiz) {
      items.push({
        id: quiz.id,
        type: 'quiz',
        title: quiz.title,
        content: 'Answer the questions below to check your understanding.',
        description: 'Short quiz to reinforce learning.',
        duration: '10 min',
        quiz,
      })
    }
  })

  return items
}

export function LearningWorkspace({ course }: LearningWorkspaceProps) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [completedItems, setCompletedItems] = useState<string[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const learningItems = useMemo(() => buildLearningItems(course.id), [course.id])

  useEffect(() => {
    const saved = loadCourseProgress(course.id)
    setActiveItemId(saved.activeItemId)
    setCompletedItems(saved.completedItems)
  }, [course.id])

  useEffect(() => {
    saveCourseProgress(course.id, { activeItemId, completedItems })
  }, [activeItemId, completedItems, course.id])

  const activeItem = learningItems.find((item) => item.id === activeItemId) ?? learningItems[0]
  const progress = Math.round((completedItems.length / Math.max(learningItems.length, 1)) * 100)

  const toggleComplete = (itemId: string) => {
    setCompletedItems((current) => (current.includes(itemId) ? current.filter((entry) => entry !== itemId) : [...current, itemId]))
  }

  const goToNext = () => {
    if (!activeItem) return
    const currentIndex = learningItems.findIndex((item) => item.id === activeItem.id)
    const nextItem = learningItems[currentIndex + 1]
    if (nextItem) {
      setActiveItemId(nextItem.id)
    }
  }

  const isCompleted = (itemId: string) => completedItems.includes(itemId)

  return (
    <div className="workspace-shell">
      <aside className={`workspace-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="workspace-sidebar-header">
          <div>
            <p className="eyebrow">Curriculum</p>
            <h3>{course.name}</h3>
          </div>
          <div className="workspace-toggle-group">
            <button className="workspace-toggle" onClick={() => setSidebarOpen(false)} aria-label="Close curriculum">
              <ArrowLeft size={18} />
            </button>
          </div>
        </div>

        <div className="workspace-progress-card">
          <p className="eyebrow">Course progress</p>
          <div className="progress-row">
            <strong>{progress}%</strong>
            <span>{completedItems.length} of {learningItems.length} sections complete</span>
          </div>
          <div className="meter">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="curriculum-list">
          {learningItems.map((item) => (
            <button
              key={item.id}
              className={`curriculum-item ${activeItem?.id === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveItemId(item.id)
                setSidebarOpen(false)
              }}
            >
              <span>{isCompleted(item.id) ? <CheckCircle2 size={16} color="#10b981" /> : <Circle size={16} color="#94a3b8" />}</span>
              <span>{item.title}</span>
              <span>{item.type === 'quiz' ? '❓' : item.type === 'assignment' ? '📝' : '▶'}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="workspace-main">
        <div className="workspace-topbar">
          <div>
            <p className="eyebrow">Learning workspace</p>
            <h3>{course.name}</h3>
          </div>
          <div className="workspace-toggle-group">
            <Link to="/home" className="workspace-exit">Exit learning</Link>
          </div>
        </div>

        <div className="workspace-content">
          <Card className="hero-card">
            <div className="card-heading-row">
              <div>
                <p className="eyebrow">Current item</p>
                <h3>{activeItem?.title}</h3>
              </div>
              <span className="badge">{activeItem?.type}</span>
            </div>
            <p>{activeItem?.description ?? activeItem?.content}</p>
            {activeItem?.objectives?.length ? (
              <ul className="list-stack" style={{ marginTop: 12 }}>
                {activeItem.objectives.map((objective) => <li key={objective}>{objective}</li>)}
              </ul>
            ) : null}
            <div className="workspace-actions">
              <Button className="learning-complete-button" onClick={() => toggleComplete(activeItem?.id ?? '')}>{isCompleted(activeItem?.id ?? '') ? 'Completed' : 'Mark complete'}</Button>
              <Button variant="primary" onClick={goToNext}>Next item</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
