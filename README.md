# BUILTBYARAB — website

Marketing site + application funnel for Karim Al Arab's personal fitness mentorship.
Built to the *BUILTBYARAB Website / Developer Brief* (14 Oct 2026), launch scope **L**.

**Stack:** React 19 + Vite, `motion` (animation), `lenis` (smooth scroll), `react-router-dom`, self-hosted fonts (Barlow Condensed, Manrope).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

## Editing content

Everything public lives in **`src/content/site.js`**: contacts, prices, offer states (`open` / `waitlist` / `soon`), story copy, FAQs, WHOOP cards, client results.

- **Contacts are blank on purpose.** The brief says never to publish guessed contact details. Buttons that need a missing value are hidden in production. In `npm run dev` they show a yellow "Owner input needed" marker instead.
- **PDF:** replace `public/docs/BUILTBYARAB_Mentorship_Overview.pdf`. The link stays the same.
- **Photos:** `src/assets/story/` (cropped from the transformation collage).

## Owner inputs still needed before launch

| Input | Where |
|---|---|
| WhatsApp number, Instagram handle, email, business details | `contact` in `site.js` |
| Date of the WHOOP screenshots | `whoop.asOf` |
| Story copy approval (drafted from the 93kg → 72kg post) | `story` |
| Client results + permission (e.g. Hashem Zeidan) | `clientResults` (set `show: true`) |
| Reply hours, call length, cancellation/refund terms | FAQ + `src/pages/Policies.jsx` (drafts) |
| Domain (canonical URL, sitemap) | `index.html` |
| Signature font (Filmotype Yale) + licence | currently a Barlow italic fallback |

## Applications (required before going live)

The form POSTs JSON to `VITE_APPLICATION_ENDPOINT` (copy `.env.example` to `.env`).
In dev with no endpoint, test applications are kept in the browser's `localStorage` (`bba_dev_leads`).
In production with no endpoint, the form shows an error with a contact fallback. It never shows a false success.

The endpoint must validate server-side, **store before replying 2xx**, and treat `leadId` / the `Idempotency-Key` header as unique so retries never create duplicate records or notifications. Simple options: a Cloudflare Worker + D1, Supabase, or a hosted form/CRM service.

## Payments (scope C, not active)

See `src/lib/payments.js`. Summary:
- **Structure** can get a hosted checkout link (`checkoutUrl`, with status `open`).
- **Foundation / Performance** stay application → call → acceptance → payment. They never get a public checkout button.
- **Concierge** stays quote-first.
- Confirm merchant eligibility first. Stripe does not currently list Lebanon. Use hosted checkout only, and grant access from a verified webhook, never from the success URL.

## Analytics

`track()` in `src/lib/contact.js` pushes events (`offer_view`, `pdf_click`, `whatsapp_click`, `apply_click`, `application_start`, `application_submit`) to `window.dataLayer`. Attach an analytics tool once consent is configured. Never send contact details or free text.

## Test site (GitHub Pages)

```bash
npm run deploy:pages
```

This builds in preview mode and publishes `dist/` to the `gh-pages` branch, served at
https://omarnaous.github.io/Kareem-Arab/. Preview mode shows the owner-input markers, keeps
test applications in the visitor's browser, and adds `noindex`. Re-run it after each change.

## Deploying (production)

The site is static (`dist/`). It includes SPA rewrites for Netlify (`public/_redirects`) and Vercel (`vercel.json`). Cloudflare Pages works the same way.

## Accessibility & motion

Respects `prefers-reduced-motion` (no intro, no smooth scroll, no marquee). The before/after slider works with the keyboard (arrow keys). Focus styles are visible and form errors are announced.
