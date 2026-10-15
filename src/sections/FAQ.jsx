import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { faqs } from '../content/site'
import { Eyebrow, Reveal, SplitReveal } from '../components/Reveal'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <SplitReveal id="faq-title" text={['Questions,', 'answered.']} className="h2" />
        </div>
        <div className="faq__list">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 5) * 0.04} y={20}>
              <Item f={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Item({ f, open, onToggle }) {
  const id = useId()
  return (
    <div className={`faq__item ${open ? 'is-open' : ''}`}>
      <h3>
        <button className="faq__q" aria-expanded={open} aria-controls={id} onClick={onToggle}>
          <span>{f.q}</span>
          <span className="faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="faq__a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>{f.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
