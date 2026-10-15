import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useLocation } from 'react-router-dom'
import { useApply } from '../lib/applyContext'

/** Sticky bottom Apply bar on phones. Hidden on the hero and while the form is on screen. */
export default function MobileCTA() {
  const { scrollY } = useScroll()
  const { startApplication } = useApply()
  const { pathname } = useLocation()
  const [pastHero, setPastHero] = useState(false)
  const [applyVisible, setApplyVisible] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setPastHero(y > window.innerHeight * 0.8))

  useEffect(() => {
    const el = document.getElementById('apply')
    if (!el) return
    const io = new IntersectionObserver(([e]) => setApplyVisible(e.isIntersecting), { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [pathname])

  const show = pathname === '/' && pastHero && !applyVisible

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="mobile-cta"
          initial={{ y: '120%' }}
          animate={{ y: 0 }}
          exit={{ y: '120%' }}
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        >
          <span className="mobile-cta__text">From $100 / month</span>
          <button className="btn btn--gold btn--sm" onClick={() => startApplication()}>
            Apply for mentorship
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
