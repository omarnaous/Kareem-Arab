import { useEffect } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found — BUILTBYARAB'
  }, [])
  return (
    <section className="page page--center">
      <div className="container narrow">
        <motion.p className="nf__num" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true">
          404
        </motion.p>
        <h1 className="h2">This page skipped leg day.</h1>
        <p className="muted">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="final__ctas">
          <Link className="btn btn--gold" to="/">
            Back to home
          </Link>
          <Link className="btn btn--ghost" to="/#apply">
            Apply for mentorship
          </Link>
        </div>
      </div>
    </section>
  )
}
