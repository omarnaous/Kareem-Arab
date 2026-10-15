import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { offers, statusLabel } from '../content/site'
import { Eyebrow, Reveal, SplitReveal } from '../components/Reveal'
import { useApply } from '../lib/applyContext'
import { checkoutFor } from '../lib/payments'
import { track } from '../lib/contact'

export default function Offers() {
  const ref = useRef(null)
  const scroller = useRef(null)
  const [current, setCurrent] = useState(0)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  useEffect(() => {
    if (inView) track('offer_view')
  }, [inView])

  // Phones: offers are a swipe carousel. Open it on the main offer (Foundation).
  const cardLeft = (i) => {
    const el = scroller.current
    const card = el?.children[i]
    return card ? card.offsetLeft - (el.clientWidth - card.clientWidth) / 2 : 0
  }
  const scrollToCard = (i) => scroller.current?.scrollTo({ left: cardLeft(i), behavior: 'smooth' })
  useEffect(() => {
    const el = scroller.current
    if (!el || el.scrollWidth <= el.clientWidth) return
    const i = Math.max(0, offers.findIndex((o) => o.id === 'foundation'))
    el.scrollLeft = cardLeft(i)
    setCurrent(i)
  }, [])
  const onScroll = () => {
    const el = scroller.current
    const mid = el.scrollLeft + el.clientWidth / 2
    let best = 0
    ;[...el.children].forEach((c, i) => {
      if (Math.abs(c.offsetLeft + c.clientWidth / 2 - mid) < Math.abs(el.children[best].offsetLeft + el.children[best].clientWidth / 2 - mid)) best = i
    })
    if (best !== current) setCurrent(best)
  }

  return (
    <section id="offers" ref={ref} className="section offers" aria-labelledby="offers-title">
      <div className="container">
        <div className="section__head section__head--center">
          <Eyebrow>Offers</Eyebrow>
          <SplitReveal id="offers-title" text="Choose your direction." className="h2" />
          <Reveal as="p" className="lede" delay={0.2}>
            Support matched to your starting point. Membership terms and any additional charges are confirmed before
            payment.
          </Reveal>
        </div>

        <div className="offers__grid" ref={scroller} onScroll={onScroll}>
          {offers.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.1} className="offers__cell">
              <OfferCard o={o} />
            </Reveal>
          ))}
        </div>
        <div className="offers__dots" aria-hidden="true">
          {offers.map((o, i) => (
            <button key={o.id} tabIndex={-1} className={i === current ? 'is-on' : ''} onClick={() => scrollToCard(i)}>
              <span>{o.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function OfferCard({ o }) {
  const ref = useRef(null)
  const { startApplication } = useApply()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sry = useSpring(ry, { stiffness: 200, damping: 20 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(0)
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(160,127,58,0.16), transparent 55%)`

  const move = (e) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 10)
    rx.set(-(py - 0.5) * 10)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const leave = () => {
    rx.set(0)
    ry.set(0)
  }

  const checkout = checkoutFor(o)
  const onAction = () => {
    track('offer_cta', { offer: o.id, action: o.action })
    startApplication(o.id)
  }

  return (
    <motion.article
      ref={ref}
      className={`offer ${o.featured ? 'offer--featured' : ''}`}
      style={{ rotateX: srx, rotateY: sry }}
      onPointerMove={move}
      onPointerLeave={leave}
      aria-labelledby={`offer-${o.id}`}
    >
      <motion.div className="offer__sheen" style={{ background: sheen }} aria-hidden="true" />
      <div className="offer__top">
        <h3 id={`offer-${o.id}`} className="offer__name">
          {o.name}
        </h3>
        <span className={`badge badge--${o.status}`}>{statusLabel[o.status]}</span>
      </div>
      <p className="offer__aud">{o.audience}</p>
      <p className="offer__price">
        {o.price != null ? (
          <>
            <span className="offer__cur">$</span>
            {o.price}
            <span className="offer__per">{o.period}</span>
          </>
        ) : (
          <span className="offer__quote">{o.priceLabel}</span>
        )}
      </p>
      <p className="offer__sum">{o.summary}</p>
      <ul className="ticks">
        {o.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      {o.excludes && (
        <p className="offer__excl">
          <strong>Not included:</strong> {o.excludes}
        </p>
      )}
      {o.note && <p className="fineprint">{o.note}</p>}
      <div className="offer__cta">
        {checkout ? (
          <a className="btn btn--gold btn--block" href={checkout} onClick={() => track('checkout_start', { offer: o.id })}>
            Join {o.name}
          </a>
        ) : (
          <button className={`btn btn--block ${o.featured || o.id === 'foundation' ? 'btn--gold' : 'btn--ghost'}`} onClick={onAction}>
            {o.cta}
          </button>
        )}
      </div>
    </motion.article>
  )
}
