import { ArrowUpRight, CheckCircle2, Compass, Sparkles } from 'lucide-react'
import { PageShell } from '../components/PageShell'
import { Button, Card } from '../components/ui'

export function GraduateDashboardPage() {
  return <PageShell title="Your story keeps growing" subtitle="Your Songa journey is a foundation—not a finish line.">
    <section className="graduate-hero"><div><p className="eyebrow">Songa Alumni</p><h2>You have already built something remarkable.</h2><p>Stay close to a community that is still rooting for your next chapter.</p></div><Sparkles size={44} /></section>
    <div className="grid-2"><Card className="achievement-card"><p className="eyebrow">Completed learning journeys</p><h3>Milestones you should be proud of</h3><div className="achievement-list"><span><CheckCircle2 /> Tech Sisters</span><span><CheckCircle2 /> Front-End Development</span></div></Card><Card className="opportunity-card"><p className="eyebrow">Keep moving forward</p><h3>Opportunities ahead</h3><div className="opportunity-item"><Compass size={20} /><span><strong>Backend Development</strong><small>Coming soon</small></span><ArrowUpRight size={18} /></div><div className="opportunity-item"><Compass size={20} /><span><strong>Leadership Program</strong><small>Applications opening soon</small></span><ArrowUpRight size={18} /></div><Button variant="secondary">Explore opportunities</Button></Card></div>
  </PageShell>
}
