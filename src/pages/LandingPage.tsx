import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const programs = [
  {
    name: 'Songa Girls Initiative',
    description: 'A learning space for girls and young women to build technology skills, confidence, and leadership practice.',
    academies: 'Tech Sisters · Her Influence Academy',
  },
  {
    name: 'Songa Leadership Academy',
    description: 'Practical learning for young people developing leadership, career readiness, and the skills to move forward.',
    academies: 'Leadership Development Academy · Career & Opportunity Academy',
  },
]

export function LandingPage() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <Link to="/" className="landing-brand" aria-label="Songa Academy home">
          <span className="landing-brand-mark">S</span>
          <span>Songa Academy</span>
        </Link>
        <Link className="landing-sign-in" to="/login">Sign in</Link>
      </header>

      <section className="landing-hero">
        <div className="landing-copy">
          <p className="landing-eyebrow">Songa Academy</p>
          <h1>Learning that moves with you.</h1>
          <p>Explore focused learning spaces designed for young people who are ready to grow their skills and lead with confidence.</p>
          <Link className="landing-cta" to="/login">Continue to learning platform <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <img
          className="landing-hero-image"
          src="https://design.wikimedia.org/strategy/projects/emerging-education/hero.opt.webp"
          alt="Young people learning together with a laptop"
        />
      </section>

      <section className="landing-programs" aria-labelledby="programs-heading">
        <div className="landing-section-heading">
          <p className="landing-eyebrow">Choose your learning space</p>
          <h2 id="programs-heading">Our programs</h2>
        </div>
        <div className="landing-program-grid">
          {programs.map((program) => <article className="landing-program-card" key={program.name}>
            <h3>{program.name}</h3>
            <p>{program.description}</p>
            <span>{program.academies}</span>
          </article>)}
        </div>
      </section>
    </main>
  )
}
