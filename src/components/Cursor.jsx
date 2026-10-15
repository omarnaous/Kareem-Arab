import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/** Gold ring cursor for fine pointers. Grows over links; shows a label over [data-cursor]. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState({ hover: false, label: '' , down: false })
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!mq.matches || reduce) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target.closest?.('a, button, [data-cursor], input, select, textarea, label, summary')
      const label = t?.closest('[data-cursor]')?.getAttribute('data-cursor') || ''
      setState((s) => (s.hover === !!t && s.label === label ? s : { ...s, hover: !!t, label }))
    }
    const down = () => setState((s) => ({ ...s, down: true }))
    const up = () => setState((s) => ({ ...s, down: false }))
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [x, y])

  if (!enabled) return null
  const size = state.label ? 84 : state.hover ? 54 : 18

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
      <motion.div
        className={`cursor-ring ${state.label ? 'has-label' : ''}`}
        style={{ x: sx, y: sy }}
        animate={{ width: size, height: size, scale: state.down ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        aria-hidden="true"
      >
        {state.label && <span>{state.label}</span>}
      </motion.div>
    </>
  )
}
