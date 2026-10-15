import { clientResults, hero, whoop } from '../content/site'
import { photos } from '../assets/story'
import { Eyebrow, Reveal, SplitReveal } from '../components/Reveal'
import BeforeAfter from '../components/BeforeAfter'
import Counter from '../components/Counter'
import Spotlight from '../components/Spotlight'
import OwnerTodo from '../components/OwnerTodo'

export default function Results() {
  const clients = clientResults.filter((c) => c.show)
  return (
    <section id="results" className="section results" aria-labelledby="results-title">
      <div className="container">
        <div className="section__head section__head--center">
          <Eyebrow>Results</Eyebrow>
          <SplitReveal id="results-title" text={['The proof is', 'in the work.']} className="h2" />
          <Reveal as="p" className="lede" delay={0.2}>
            My approach draws on my own training, transformation and ongoing study. These are my own recorded results.
          </Reveal>
        </div>

        <div className="results__grid">
          <Reveal className="results__ba">
            <BeforeAfter
              before={photos.beforeFace}
              after={photos.afterFace}
              beforeAlt="Karim's face before his transformation"
              afterAlt="Karim's face after his two-year transformation"
              beforeLabel={`${hero.startKg}kg`}
              afterLabel={`${hero.endKg}kg`}
            />
          </Reveal>

          <div className="results__stats">
            <Reveal as="div" delay={0.1}>
              <Spotlight className="stat card">
                <p className="mini-label">Bodyweight change</p>
                <p className="stat__value">
                  <Counter from={0} to={hero.startKg - hero.endKg} prefix="−" suffix="kg" />
                </p>
                <p className="muted">
                  {hero.startKg}kg → {hero.endKg}kg over {hero.duration.toLowerCase()}
                </p>
              </Spotlight>
            </Reveal>

            {whoop.show &&
              whoop.stats.map((s, i) => (
                <Reveal as="div" delay={0.2 + i * 0.1} key={s.label}>
                  <Spotlight className="stat card">
                    <p className="mini-label">Personal WHOOP milestone</p>
                    <p className="stat__value">
                      <Counter from={s.prefix === '#' ? 999 : 80} to={s.value} prefix={s.prefix} suffix={s.suffix} duration={2.2} />
                    </p>
                    <p className="muted">
                      {s.label} · {s.detail}
                    </p>
                  </Spotlight>
                </Reveal>
              ))}
            {whoop.show && (
              <p className="fineprint">
                {whoop.note} {whoop.asOf ? `Recorded ${whoop.asOf}.` : <OwnerTodo>date of WHOOP screenshots</OwnerTodo>}
              </p>
            )}
          </div>
        </div>

        {clients.length > 0 && (
          <div className="clients">
            {clients.map((c) => (
              <Reveal key={c.id} className="card client">
                {c.image && <img src={c.image} alt={`${c.name} result`} loading="lazy" />}
                <blockquote>“{c.quote}”</blockquote>
                <p className="mini-label">{c.name}</p>
                {c.context && <p className="fineprint">{c.context}</p>}
              </Reveal>
            ))}
          </div>
        )}
        {clients.length === 0 && (
          <p className="center">
            <OwnerTodo>approved client results (Hashem Zeidan etc.) — hidden until supplied with permission</OwnerTodo>
          </p>
        )}
      </div>
    </section>
  )
}
