import { Link } from 'react-router-dom'
import { contact, links } from '../content/site'
import { igLink, mailLink, track, waLink } from '../lib/contact'
import Brand from './Brand'
import OwnerTodo from './OwnerTodo'

export default function Footer() {
  const wa = waLink('START')
  const ig = igLink()
  const mail = mailLink()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__big" aria-hidden="true">
          <Brand />
        </div>
        <div className="footer__grid">
          <div>
            <p className="footer__sig">By Karim Al Arab</p>
            <p className="muted">Founder &amp; Fitness Mentor</p>
          </div>
          <div className="footer__col">
            <p className="footer__h">Contact</p>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { from: 'footer' })}>
                WhatsApp
              </a>
            ) : (
              <OwnerTodo>WhatsApp number</OwnerTodo>
            )}
            {ig ? (
              <a href={ig} target="_blank" rel="noopener">
                Instagram @{contact.instagram}
              </a>
            ) : (
              <OwnerTodo>Instagram handle</OwnerTodo>
            )}
            {mail ? <a href={mail}>{contact.email}</a> : <OwnerTodo>contact email</OwnerTodo>}
          </div>
          <div className="footer__col">
            <p className="footer__h">Mentorship</p>
            <a href={links.overviewPdf} target="_blank" rel="noopener" onClick={() => track('pdf_click', { from: 'footer' })}>
              Mentorship overview (PDF)
            </a>
            <Link to="/#offers">Offers</Link>
            <Link to="/#apply">Apply</Link>
          </div>
          <div className="footer__col">
            <p className="footer__h">Legal</p>
            <Link to="/terms">Terms &amp; membership</Link>
            <Link to="/privacy">Privacy</Link>
          </div>
        </div>
        <div className="footer__base">
          <span>© {new Date().getFullYear()} BUILTBYARAB</span>
          {contact.businessDetails ? <span>{contact.businessDetails}</span> : <OwnerTodo>business details</OwnerTodo>}
          <span>Clinical and personalised nutrition services require licensed professionals.</span>
        </div>
      </div>
    </footer>
  )
}
