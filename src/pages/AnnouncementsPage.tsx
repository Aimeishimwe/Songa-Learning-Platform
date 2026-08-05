import { BellRing, CalendarDays, Pin } from 'lucide-react'
import { PageShell } from '../components/PageShell'
import { usePageView } from '../hooks/usePageView'
import { useAuth } from '../context/AuthContext'
import { getPlatformData } from '../services/platformService'

export function AnnouncementsPage() {
  usePageView('Announcements')
  const { user } = useAuth()
  const currentProgram = user?.enrollment?.program ?? user?.program ?? 'All'
  const { announcements } = getPlatformData()
  const items = announcements.filter((item) => item.category !== 'Foundation' && (item.program === 'All' || item.program === currentProgram))

  return (
    <PageShell title="Announcements" subtitle="The updates, opportunities, and moments that matter to your journey.">
      <section className="announcements-intro">
        <BellRing size={27} />
        <div>
          <p className="eyebrow">Stay in the loop</p>
          <h2>Your learning community is moving forward.</h2>
        </div>
      </section>
      <div className="announcement-feed">
        {items.map((item, index) => (
          <article key={item.id} className={`premium-announcement ${index === 0 ? 'featured' : ''}`}>
            <div className="announcement-marker">{index === 0 ? <Pin size={18} /> : <BellRing size={18} />}</div>
            <div className="announcement-content">
              <div className="announcement-meta">
                <span>{item.category}</span>
                <time><CalendarDays size={14} /> {item.date}</time>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  )
}
