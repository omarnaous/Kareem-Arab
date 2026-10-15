import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import { useApply } from '../lib/applyContext'
import { lockScroll } from '../lib/scroll'
import Brand from './Brand'

const NAV = [
  { id: 'offers', label: 'Offers' },
  { id: 'how', label: 'How it works' },
  { id: 'results', label: 'Results' },
  { id: 'faq', label: 'FAQ' },
]

export default function Header() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { goTo, startApplication } = useApply()
  const { pathname } = useLocation()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 40)
    setHidden(y > 400 && y > prev && !open)
  })

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  const nav = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    goTo(id)
  }

  return (
    <>
      <motion.header
        className={`header ${solid ? 'is-solid' : ''}`}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="header__inner container">
          <Link to="/" className="header__brand" aria-label="BUILTBYARAB home">
            <Brand />
          </Link>
          <nav className="header__nav" aria-label="Main">
            {NAV.map((n) => (
              <a key={n.id} href={`${import.meta.env.BASE_URL}#${n.id}`} onClick={nav(n.id)} className="header__link">
                <span>{n.label}</span>
              </a>
            ))}
          </nav>
          <button className="btn btn--gold btn--sm header__apply" onClick={() => startApplication()}>
            Apply
          </button>
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="menu__nav container" aria-label="Mobile">
              {[...NAV, { id: 'apply', label: 'Apply' }].map((n, i) => (
                <div className="menu__row" key={n.id}>
                  <motion.a
                    href={`${import.meta.env.BASE_URL}#${n.id}`}
                    onClick={nav(n.id)}
                    className="menu__link"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="menu__num">0{i + 1}</span>
                    {n.label}
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.p
              className="menu__foot container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              I bring the structure. You bring the work.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
