import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'
import { Eyebrow, Reveal, SplitReveal } from '../components/Reveal'
import { useApply } from '../lib/applyContext'
import { submitApplication } from '../lib/submitApplication'
import { mailLink, track, waLink } from '../lib/contact'

const STEPS = ['About you', 'Your training', 'Final details']

const OPTIONS = {
  experience: ['Beginner', 'Intermediate', 'Advanced'],
  goal: ['Build muscle', 'Body composition', 'Get stronger', 'Conditioning & fitness', 'Confidence & consistency'],
  offer: [
    { v: 'foundation', l: 'Foundation — $100/mo' },
    { v: 'performance', l: 'Performance — $120/mo' },
    { v: 'structure', l: 'Structure — register interest' },
    { v: 'concierge', l: 'Concierge — request a quote' },
    { v: 'unsure', l: 'Not sure yet' },
  ],
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  equipment: ['Full commercial gym', 'Home gym', 'Minimal equipment'],
}

const CODES = ['+961', '+971', '+966', '+974', '+965', '+973', '+968', '+962', '+20', '+33', '+44', '+49', '+1', '+61']

const empty = {
  name: '',
  code: '+961',
  phone: '',
  age: '',
  location: '',
  email: '',
  experience: '',
  goal: '',
  offer: '',
  days: [],
  equipment: '',
  constraints: '',
  deliveryArea: '',
  note: '',
  consentService: false,
  consentMarketing: false,
  company: '', // honeypot
}

function validate(step, v) {
  const e = {}
  if (step === 0) {
    if (v.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!/^\+\d{1,4}$/.test(v.code.trim())) e.code = 'Use a code like +961.'
    if (!/^\d{6,14}$/.test(v.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter your WhatsApp number (digits only).'
    const age = Number(v.age)
    if (!Number.isInteger(age) || age < 10 || age > 100) e.age = 'Enter your age in years.'
    if (v.location.trim().length < 2) e.location = 'Enter your city and country.'
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'This email doesn’t look right.'
  }
  if (step === 1) {
    if (!v.experience) e.experience = 'Choose your training experience.'
    if (!v.goal) e.goal = 'Choose your primary goal.'
    if (!v.offer) e.offer = 'Choose an option (or “Not sure yet”).'
    if (v.days.length === 0) e.days = 'Pick the days you can usually train.'
    if (!v.equipment) e.equipment = 'Choose your usual equipment.'
  }
  if (step === 2) {
    if (v.offer === 'concierge' && v.deliveryArea.trim().length < 2) e.deliveryArea = 'Enter your delivery area.'
    if (!v.consentService) e.consentService = 'Please agree so Karim can contact you about your application.'
  }
  return e
}

const newId = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`)

export default function Apply() {
  const { offer: preselected } = useApply()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [v, setV] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | error
  const leadId = useRef(newId())
  const formRef = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    if (preselected) setV((s) => ({ ...s, offer: preselected }))
  }, [preselected])

  const set = (k) => (e) => {
    const val = e?.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e
    if (!started.current) {
      started.current = true
      track('application_start')
    }
    setV((s) => ({ ...s, [k]: val }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }
  const toggleDay = (d) => set('days')(v.days.includes(d) ? v.days.filter((x) => x !== d) : [...v.days, d])

  const focusFirstError = (errs) => {
    requestAnimationFrame(() => {
      const k = Object.keys(errs)[0]
      formRef.current?.querySelector(`[data-field="${k}"]`)?.focus()
    })
  }

  const next = () => {
    const errs = validate(step, v)
    setErrors(errs)
    if (Object.keys(errs).length) return focusFirstError(errs)
    setDir(1)
    setStep((s) => s + 1)
  }
  const back = () => {
    setDir(-1)
    setStep((s) => s - 1)
  }

  const submit = async (e) => {
    e.preventDefault()
    if (step < STEPS.length - 1) return next()
    const errs = validate(step, v)
    setErrors(errs)
    if (Object.keys(errs).length) return focusFirstError(errs)
    if (status === 'sending') return
    // Honeypot filled → silently drop (bots)
    if (v.company) return navigate('/application-received')

    setStatus('sending')
    const { company: _hp, code, phone, ...rest } = v
    try {
      await submitApplication(
        { ...rest, whatsapp: `${code.trim()}${phone.replace(/[\s-]/g, '')}`, consentAt: new Date().toISOString() },
        leadId.current,
      )
      track('application_submit', { offer: v.offer })
      navigate('/application-received', { state: { ref: leadId.current.slice(0, 8).toUpperCase(), offer: v.offer } })
    } catch {
      setStatus('error')
    }
  }

  const err = (k) =>
    errors[k] ? (
      <p className="field__err" id={`err-${k}`} role="alert">
        {errors[k]}
      </p>
    ) : null
  const aria = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `err-${k}` : undefined, 'data-field': k })

  const wa = waLink('START')
  const mail = mailLink('BUILTBYARAB application')

  return (
    <section id="apply" className="section apply" aria-labelledby="apply-title">
      <div className="container apply__grid">
        <div className="apply__intro">
          <Eyebrow>Apply</Eyebrow>
          <SplitReveal id="apply-title" text={['If you’ve wondered', 'how I did it,', 'this is your way in.']} className="h2" />
          <Reveal as="p" className="lede" delay={0.2}>
            A short application — about two minutes. No payment now. Karim reviews every application personally, then
            arranges a brief introductory call.
          </Reveal>
          <Reveal as="ul" className="ticks apply__assure" delay={0.3}>
            <li>No measurements, photos or health history at this step</li>
            <li>You only pay after acceptance and agreed terms</li>
            <li>Your answers stay private</li>
          </Reveal>
        </div>

        <Reveal className="apply__card card" delay={0.1}>
          <div className="progress" aria-label={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step]}`}>
            {STEPS.map((s, i) => (
              <div key={s} className={`progress__step ${i <= step ? 'is-on' : ''}`}>
                <span className="progress__bar">
                  <motion.span
                    className="progress__fill"
                    initial={false}
                    animate={{ scaleX: i <= step ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
                <span className="progress__label">{s}</span>
              </div>
            ))}
          </div>

          <form ref={formRef} onSubmit={submit} noValidate className="form">
            <div className="hp" aria-hidden="true">
              <label>
                Company
                <input tabIndex={-1} autoComplete="off" value={v.company} onChange={set('company')} />
              </label>
            </div>

            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.fieldset
                key={step}
                custom={dir}
                className="form__step"
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <legend className="sr-only">{STEPS[step]}</legend>

                {step === 0 && (
                  <>
                    <Field label="Full name" k="name" err={err}>
                      <input id="f-name" autoComplete="name" value={v.name} onChange={set('name')} {...aria('name')} />
                    </Field>
                    <div className="field">
                      <label htmlFor="f-phone">WhatsApp number</label>
                      <div className="phone">
                        <input
                          className="phone__code"
                          aria-label="Country code"
                          list="codes"
                          inputMode="tel"
                          value={v.code}
                          onChange={set('code')}
                          {...aria('code')}
                        />
                        <datalist id="codes">
                          {CODES.map((c) => (
                            <option key={c} value={c} />
                          ))}
                        </datalist>
                        <input
                          id="f-phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel-national"
                          placeholder="70 123 456"
                          value={v.phone}
                          onChange={set('phone')}
                          {...aria('phone')}
                        />
                      </div>
                      {err('code')}
                      {err('phone')}
                    </div>
                    <div className="form__row">
                      <Field label="Age" k="age" err={err}>
                        <input id="f-age" type="number" inputMode="numeric" min="10" max="100" value={v.age} onChange={set('age')} {...aria('age')} />
                      </Field>
                      <Field label="City & country" k="location" err={err}>
                        <input id="f-location" autoComplete="address-level2" placeholder="Beirut, Lebanon" value={v.location} onChange={set('location')} {...aria('location')} />
                      </Field>
                    </div>
                    <Field label="Email (optional)" hint="Only used to send your application confirmation." k="email" err={err}>
                      <input id="f-email" type="email" autoComplete="email" value={v.email} onChange={set('email')} {...aria('email')} />
                    </Field>
                  </>
                )}

                {step === 1 && (
                  <>
                    <Choice label="Training experience" k="experience" options={OPTIONS.experience} v={v} set={set} err={err} />
                    <Choice label="Primary goal" k="goal" options={OPTIONS.goal} v={v} set={set} err={err} />
                    <Field label="Preferred option" k="offer" err={err}>
                      <select id="f-offer" value={v.offer} onChange={set('offer')} {...aria('offer')}>
                        <option value="" disabled>
                          Select…
                        </option>
                        {OPTIONS.offer.map((o) => (
                          <option key={o.v} value={o.v}>
                            {o.l}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <fieldset className="field">
                      <legend>Days you can usually train</legend>
                      <div className="pills" data-field="days" tabIndex={-1}>
                        {OPTIONS.days.map((d) => (
                          <button
                            type="button"
                            key={d}
                            className={`pill ${v.days.includes(d) ? 'is-on' : ''}`}
                            aria-pressed={v.days.includes(d)}
                            onClick={() => toggleDay(d)}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                      {err('days')}
                    </fieldset>
                    <Choice label="Usual equipment" k="equipment" options={OPTIONS.equipment} v={v} set={set} err={err} />
                  </>
                )}

                {step === 2 && (
                  <>
                    <Field label="Major scheduling constraints (optional)" k="constraints" err={err}>
                      <input id="f-constraints" placeholder="e.g. shift work, travel, exams" value={v.constraints} onChange={set('constraints')} maxLength={200} />
                    </Field>
                    {v.offer === 'concierge' && (
                      <Field label="Meal delivery area" k="deliveryArea" err={err}>
                        <input id="f-deliveryArea" value={v.deliveryArea} onChange={set('deliveryArea')} {...aria('deliveryArea')} />
                      </Field>
                    )}
                    <Field label="Anything else? (optional)" k="note" err={err}>
                      <textarea id="f-note" rows={3} maxLength={500} value={v.note} onChange={set('note')} />
                    </Field>
                    <label className="check">
                      <input type="checkbox" checked={v.consentService} onChange={set('consentService')} {...aria('consentService')} />
                      <span>
                        I agree to be contacted on WhatsApp{v.email ? ' or email' : ''} about my application, and I’ve read the{' '}
                        <Link to="/privacy" target="_blank" rel="noopener">
                          privacy notice
                        </Link>
                        .
                      </span>
                    </label>
                    {err('consentService')}
                    <label className="check">
                      <input type="checkbox" checked={v.consentMarketing} onChange={set('consentMarketing')} />
                      <span>Optional: send me occasional BUILTBYARAB updates. You can opt out any time.</span>
                    </label>
                  </>
                )}
              </motion.fieldset>
            </AnimatePresence>

            {status === 'error' && (
              <div className="form__error" role="alert">
                <p>
                  <strong>Your application didn’t send.</strong> Nothing you entered was lost — please try again.
                </p>
                {(wa || mail) && (
                  <p>
                    Or reach Karim directly:{' '}
                    {wa && (
                      <a href={wa} target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { from: 'apply_error' })}>
                        WhatsApp
                      </a>
                    )}
                    {wa && mail && ' · '}
                    {mail && <a href={mail}>Email</a>}
                  </p>
                )}
              </div>
            )}

            <div className="form__nav">
              {step > 0 ? (
                <button type="button" className="btn btn--ghost" onClick={back}>
                  Back
                </button>
              ) : (
                <span />
              )}
              <button type="submit" className="btn btn--gold" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <>
                    <span className="spinner" aria-hidden="true" /> Sending…
                  </>
                ) : step < STEPS.length - 1 ? (
                  'Continue'
                ) : (
                  'Submit application'
                )}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ label, hint, k, err, children }) {
  return (
    <div className="field">
      <label htmlFor={`f-${k}`}>{label}</label>
      {children}
      {hint && <p className="field__hint">{hint}</p>}
      {err(k)}
    </div>
  )
}

function Choice({ label, k, options, v, set, err }) {
  return (
    <fieldset className="field">
      <legend>{label}</legend>
      <div className="pills" role="radiogroup">
        {options.map((o, i) => (
          <label key={o} className={`pill ${v[k] === o ? 'is-on' : ''}`}>
            <input type="radio" name={k} value={o} checked={v[k] === o} onChange={set(k)} data-field={i === 0 ? k : undefined} />
            {o}
          </label>
        ))}
      </div>
      {err(k)}
    </fieldset>
  )
}
