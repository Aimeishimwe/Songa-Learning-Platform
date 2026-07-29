import { PageShell } from '../components/PageShell'
import { events } from '../data/events'
import { Card, Button } from '../components/ui'
import { usePageView } from '../hooks/usePageView'

export function EventsPage() {
  usePageView('Events')

  return (
    <PageShell title="Events" subtitle="Join upcoming learning and community events.">
      <div className="card-stack">
        {events.map((event) => (
          <Card key={event.id} className="fade-up">
            <div className="card-heading-row">
              <div>
                <p className="eyebrow">{event.date}</p>
                <h3>{event.title}</h3>
              </div>
              <span className="badge">{event.time}</span>
            </div>
            <p>{event.description}</p>
            <Button variant="secondary" type="button">Join event</Button>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}
