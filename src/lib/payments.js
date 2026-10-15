/**
 * Payment gateway integration point (scope "C" in the brief — not active yet).
 *
 * Sales paths:
 *  - Structure: may use a hosted checkout link (offer.checkoutUrl in content/site.js).
 *  - Foundation / Performance: application → call → acceptance → agreed terms → payment.
 *    Never sold through a public checkout button.
 *  - Concierge: written quote first, payment timing agreed after acceptance.
 *
 * Before wiring a gateway, confirm merchant eligibility for the actual business and
 * payout account (Stripe does not currently list Lebanon as a supported country).
 * Use HOSTED checkout only (no card fields in this site). Grant access from a
 * server-verified webhook, never from the checkout success URL alone.
 */
export function checkoutFor(offer) {
  if (offer.id !== 'structure') return null
  if (offer.status !== 'open' || !offer.checkoutUrl) return null
  return offer.checkoutUrl
}
