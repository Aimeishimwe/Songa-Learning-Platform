import { PageShell } from '../components/PageShell'
import { getAnnouncementsForProgram } from '../data/announcements'
import { Card } from '../components/ui'
import { usePageView } from '../hooks/usePageView'
import { useAuth } from '../context/AuthContext'

export function AnnouncementsPage() {
  usePageView('Announcements')
  const { user } = useAuth()
  const currentProgram = user?.enrollment?.program ?? user?.program ?? 'All'
  const learningAnnouncements = getAnnouncementsForProgram(currentProgram).filter((item) => item.category !== 'Foundation')

  return (
    <PageShell title="Announcements" subtitle="Latest learning updates from your current journey.">
      <div className="card-stack">
        {learningAnnouncements.map((item) => (
          <Card key={item.id} className="fade-up">
            <div className="card-heading-row">
              <div>
                <p className="eyebrow">{item.category}</p>
                <h3>{item.title}</h3>
              </div>
              <span className="badge">{item.date}</span>
            </div>
            <p>{item.description}</p>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}
