import { contact } from '../content/site'

export const hasWhatsApp = Boolean(contact.whatsapp)

/** Real WhatsApp link with a prefilled message. The visitor still presses send. */
export function waLink(text = 'START') {
  if (!contact.whatsapp) return null
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`
}

export function igLink() {
  return contact.instagram ? `https://instagram.com/${contact.instagram}` : null
}

export function mailLink(subject = 'BUILTBYARAB mentorship') {
  return contact.email ? `mailto:${contact.email}?subject=${encodeURIComponent(subject)}` : null
}

/**
 * Minimal analytics hook. Pushes to window.dataLayer so any tool (GA4, Plausible,
 * Umami…) can be attached later after consent is configured. Never pass contact
 * details, health answers or free text here.
 */
export function track(event, props = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...props })
  if (import.meta.env.DEV) console.debug('[track]', event, props)
}

/** Sanitised campaign source (utm_* + ref only, short alphanumeric). */
export function campaignSource() {
  const params = new URLSearchParams(window.location.search)
  const out = {}
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'ref']) {
    const v = params.get(key)
    if (v) out[key] = v.replace(/[^\w.-]/g, '').slice(0, 64)
  }
  return out
}
