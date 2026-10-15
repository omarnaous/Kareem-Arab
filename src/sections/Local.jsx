import { local } from '../content/site'
import { Eyebrow, Reveal, SplitReveal } from '../components/Reveal'
import Spotlight from '../components/Spotlight'
import OwnerTodo from '../components/OwnerTodo'
import { track, waLink } from '../lib/contact'

export default function Local() {
  return (
    <section id="local" className="section local" aria-labelledby="local-title">
      <div className="container">
        <div className="local__head">
          <div>
            <Eyebrow>In person, when it fits</Eyebrow>
            <SplitReveal id="local-title" text="Train together." className="h2" />
          </div>
          <Reveal as="p" className="lede" delay={0.15}>
            Optional local sessions alongside your mentorship. Dietitian consultations, meals, supplements and gym entry are
            billed separately and agreed first.
          </Reveal>
        </div>
        <div className="local__grid">
          {local.map((l, i) => {
            const href = waLink(l.message)
            return (
              <Reveal key={l.title} delay={i * 0.12}>
                <Spotlight className="card local__card">
                  <div className="local__price">
                    <span>{l.price}</span>
                    <small>{l.unit}</small>
                  </div>
                  <h3 className="h3">{l.title}</h3>
                  <p className="muted">{l.body}</p>
                  {href ? (
                    <a
                      className="link-btn"
                      href={href}
                      target="_blank"
                      rel="noopener"
                      onClick={() => track('whatsapp_click', { from: 'local' })}
                    >
                      {l.cta} on WhatsApp →
                    </a>
                  ) : (
                    <OwnerTodo>WhatsApp number for “{l.cta}”</OwnerTodo>
                  )}
                </Spotlight>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
