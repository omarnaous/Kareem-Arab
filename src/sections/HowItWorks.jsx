import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { pillars, planIncludes, trackerIncludes } from '../content/site'
import { Eyebrow, Reveal, SplitReveal } from '../components/Reveal'
import Spotlight from '../components/Spotlight'

const ease = [0.22, 1, 0.36, 1]

export default function HowItWorks() {
  return (
    <section id="how" className="section how" aria-labelledby="how-title">
      <div className="container how__grid">
        <div className="how__aside">
          <div className="how__sticky">
            <Eyebrow>How it works</Eyebrow>
            <SplitReveal id="how-title" text={['Clear structure.', 'Real involvement.']} className="h2" />
            <Reveal as="p" className="lede" delay={0.2}>
              The structure to progress, with someone involved in how you apply it.
            </Reveal>
            <Reveal delay={0.3} className="how__chips-wrap">
              <p className="mini-label">Every plan specifies</p>
              <motion.ul
                className="chips"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } } }}
              >
                {planIncludes.map((p) => (
                  <motion.li
                    key={p}
                    className="chip"
                    variants={{ hidden: { opacity: 0, scale: 0.6, y: 10 }, show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } } }}
                  >
                    {p}
                  </motion.li>
                ))}
              </motion.ul>
            </Reveal>
          </div>
        </div>

        <ol className="pillars">
          {pillars.map((p, i) => (
            <Pillar key={p.n} p={p} i={i} />
          ))}
          <li>
            <Tracker />
          </li>
        </ol>
      </div>
    </section>
  )
}

function Pillar({ p, i }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const numY = useTransform(scrollYProgress, [0, 1], [60, 0])
  return (
    <motion.li
      ref={ref}
      className="pillar"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease, delay: (i % 2) * 0.05 }}
    >
      <Spotlight className="pillar__card">
        <motion.span className="pillar__n" style={{ y: numY }} aria-hidden="true">
          {p.n}
        </motion.span>
        <div>
          <h3 className="h3">{p.title}</h3>
          <p className="muted">{p.body}</p>
        </div>
      </Spotlight>
    </motion.li>
  )
}

/** Eight sheets fan out as the tracker scrolls into view. */
function Tracker() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  return (
    <div ref={ref} className="tracker card">
      <div className="tracker__stack" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <Sheet key={i} i={i} progress={scrollYProgress} />
        ))}
      </div>
      <div className="tracker__copy">
        <p className="mini-label">Included with mentorship</p>
        <h3 className="h3">The eight-page tracker</h3>
        <p className="muted">Everything you need to see your progress, in one workbook:</p>
        <ul className="ticks ticks--2">
          {trackerIncludes.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Sheet({ i, progress }) {
  const rotate = useTransform(progress, [0, 1], [0, (i - 3.5) * 6])
  const x = useTransform(progress, [0, 1], [0, (i - 3.5) * 16])
  const y = useTransform(progress, [0, 1], [0, Math.abs(i - 3.5) * 5])
  return (
    <motion.div className="sheet" style={{ rotate, x, y, zIndex: i }}>
      <span className="sheet__n">{String(i + 1).padStart(2, '0')}</span>
      <span className="sheet__lines" />
    </motion.div>
  )
}
