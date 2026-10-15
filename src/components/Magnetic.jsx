import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const fine = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

/** Wraps a button/link so it is gently pulled toward the pointer. */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.5 })

  const move = (e) => {
    if (!fine()) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const leave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span ref={ref} className={`magnetic ${className}`} style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.span>
  )
}
