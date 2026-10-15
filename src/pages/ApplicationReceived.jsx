import { useEffect } from 'react'
import { motion } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import { contact, links } from '../content/site'
import { mailLink, track, waLink } from '../lib/contact'

const ease = [0.22, 1, 0.36, 1]

export default function ApplicationReceived() {
  const { state } = useLocation()
  const wa = waLink(state?.ref ? `Hi Karim, I just applied (ref ${state.ref}).` : 'START')
  const mail = mailLink('BUILTBYARAB application')

  useEffect(() => {
    document.title = 'Application received — BUILTBYARAB'
  }, [])

  return (
    <section className="page page--center">
      <div className="container narrow">
        <motion.div className="check-badge" initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="34" height="34">
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4, ease }} />
          </svg>
        </motion.div>
        <motion.h1 className="h2" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
          Application received.
        </motion.h1>
        {state?.ref && (
          <p className="muted">
            Reference <strong className="gold">{state.ref}</strong>
          </p>
        )}
        <motion.ol className="next" initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } }}>
          {[
            ['Review', 'Karim personally reviews your application and goals.'],
            ['Introductory call', 'If it looks like a fit, you’ll be contacted to arrange a short call.'],
            ['Starting plan', 'After acceptance and agreed terms: baseline assessment, then your program and tracker.'],
          ].map(([t, b], i) => (
            <motion.li key={t} variants={{ h: { opacity: 0, y: 20 }, s: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}>
              <span className="step__n">{i + 1}</span>
              <div>
                <h2 className="h3">{t}</h2>
                <p className="muted">{b}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
        <div className="final__ctas">
          {wa && (
            <a className="btn btn--gold" href={wa} target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { from: 'confirmation' })}>
              Message Karim on WhatsApp
            </a>
          )}
          {!wa && mail && (
            <a className="btn btn--gold" href={mail}>
              Email {contact.email}
            </a>
          )}
          <a className="btn btn--ghost" href={links.overviewPdf} target="_blank" rel="noopener">
            Read the overview
          </a>
          <Link className="btn btn--ghost" to="/">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}
