import { useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react'
import { hero } from '../content/site'
import { INTRO_KEY as KEY } from '../lib/intro'

/** Short intro: weight counts down 93 → 72, then the curtain lifts. Once per session. */
export default function Preloader() {
  const [show, setShow] = useState(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
      return !sessionStorage.getItem(KEY)
    } catch {
      return false
    }
  })
  const kg = useMotionValue(hero.startKg)
  const rounded = useTransform(kg, (v) => Math.round(v))

  useEffect(() => {
    if (!show) return
    document.documentElement.classList.add('is-loading')
    const controls = animate(kg, hero.endKg, { duration: 1.3, delay: 0.35, ease: [0.65, 0, 0.35, 1] })
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* storage unavailable */
      }
      setShow(false)
    }, 2100)
    return () => {
      controls.stop()
      clearTimeout(t)
      document.documentElement.classList.remove('is-loading')
    }
  }, [show, kg])

  return (
    <AnimatePresence onExitComplete={() => document.documentElement.classList.remove('is-loading')}>
      {show && (
        <motion.div
          className="preloader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="preloader__kg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span>{rounded}</motion.span>
            <small>kg</small>
          </motion.div>
          <motion.div
            className="preloader__bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.p
            className="preloader__brand"
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.32em' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            BUILTBYARAB
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
