import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { links } from '../content/site'
import { useApply } from '../lib/applyContext'
import { track, waLink } from '../lib/contact'
import Magnetic from '../components/Magnetic'
import { Arrow } from './Hero'

export default function FinalCTA() {
  const ref = useRef(null)
  const { startApplication } = useApply()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['-20%', '0%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['20%', '0%'])
  const wa = waLink('START')

  return (
    <section ref={ref} className="final" aria-labelledby="final-title">
      <h2 id="final-title" className="final__title">
        <motion.span style={{ x: x1 }}>I bring the structure.</motion.span>
        <motion.span style={{ x: x2 }} className="gold">
          You bring the work.
        </motion.span>
      </h2>
      <div className="final__ctas">
        <Magnetic>
          <button className="btn btn--gold btn--lg" onClick={() => startApplication()}>
            Apply for mentorship <Arrow />
          </button>
        </Magnetic>
        {wa ? (
          <a className="btn btn--ghost btn--lg" href={wa} target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { from: 'final' })}>
            Message START on WhatsApp
          </a>
        ) : (
          <a className="btn btn--ghost btn--lg" href={links.overviewPdf} target="_blank" rel="noopener" onClick={() => track('pdf_click', { from: 'final' })}>
            Get the overview
          </a>
        )}
      </div>
    </section>
  )
}
