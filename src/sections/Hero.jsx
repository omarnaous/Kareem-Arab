import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { hero, links } from '../content/site'
import { photos } from '../assets/story'
import { INTRO_DELAY } from '../lib/intro'
import { useApply } from '../lib/applyContext'
import { track } from '../lib/contact'
import BeforeAfter from '../components/BeforeAfter'
import Magnetic from '../components/Magnetic'

const ease = [0.22, 1, 0.36, 1]
const d = INTRO_DELAY

const line = (i) => ({
  initial: { y: '110%' },
  animate: { y: '0%' },
  transition: { duration: 1.1, ease, delay: d + 0.1 + i * 0.12 },
})
const fade = (i, y = 20) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease, delay: d + 0.5 + i * 0.1 },
})

export default function Hero() {
  const ref = useRef(null)
  const { startApplication, goTo } = useApply()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // pointer-follow gold glow
  const mx = useMotionValue(70)
  const my = useMotionValue(40)
  const smx = useSpring(mx, { stiffness: 60, damping: 20 })
  const smy = useSpring(my, { stiffness: 60, damping: 20 })
  const glow = useMotionTemplate`radial-gradient(600px circle at ${smx}% ${smy}%, rgba(160,127,58,0.18), transparent 60%)`

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 100)
    my.set(((e.clientY - r.top) / r.height) * 100)
  }

  return (
    <section ref={ref} className="hero" onPointerMove={onMove} aria-labelledby="hero-title">
      <motion.div className="hero__glow" style={{ background: glow }} aria-hidden="true" />
      <motion.div className="hero__bgtype" style={{ y: bgY }} aria-hidden="true">
        <motion.span initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.6, ease, delay: d }}>
          {hero.startKg}
        </motion.span>
        <motion.span initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.6, ease, delay: d + 0.15 }}>
          {hero.endKg}
        </motion.span>
      </motion.div>

      <div className="hero__inner container">
        <motion.div className="hero__top" style={{ y: textY, opacity: fadeOut }}>
          <motion.p className="eyebrow" {...fade(0, 10)}>
            <span className="eyebrow__line" aria-hidden="true" />
            {hero.eyebrow}
          </motion.p>

          <h1 id="hero-title" className="hero__title">
            <span className="split-mask">
              <motion.span className="split-word" {...line(0)}>
                From {hero.startKg}kg
              </motion.span>
            </span>
            <span className="split-mask">
              <motion.span className="split-word" {...line(1)}>
                to <em className="gold">{hero.endKg}kg.</em>
              </motion.span>
            </span>
            <span className="split-mask hero__title-sub">
              <motion.span className="split-word" {...line(2)}>
                Now it’s your turn.
              </motion.span>
            </span>
          </h1>
        </motion.div>

        <motion.div
          className="hero__media"
          style={{ y: mediaY }}
          initial={{ opacity: 0, y: 60, rotate: 4, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 80, damping: 16, delay: d + 0.35 }}
        >
          <BeforeAfter
            priority
            before={photos.beforeTorso}
            after={photos.afterTorso}
            beforeAlt="Karim before his transformation, at 93kg"
            afterAlt="Karim after two years of training, at 72kg"
            beforeLabel={`Before · ${hero.startKg}kg`}
            afterLabel={`After · ${hero.endKg}kg`}
            className="hero__ba"
          />
          <p className="hero__media-cap">
            <span aria-hidden="true">←</span> Drag to compare <span aria-hidden="true">→</span>
          </p>
        </motion.div>

        <motion.div className="hero__bottom" style={{ y: textY, opacity: fadeOut }}>
          <motion.p className="hero__lede" {...fade(1)}>
            {hero.line}
          </motion.p>

          <motion.div className="hero__ctas" {...fade(2)}>
            <Magnetic>
              <button className="btn btn--gold btn--lg" onClick={() => startApplication()}>
                Apply for mentorship
                <Arrow />
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                className="btn btn--ghost btn--lg"
                href={links.overviewPdf}
                target="_blank"
                rel="noopener"
                onClick={() => track('pdf_click', { from: 'hero' })}
              >
                Get the overview
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl className="hero__facts" {...fade(3)}>
            <div>
              <dt>Timeline</dt>
              <dd>{hero.duration}</dd>
            </div>
            <div>
              <dt>Change</dt>
              <dd>−{hero.startKg - hero.endKg}kg</dd>
            </div>
            <div>
              <dt>Mentor</dt>
              <dd className="hero__sig">Karim Al Arab</dd>
            </div>
          </motion.dl>
        </motion.div>
      </div>

      <motion.button
        className="hero__scroll"
        onClick={() => goTo('story')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 1.2, duration: 1 }}
      >
        <span>My story</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </motion.button>
    </section>
  )
}

export function Arrow() {
  return (
    <svg className="btn__arrow" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
