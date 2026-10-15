import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import { hero, story } from '../content/site'
import { photos } from '../assets/story'
import { useMedia } from '../lib/useMedia'

const ease = [0.22, 1, 0.36, 1]

export default function Story() {
  const desktop = useMedia('(min-width: 960px)')
  return desktop ? <PinnedStory /> : <TimelineStory />
}

/** Scroll-driven weight readout, 93 → 72 across the section. */
function useKg(progress, range = [0.05, 0.75]) {
  const smooth = useSpring(progress, { stiffness: 120, damping: 30 })
  const kg = useTransform(smooth, range, [hero.startKg, hero.endKg], { clamp: true })
  return { smooth, kgText: useTransform(kg, (v) => Math.round(v)) }
}

function Photo({ ch, className = '', eager = false }) {
  return (
    <figure className={`photo photo--${ch.tone} ${className}`}>
      <img src={photos[ch.image]} alt={ch.alt} loading={eager ? 'eager' : 'lazy'} draggable="false" />
      <figcaption className="photo__tag">{ch.tag}</figcaption>
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop: pinned stage with a deck of photo cards                    */
/* ------------------------------------------------------------------ */

function PinnedStory() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const { smooth, kgText } = useKg(scrollYProgress)
  const bar = useTransform(smooth, [0, 1], ['0%', '100%'])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.min(story.length - 1, Math.floor(p * story.length * 0.999))
    setActive((a) => (a === i ? a : i))
  })

  const ch = story[active]

  return (
    <section id="story" ref={ref} className="story" style={{ height: `${story.length * 80 + 60}vh` }} aria-label="Karim’s story">
      <div className="story__stage">
        <div className="story__inner container">
          <div className="story__left">
            <div className="deck">
              {story.map((s, j) => {
                const d = j - active
                const pose =
                  d === 0
                    ? { x: 0, y: 0, rotate: -2, scale: 1, opacity: 1 }
                    : d > 0
                      ? { x: d * 26, y: d * -18, rotate: d * 5, scale: 1 - d * 0.06, opacity: Math.max(0, 1 - d * 0.3) }
                      : { x: -160, y: 60, rotate: -16, scale: 0.86, opacity: 0 }
                return (
                  <motion.div
                    key={s.id}
                    className="deck__card"
                    style={{ zIndex: 10 - Math.abs(d) }}
                    initial={false}
                    animate={pose}
                    transition={{ type: 'spring', stiffness: 170, damping: 24 }}
                  >
                    <Photo ch={s} />
                  </motion.div>
                )
              })}
            </div>
            <div className="scale" aria-hidden="true">
              <span className="scale__label">Bodyweight</span>
              <span className="scale__value">
                <motion.span>{kgText}</motion.span>
                <small>kg</small>
              </span>
            </div>
          </div>

          <div className="story__text">
            <p className="eyebrow">
              <span className="eyebrow__line" aria-hidden="true" />
              My story
            </p>
            <div className="story__chapter" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div key={ch.id} initial="hidden" animate="show" exit="exit" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
                  <motion.p className="story__kicker" variants={v}>
                    <span className="gold">0{active + 1}</span> — {ch.kicker}
                  </motion.p>
                  <motion.h2 className="story__title" variants={v}>
                    {ch.title}
                  </motion.h2>
                  <motion.p className="story__body" variants={v}>
                    {ch.body}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="story__progress" aria-hidden="true">
              <div className="story__track">
                <motion.div className="story__fill" style={{ width: bar }} />
              </div>
              <ol className="story__steps">
                {story.map((s, i) => (
                  <li key={s.id} className={i <= active ? 'is-on' : ''}>
                    {s.kicker}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only">
        {story.map((s) => (
          <p key={s.id}>
            {s.kicker}: {s.title} {s.body}
          </p>
        ))}
      </div>
    </section>
  )
}

const v = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
  exit: { opacity: 0, y: -30, filter: 'blur(6px)', transition: { duration: 0.35, ease } },
}

/* ------------------------------------------------------------------ */
/* Mobile: natural-scroll timeline, sticky weight pill                 */
/* ------------------------------------------------------------------ */

function TimelineStory() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 70%'] })
  const { smooth, kgText } = useKg(scrollYProgress, [0.1, 0.7])
  const rail = useTransform(smooth, [0, 1], [0, 1])

  return (
    <section id="story" ref={ref} className="tl section" aria-labelledby="tl-title">
      <div className="container">
        <p className="eyebrow">
          <span className="eyebrow__line" aria-hidden="true" />
          My story
        </p>
        <h2 id="tl-title" className="h2 tl__title">
          Two years. <span className="gold">−{hero.startKg - hero.endKg}kg.</span>
        </h2>

        <div className="tl__pill" aria-hidden="true">
          <span>Bodyweight</span>
          <strong>
            <motion.span>{kgText}</motion.span>kg
          </strong>
        </div>

        <div className="tl__list">
          <div className="tl__rail" aria-hidden="true">
            <motion.div className="tl__rail-fill" style={{ scaleY: rail }} />
          </div>
          {story.map((ch, i) => (
            <Chapter key={ch.id} ch={ch} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Chapter({ ch, i }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const flip = i % 2 === 1

  return (
    <article ref={ref} className={`tl__item ${flip ? 'is-flip' : ''}`}>
      <span className="tl__dot" aria-hidden="true" />
      <motion.div
        className="tl__media"
        style={{ y }}
        initial={{ opacity: 0, scale: 0.85, rotate: flip ? 8 : -8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: flip ? 3 : -3 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      >
        <Photo ch={ch} />
      </motion.div>
      <motion.div
        className="tl__copy"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
      >
        <p className="story__kicker">
          <span className="gold">0{i + 1}</span> — {ch.kicker}
        </p>
        <h3 className="story__title">{ch.title}</h3>
        <p className="story__body">{ch.body}</p>
      </motion.div>
    </article>
  )
}
