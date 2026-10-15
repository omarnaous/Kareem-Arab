import Lenis from 'lenis'

let lenis = null

export function startSmoothScroll() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || lenis) return () => {}
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) })
  let raf
  const loop = (time) => {
    lenis.raf(time)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
  return () => {
    cancelAnimationFrame(raf)
    lenis.destroy()
    lenis = null
  }
}

const HEADER_OFFSET = -72

export function scrollToId(id, { immediate = false } = {}) {
  const el = document.getElementById(id)
  if (!el) return false
  if (lenis) lenis.scrollTo(el, { offset: HEADER_OFFSET, immediate })
  else {
    const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET
    window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
  }
  return true
}

export function scrollTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}

export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
