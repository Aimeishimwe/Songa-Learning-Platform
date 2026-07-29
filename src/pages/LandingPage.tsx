import { ArrowRight, BookOpen, Compass, Sparkles, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import confidenceImage from '../assets/Confidence.png'
import girlsImage from '../assets/Girls.png'
import leadershipImage from '../assets/Leadership.png'
import logo from '../assets/S_logo.png'

const programs = [
  {
    name: 'Songa Girls Initiative',
    description:
      'A learning space empowering girls and young women with technology skills, confidence, and leadership opportunities.',
    academies:
      'Tech Sisters · Her Influence Academy',
    tone: 'girls',
    icon: Sparkles,
  },
  {
    name: 'Songa Leadership Academy',
    description:
      'A learning journey helping young Africans develop leadership, career readiness, and the skills to create meaningful impact.',
    academies:
      'Leadership Development Academy · Career & Opportunity Academy',
    tone: 'leadership',
    icon: UsersRound,
  },
]

export function LandingPage() {
  return (
    <main className="landing-page">

      <header className="landing-header">
        <Link
          to="/"
          className="landing-brand"
          aria-label="Songa Academy home"
        >
          <span className="landing-brand-mark">
            <img src={logo} alt="Songa Academy logo" />
          </span>
          <span>Songa Academy</span>
        </Link>

        <Link className="landing-sign-in" to="/login">
          Sign in
        </Link>
      </header>


      <section className="landing-hero">

        <div className="landing-copy">

          <p className="landing-eyebrow">
            A digital home for young Africans to learn, grow, and create impact.
          </p>

          <h1>
            Learn. Build.
            <br />
            <em>Lead.</em>
          </h1>


          <p>
            A learning platform designed to equip young Africans with
            practical skills, leadership confidence, and opportunities to
            create meaningful impact.
          </p>


          <div className="landing-actions">

            <Link
              className="landing-cta"
              to="/login"
            >
              Sign in to Songa
              <ArrowRight size={18} />
            </Link>


            <a
              className="landing-text-cta"
              href="#programs"
            >
              Explore programs
              <Compass size={17} />
            </a>

          </div>


          <div className="landing-proof">

            <span>
              <UsersRound size={17} />
              Learn together
            </span>


            <span>
              <BookOpen size={17} />
              Build real skills
            </span>

          </div>

        </div>


        <div className="landing-visual landing-montage">

       <figure className="montage-frame montage-one">
    <img
      src={confidenceImage}
      alt="Young African building confidence through learning"
    />
  </figure>

  <figure className="montage-frame montage-two">
    <img
      src={girlsImage}
      alt="Girls learning technology at Songa"
    />
  </figure>

  <figure className="montage-frame montage-three">
    <img
      src={leadershipImage}
      alt="Young leaders collaborating"
    />
  </figure>


          <div className="hero-float hero-float-top">

            <Sparkles size={17} />

            Skills for the future

          </div>


          <div className="hero-float hero-float-bottom">

            <strong>
              12+
            </strong>

            <span>
              learning paths
              <br />
              to explore
            </span>

          </div>


        </div>

      </section>



      <section
        className="landing-programs"
        id="programs"
        aria-labelledby="programs-heading"
      >

        <div className="landing-section-heading">

          <p className="landing-eyebrow">
            Choose your learning journey
          </p>


          <h2 id="programs-heading">
            Discover where you can grow.
          </h2>

        </div>



        <div className="landing-program-grid">

          {programs.map((program) => {

            const Icon = program.icon

            return (

              <article
                className={`landing-program-card ${program.tone}`}
                key={program.name}
              >

                <div className="program-icon">
                  <Icon size={22} />
                </div>


                <h3>
                  {program.name}
                </h3>


                <p>
                  {program.description}
                </p>


                <span>
                  {program.academies}
                </span>


                <ArrowRight
                  className="program-arrow"
                  size={20}
                />

              </article>

            )

          })}

        </div>

      </section>



      <section className="landing-belief">

        <p className="landing-eyebrow">
          More than a course
        </p>


        <h2>
          A place to discover what you can become.
        </h2>


        <p>
          Every milestone is a step toward the skills, confidence,
          opportunities, and impact you want to create.
        </p>


      </section>


    </main>
  )
}