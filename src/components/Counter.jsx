import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useTransform } from 'motion/react'

/** Counts from `from` to `to` when scrolled into view. */
export default function Counter({ from = 0, to, duration = 1.8, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const mv = useMotionValue(from)
  const text = useTransform(mv, (v) => `${prefix}${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (!inView) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return mv.set(to)
    const c = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => c.stop()
  }, [inView, to, duration, mv])

  return (
    <motion.span ref={ref} className={className} aria-label={`${prefix}${to}${suffix}`}>
      {text}
    </motion.span>
  )
}
