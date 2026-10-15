import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { steps } from '../content/site'
import { Eyebrow, Reveal, SplitReveal } from '../components/Reveal'

export default function Steps() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="start" className="section steps" aria-labelledby="steps-title">
      <div className="container">
        <div className="section__head section__head--center">
          <Eyebrow>How we start</Eyebrow>
          <SplitReveal id="steps-title" text="Three steps in." className="h2" />
        </div>
        <div ref={ref} className="steps__wrap">
          <div className="steps__rail" aria-hidden="true">
            <motion.div className="steps__rail-fill" style={{ scaleY: scale }} />
          </div>
          <ol className="steps__list">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} className="step" delay={i * 0.08}>
              <span className="step__n">{s.n}</span>
              <div>
                <h3 className="h3">{s.title}</h3>
                <p className="muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
          </ol>
        </div>
        <Reveal as="p" className="steps__quote">
          <strong>I bring the structure. You bring the work.</strong> Follow the plan, log your sessions and communicate
          honestly. Stay consistent through busy days; report pain or unusual fatigue.
        </Reveal>
      </div>
    </section>
  )
}
