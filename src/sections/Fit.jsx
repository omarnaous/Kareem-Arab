import { focus, fit } from '../content/site'
import { Eyebrow, Reveal, SplitReveal } from '../components/Reveal'
import Marquee from '../components/Marquee'
import Spotlight from '../components/Spotlight'
import { useApply } from '../lib/applyContext'

export default function Fit() {
  const { startApplication } = useApply()
  return (
    <section id="fit" className="section fit" aria-labelledby="fit-title">
      <Marquee items={focus} />
      <div className="container">
        <div className="section__head">
          <Eyebrow>Who it’s for</Eyebrow>
          <SplitReveal id="fit-title" text={['A stronger body.', 'A stronger routine.']} className="h2" />
          <Reveal as="p" className="lede" delay={0.2}>
            Build muscle, improve body composition and grow stronger with a plan shaped around your goals, schedule and
            starting point.
          </Reveal>
        </div>

        <div className="fit__grid">
          {fit.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.12}>
              <Spotlight className="card fit__card">
                <p className="fit__label">{f.label}</p>
                <h3 className="h3">{f.title}</h3>
                <p className="muted">{f.body}</p>
                <ul className="ticks">
                  {f.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <button className="link-btn" onClick={() => startApplication(f.id)}>
                  Apply for {f.id === 'performance' ? 'Performance' : 'Foundation'} →
                </button>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
