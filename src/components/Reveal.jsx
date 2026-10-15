import { Fragment } from 'react'
import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1]

/** Word-by-word masked reveal for headings. */
export function SplitReveal({ text, as = 'h2', className = '', delay = 0, stagger = 0.05, once = true, ...rest }) {
  const Tag = motion[as]
  const lines = Array.isArray(text) ? text : [text]
  let i = 0
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      aria-label={lines.join(' ')}
      {...rest}
    >
      {lines.map((line, li) => (
        <span className="split-line" key={li} aria-hidden="true">
          {line.split(' ').map((word, wi, words) => {
            const idx = i++
            return (
              <Fragment key={wi}>
                <span className="split-mask">
                  <motion.span
                    className="split-word"
                    variants={{
                      hidden: { y: '115%', rotate: 4 },
                      show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease, delay: delay + idx * stagger } },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
                {wi < words.length - 1 ? ' ' : null}
              </Fragment>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}

/** Fade + rise on enter. */
export function Reveal({ children, delay = 0, y = 32, className = '', as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Eyebrow({ children, className = '' }) {
  return (
    <Reveal as="p" y={12} className={`eyebrow ${className}`}>
      <span className="eyebrow__line" aria-hidden="true" />
      {children}
    </Reveal>
  )
}
