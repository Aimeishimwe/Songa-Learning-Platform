import { Card } from './ui/Card'

export default function Recommendations() {
  const items = [
    { id: 'r1', title: 'Backend Web Development', reason: 'Future opportunity for your next step' },
    { id: 'r2', title: 'Her Influence Academy', reason: 'A future learning community experience' },
  ]

  return (
    <section style={{ marginTop: 20 }}>
      <h3 className="eyebrow">Discover more</h3>
      <div className="grid-2">
        {items.map((it) => (
          <Card key={it.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div>
                <strong>{it.title}</strong>
                <p style={{ margin: '6px 0 0' }} className="muted-text">{it.reason}</p>
              </div>
              <span className="badge">Coming Soon</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
