/**
 * BUILTBYARAB — owner-editable content.
 *
 * Everything public on the site (contacts, prices, offer states, story copy,
 * FAQs, evidence blocks) is defined here. Change a value, save, redeploy.
 *
 * Rules from the developer brief:
 *  - Never publish guessed contact details. Empty strings hide the related
 *    buttons in production (in dev they show an "owner input" marker).
 *  - Use genuine offer states only: 'open' | 'waitlist' | 'soon'.
 *  - Keep unfinished evidence hidden with `show: false`.
 */

export const contact = {
  // Digits only, with country code, no "+" or spaces. e.g. '9617XXXXXXX'
  whatsapp: '',
  // Instagram handle without "@"
  instagram: '',
  email: '',
  // Optional scheduler link (Cal.com / Calendly). Empty = manual "Request a call".
  bookingUrl: '',
  // Business details for the footer, once supplied.
  businessDetails: '',
}

export const links = {
  // Replace the file in /public/docs to update the PDF without touching code.
  overviewPdf: `${import.meta.env.BASE_URL}docs/BUILTBYARAB_Mentorship_Overview.pdf`,
}

// Application backend. Set VITE_APPLICATION_ENDPOINT in .env (see README).
export const policyVersion = '2026-10-draft'

export const hero = {
  eyebrow: 'Personal fitness mentorship',
  startKg: 93,
  endKg: 72,
  duration: 'Two years',
  line: 'Two years of training, tracking and learning what actually works. Now I’m building it with you.',
}

export const story = [
  {
    id: 'start',
    kicker: 'The starting point',
    title: '93kg.',
    body: 'Where I started. Not where I stayed. Everyone has a starting point — the only thing that matters is what you build from it.',
    image: 'beforeFace',
    tone: 'before',
    tag: '93kg',
    alt: 'Karim at 93kg, before his transformation',
  },
  {
    id: 'work',
    kicker: 'The work',
    title: 'Two years of structure.',
    body: 'Training, logging every session, studying how the body responds and adjusting. Split, sets, reps, rest, progression — repeated until it became routine.',
    image: 'beforeBody',
    tone: 'before',
    tag: 'Day one',
    alt: 'Karim early in his training journey',
  },
  {
    id: 'result',
    kicker: 'The transformation',
    title: '72kg. Stronger.',
    body: 'Leaner, stronger and fitter than I have ever been — with the numbers recorded along the way.',
    image: 'afterTorso',
    tone: 'after',
    tag: '72kg',
    alt: 'Karim at 72kg after two years of training',
  },
  {
    id: 'now',
    kicker: 'Now',
    title: 'Your way in.',
    body: 'I’m bringing my knowledge into a personal mentorship built around what worked for me — and what will work for you. If you’ve ever wondered how I did it, this is it.',
    image: 'afterFace',
    tone: 'after',
    tag: 'Today',
    alt: 'Karim today, founder of BUILTBYARAB',
  },
]

export const focus = ['Muscle growth', 'Body composition', 'Strength', 'Conditioning', 'Confidence', 'Consistency']

export const fit = [
  {
    id: 'foundation',
    label: 'Beginner & intermediate',
    title: 'You want clear structure.',
    body: 'Clear structure, technique guidance and accountability — so you know exactly what to do in every session and why.',
    points: ['A plan you understand', 'Technique feedback on your lifts', 'Someone checking in every week'],
  },
  {
    id: 'performance',
    label: 'Advanced',
    title: 'You want the next level.',
    body: 'Everything in Foundation, plus focused conditioning and deeper performance tracking for lifters who already train seriously.',
    points: ['Tailored conditioning', 'Resting heart-rate & VO2 max trends', 'Performance reviews'],
  },
]

export const pillars = [
  {
    n: '01',
    title: 'Training built around you',
    body: 'Your split, exercises, sets, reps, weights, rest and progression — tailored to your goals, schedule and equipment, with substitutions when you need them.',
  },
  {
    n: '02',
    title: 'Your eight-page progress tracker',
    body: 'Your body weight, workouts, quick stats and strength estimates, plus your split and longer-term plan in one place.',
  },
  {
    n: '03',
    title: 'Regular contact & accountability',
    body: 'Private WhatsApp support, a weekly check-in and up to three technique clips each week, with written or voice feedback.',
  },
  {
    n: '04',
    title: 'A plan that keeps adapting',
    body: 'Monthly program review and a scheduled call. Earlier adjustments as performance, recovery or your schedule change.',
  },
  {
    n: '05',
    title: 'Recovery & supplement education',
    body: 'Practical sleep and recovery habits, plus optional supplement education and specialist input where needed.',
  },
]

export const planIncludes = ['Split', 'Exercises', 'Sets', 'Reps', 'Working weights', 'Rest', 'Progression', 'Substitutions']

export const trackerIncludes = ['Body weight', 'Workouts', 'Quick stats', 'Strength estimates', 'Your split', 'Longer-term plan']

export const whoop = {
  show: true,
  // Add the date the screenshots were taken before launch, e.g. 'October 2026'
  asOf: '',
  stats: [
    { prefix: '#', value: 120, suffix: '', label: 'Weightlifters ranking', detail: 'out of 113K on WHOOP' },
    { prefix: '', value: 38, suffix: ' bpm', label: 'Recorded resting heart rate', detail: 'device estimate' },
  ],
  note: 'My recorded results. Rankings change; wearable readings are estimates.',
}

/**
 * Client results — add only with approved wording, attribution and permission.
 * { name, quote, image, context, show }
 */
export const clientResults = [
  { id: 'hashem', name: 'Hashem Zeidan', quote: '', context: '', image: null, show: false },
]

/**
 * Offers.
 * status: 'open' | 'waitlist' | 'soon'
 * action: 'apply' (application form) | 'interest' (register interest) | 'quote' (Concierge)
 * checkoutUrl: hosted checkout link once a payment gateway is connected (Structure only —
 *   Foundation/Performance always require application + acceptance before payment).
 */
export const offers = [
  {
    id: 'structure',
    name: 'Structure',
    audience: 'Self-guided',
    price: 25,
    period: '/ month',
    status: 'soon',
    action: 'interest',
    cta: 'Register interest',
    checkoutUrl: '',
    summary: 'Reusable training blocks you run on your own.',
    features: [
      'Exercises, sets, reps, rest & progression',
      'Substitutions & demonstration links',
      'Progress tracker',
      'Paths for different schedules & levels',
    ],
    excludes: 'No individual plan adjustments, check-ins, technique feedback, coaching calls or coaching WhatsApp. Billing and technical help remain available.',
  },
  {
    id: 'foundation',
    name: 'Foundation',
    audience: 'Beginner & intermediate lifters',
    price: 100,
    period: '/ month',
    status: 'open',
    action: 'apply',
    cta: 'Apply for mentorship',
    summary: 'Personal training, progress tracking and weekly support.',
    features: [
      'Personalised training plan',
      'Eight-page progress tracker',
      'Weekly check-in',
      'Private WhatsApp support',
      'Up to 3 technique clips weekly',
      'Monthly program review & call',
    ],
  },
  {
    id: 'performance',
    name: 'Performance',
    audience: 'Advanced lifters',
    price: 120,
    period: '/ month',
    status: 'open',
    action: 'apply',
    cta: 'Apply for Performance',
    featured: true,
    summary: 'Foundation plus VO2 max conditioning and resting heart-rate reviews.',
    features: [
      'Everything in Foundation',
      'Tailored conditioning',
      'Performance reviews',
      'Resting heart-rate & VO2 max trends',
      'Wearable optional',
    ],
    note: 'Device-based VO2 max readings are estimates. No particular reading is guaranteed.',
  },
  {
    id: 'concierge',
    name: 'Concierge',
    audience: 'Mentorship + nutrition',
    price: null,
    priceLabel: 'Individual quote',
    status: 'soon',
    action: 'quote',
    cta: 'Request a Concierge consultation',
    summary: 'Personal mentorship plus licensed dietitian support and an agreed meal delivery package.',
    features: [
      'Personal mentorship',
      'Licensed dietitian support',
      'Agreed meal delivery package',
      'Written monthly quote',
    ],
    note: 'Quote states meals per day, delivery days, service area, consultations and exclusions.',
  },
]

export const statusLabel = { open: 'Open', waitlist: 'Waitlist', soon: 'Coming soon' }

export const local = [
  {
    title: 'Home gym session',
    price: '$40',
    unit: '90 minutes',
    body: 'One-to-one coaching at your home gym, subject to location and availability. Any travel charge is agreed before confirming.',
    cta: 'Request a session',
    message: 'Hi Karim, I’d like to request a 90-minute home gym session.',
  },
  {
    title: 'Gym sessions & runs',
    price: 'By arrangement',
    unit: 'Mercury gym · outdoor runs',
    body: 'Train together at Mercury or join a run. Guest entry is subject to gym rules, availability and the current entry fee.',
    cta: 'Ask about availability',
    message: 'Hi Karim, I’d like to ask about a gym session or run together.',
  },
]

export const steps = [
  { n: '1', title: 'Screening', body: 'Share your goals, schedule and training history in a short application.' },
  { n: '2', title: 'Introductory call', body: 'A brief call to discuss priorities, fit and health readiness.' },
  { n: '3', title: 'Starting plan', body: 'Baseline assessment, then your program and tracker. Payment only after acceptance and agreed terms.' },
]

export const faqs = [
  {
    q: 'I’m a complete beginner. Is this for me?',
    a: 'Yes. Foundation is built for beginner and intermediate lifters: clear structure, technique guidance and accountability. Your starting weights are based on where you are now — no max testing required.',
  },
  {
    q: 'I have a busy schedule. Will it still work?',
    a: 'Your plan is built around the days you actually have available. If your schedule changes, the plan adjusts — that is what the weekly check-in and monthly review are for.',
  },
  {
    q: 'I train at home with limited equipment.',
    a: 'The program is shaped around your equipment. Tell me what you have in the application and exercises, substitutions and progressions are chosen to match.',
  },
  {
    q: 'Do I need a WHOOP or another wearable?',
    a: 'No. Wearables are optional. Pace, effort, workout completion and recovery feedback can guide conditioning just as well. Device-based readings are estimates.',
  },
  {
    q: 'What is the difference between coaching and Structure?',
    a: 'Foundation and Performance are personal mentorship: an individual plan, weekly check-ins, technique feedback and WhatsApp support. Structure is a self-guided program — no individual adjustments, check-ins, technique feedback or coaching calls.',
  },
  {
    q: 'How do I reach Karim?',
    a: 'Mentorship clients get private WhatsApp support, a weekly check-in and up to three technique clips each week. Reply hours are confirmed when you start.',
  },
  {
    q: 'Are there extra costs?',
    a: 'Dietitian consultations, meals, supplements and gym entry are billed separately and always agreed first. There is no compulsory supplement purchase.',
  },
  {
    q: 'Are results guaranteed?',
    a: 'Results depend on consistency. I bring the structure; you bring the work — follow the plan, log your sessions, communicate honestly and report pain or unusual fatigue.',
  },
  {
    q: 'How do payments work?',
    a: 'You only pay after your application, the introductory call and acceptance. Membership terms, the payment method and any additional charges are confirmed before payment.',
  },
  {
    q: 'Can I cancel?',
    a: 'Cancellation, pause and refund terms are shared and agreed in writing before your first payment.',
  },
]
