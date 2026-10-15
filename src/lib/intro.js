export const INTRO_KEY = 'bba_intro_seen'

/** Seconds the hero waits so its entrance plays after the intro curtain. Evaluated once per page load. */
export const INTRO_DELAY = (() => {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0
    return sessionStorage.getItem(INTRO_KEY) ? 0.15 : 2.35
  } catch {
    return 0.15
  }
})()
