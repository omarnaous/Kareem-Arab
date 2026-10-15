import { policyVersion } from '../content/site'
import { campaignSource } from './contact'
import { IS_PREVIEW } from './env'

const ENDPOINT = import.meta.env.VITE_APPLICATION_ENDPOINT

/**
 * Sends a completed application to the configured backend.
 *
 * The backend (Formspree, a Cloudflare Worker, Supabase function, etc.) must:
 *  - validate again server-side,
 *  - store the record BEFORE responding 2xx,
 *  - treat `leadId` as an idempotency key so retries never duplicate records
 *    or owner notifications.
 *
 * `leadId` is generated once per form session and reused on retry.
 */
export async function submitApplication(values, leadId) {
  const payload = {
    leadId,
    submittedAt: new Date().toISOString(),
    stage: 'New',
    policyVersion,
    source: campaignSource(),
    ...values,
  }

  if (!ENDPOINT) {
    if (IS_PREVIEW) {
      // Local/preview only — keeps a copy in this browser so the flow can be tested.
      const key = 'bba_dev_leads'
      const leads = JSON.parse(localStorage.getItem(key) || '[]').filter((l) => l.leadId !== leadId)
      localStorage.setItem(key, JSON.stringify([...leads, payload]))
      await new Promise((r) => setTimeout(r, 900))
      return { ok: true, leadId }
    }
    throw new Error('Applications are not connected yet.')
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'Idempotency-Key': leadId },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Submission failed (${res.status})`)
  return { ok: true, leadId }
}
