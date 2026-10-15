import { useRef } from 'react'

/** Card with a soft gold light that follows the pointer (CSS vars --mx/--my). */
export default function Spotlight({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag ref={ref} className={`spotlight ${className}`} onPointerMove={move} {...rest}>
      {children}
    </Tag>
  )
}
