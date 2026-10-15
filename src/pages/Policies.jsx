import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { contact, policyVersion } from '../content/site'

/*
 * DRAFT policy pages. Karim must review and approve the final wording
 * (ideally with legal advice) before payments are enabled. Do not treat this
 * template as legal compliance.
 */

function PolicyPage({ title, children }) {
  useEffect(() => {
    document.title = `${title} — BUILTBYARAB`
  }, [title])
  return (
    <section className="page">
      <div className="container narrow prose">
        <p className="eyebrow">
          <span className="eyebrow__line" aria-hidden="true" />
          Version {policyVersion} · draft pending approval
        </p>
        <h1 className="h2">{title}</h1>
        {children}
        <p>
          <Link to="/">← Back to home</Link>
        </p>
      </div>
    </section>
  )
}

const reach = contact.email ? `by email at ${contact.email}` : 'through the contact details on this website'

export function Privacy() {
  return (
    <PolicyPage title="Privacy notice">
      <h2>What we collect</h2>
      <p>
        When you apply, we collect your name, WhatsApp number, age, city/country, training experience, goals, preferred
        option, availability, equipment and any notes you choose to add. Email is optional.
      </p>
      <h2>Why</h2>
      <p>
        To review your application, contact you about it and arrange an introductory call. Marketing updates are only
        sent if you separately opt in, and you can opt out at any time.
      </p>
      <h2>What we don’t collect here</h2>
      <p>
        Measurements, photos and health history are not collected on the public application. Any detailed screening
        happens privately later, only if you continue.
      </p>
      <h2>Storage and providers</h2>
      <p>
        Applications are stored in private, owner-controlled storage. Service providers used to run this website (hosting,
        form storage, scheduling) process data only to provide those services.
      </p>
      <h2>Your choices</h2>
      <p>You can ask to see, correct or delete your information {reach}.</p>
    </PolicyPage>
  )
}

export function Terms() {
  return (
    <PolicyPage title="Terms & membership">
      <h2>Applications</h2>
      <p>
        Submitting an application does not create a membership or a charge. Foundation and Performance require a review,
        an introductory call and acceptance before any payment.
      </p>
      <h2>Membership terms</h2>
      <p>
        Price, billing method, minimum term, renewals, pauses, cancellation and refunds are confirmed in writing before
        your first payment.
      </p>
      <h2>Additional costs</h2>
      <p>
        Dietitian consultations, meals, supplements and gym entry are billed separately and agreed first. There is no
        compulsory supplement purchase. Concierge includes only the items stated in its written quote.
      </p>
      <h2>Health and results</h2>
      <p>
        Mentorship is training guidance, not medical advice. Report pain or unusual fatigue. Clinical and personalised
        nutrition services require licensed professionals. Results depend on consistency and are not guaranteed.
        Wearable readings are device estimates.
      </p>
    </PolicyPage>
  )
}
