import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react'

/**
 * Draggable before/after comparison. Keyboard accessible (role="slider", arrow keys).
 * Plays a short "hint" sweep the first time it enters the viewport.
 */
export default function BeforeAfter({ before, after, beforeLabel, afterLabel, beforeAlt, afterAlt, className = '', priority = false }) {
  const ref = useRef(null)
  const pos = useMotionValue(50)
  const [value, setValue] = useState(50)
  const [touched, setTouched] = useState(false)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const clip = useTransform(pos, (p) => `inset(0 0 0 ${p}%)`)
  const left = useTransform(pos, (p) => `${p}%`)
  useMotionValueEvent(pos, 'change', (v) => setValue(Math.round(v)))

  useEffect(() => {
    if (!inView || touched) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const c = animate(pos, [50, 22, 78, 50], { duration: 2.6, ease: 'easeInOut', delay: 0.4 })
    return () => c.stop()
  }, [inView, touched, pos])

  const setFromEvent = (e) => {
    const r = ref.current.getBoundingClientRect()
    pos.set(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)))
  }

  const onDown = (e) => {
    setTouched(true)
    e.currentTarget.setPointerCapture(e.pointerId)
    setFromEvent(e)
  }
  const onMove = (e) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromEvent(e)
  }
  const onKey = (e) => {
    const step = e.shiftKey ? 10 : 4
    let v = pos.get()
    if (e.key === 'ArrowLeft') v -= step
    else if (e.key === 'ArrowRight') v += step
    else if (e.key === 'Home') v = 0
    else if (e.key === 'End') v = 100
    else return
    e.preventDefault()
    setTouched(true)
    pos.set(Math.min(100, Math.max(0, v)))
  }

  return (
    <div
      ref={ref}
      className={`ba ${className}`}
      onPointerDown={onDown}
      onPointerMove={onMove}
      data-cursor="Drag"
    >
      <img className="ba__img" src={before} alt={beforeAlt} draggable="false" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
      <motion.img className="ba__img ba__img--after" src={after} alt={afterAlt} style={{ clipPath: clip }} draggable="false" loading={priority ? 'eager' : 'lazy'} />
      <span className="ba__tag ba__tag--before">{beforeLabel}</span>
      <span className="ba__tag ba__tag--after">{afterLabel}</span>
      <motion.div className="ba__handle" style={{ left }}>
        <div
          className="ba__knob"
          role="slider"
          tabIndex={0}
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={`${100 - value}% before, ${value}% after`}
          onKeyDown={onKey}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}
