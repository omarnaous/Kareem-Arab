import { motion, useScroll, useTransform, useVelocity, useSpring } from 'motion/react'

/** Infinite ticker; skews slightly with scroll velocity. */
export default function Marquee({ items, reverse = false }) {
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 })
  const skew = useTransform(velocity, [-2000, 0, 2000], [6, 0, -6], { clamp: true })
  const row = [...items, ...items]

  return (
    <div className="marquee" aria-label={items.join(', ')}>
      <motion.div className={`marquee__track ${reverse ? 'is-reverse' : ''}`} style={{ skewX: skew }} aria-hidden="true">
        {[0, 1].map((k) => (
          <div className="marquee__group" key={k}>
            {row.map((t, i) => (
              <span className="marquee__item" key={i}>
                {t}
                <span className="marquee__dot">✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
