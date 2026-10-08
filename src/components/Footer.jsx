import { NavLink } from 'react-router-dom'
import { Phone, Mail, ArrowUpRight, ArrowUp, MessageCircle } from 'lucide-react'
import Logo from './Logo'
import { SERVICES } from '../data/services'

function LinkedinIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM3.558 20.452h3.559V9H3.558v11.452z" />
    </svg>
  )
}

const NAV = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Facilities', '/facilities'],
  ['Projects', '/projects'],
  ['Steel Fabrication Dubai', '/steel-fabrication-dubai'],
  ['Insights', '/blogs'],
  ['Contact', '/contact'],
]

const OFFICES = [
  { label: 'Head Office', city: 'Dubai', lines: ['Damascus Street, Al Qusais', 'Dubai, UAE'] },
  { label: 'Workshop', city: 'Sharjah', lines: ['P.O. Box 61204, Al Sajaa Industrial Area', 'Sharjah, UAE'] },
]

const columnHeading = 'font-mono text-[11px] uppercase tracking-[0.25em] text-steel mb-5'
const columnLink = 'text-steel-light/80 hover:text-white transition-colors'

export default function Footer() {
  return (
    <footer className="relative bg-graphite-light border-t border-panel-line overflow-hidden">
      {/* ── CTA band ── */}
      <div className="border-b border-panel-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-steel mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-weld" />
              Have a spec? Let's cut it.
            </p>
            <p className="font-display font-extrabold uppercase text-4xl sm:text-5xl leading-[0.95] text-steel-light">
              Send us a drawing.
              <br />
              <span className="text-white lg:whitespace-nowrap">Get a quote in 24 hours.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <NavLink
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 font-display uppercase tracking-wide font-semibold bg-white text-graphite px-7 py-4 hover:bg-steel-light transition-colors"
            >
              Request a Quote
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </NavLink>
            <a
              href="https://wa.me/971543058357"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-display uppercase tracking-wide text-steel-light border border-panel-line px-7 py-4 hover:border-white/40 hover:text-white transition-colors"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Link grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16 grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-2 lg:col-span-4">
          <Logo className="h-10 w-auto mb-5" />
          <p className="max-w-sm text-steel text-sm leading-relaxed">
            An integrated machine workshop delivering precision steel fabrication for
            industrial construction and mechanical engineering across the MENA region.
          </p>
          <a
            href="https://www.linkedin.com/company/jahsteel/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jazeerat Al Hadeed on LinkedIn"
            className="mt-6 inline-flex items-center gap-3 border border-panel-line px-4 py-2.5 text-steel hover:text-white hover:border-white/40 transition-colors"
          >
            <LinkedinIcon width={16} height={16} />
            <span className="font-mono text-[11px] uppercase tracking-widest">LinkedIn</span>
          </a>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h4 className={columnHeading}>Navigate</h4>
          <ul className="space-y-2.5 text-sm">
            {NAV.map(([label, to]) => (
              <li key={to}>
                <NavLink to={to} className={columnLink}>{label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="lg:col-span-3">
          <h4 className={columnHeading}>Services</h4>
          <ul className="space-y-2.5 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <NavLink to={`/services/${s.slug}`} className={columnLink}>{s.title}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 lg:col-span-3">
          <h4 className={columnHeading}>Find Us</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-px bg-panel-line border border-panel-line">
            {OFFICES.map((o) => (
              <address key={o.label} className="not-italic bg-graphite-light p-5">
                <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-steel mb-2">
                  {o.label}
                  <span className="text-steel-light">{o.city}</span>
                </p>
                {o.lines.map((line) => (
                  <p key={line} className="text-sm text-steel-light leading-relaxed">{line}</p>
                ))}
              </address>
            ))}
          </div>

          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href="tel:+971543058357" className={`flex items-center gap-3 ${columnLink}`}>
                <Phone size={16} className="text-steel shrink-0" />
                +971 54 305 8357
              </a>
            </li>
            <li>
              <a href="tel:+971551453288" className={`flex items-center gap-3 ${columnLink}`}>
                <Phone size={16} className="text-steel shrink-0" />
                +971 55 145 3288
              </a>
            </li>
            <li>
              <a href="mailto:info@jahsteel.ae" className={`flex items-center gap-3 ${columnLink}`}>
                <Mail size={16} className="text-steel shrink-0" />
                info@jahsteel.ae
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Oversized outlined wordmark ── */}
      <div aria-hidden className="pointer-events-none select-none px-6 lg:px-10 -mb-[0.16em]">
        <p
          className="font-display font-extrabold uppercase text-center whitespace-nowrap leading-none text-transparent text-[clamp(3.5rem,17.5vw,17rem)]"
          style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.14)' }}
        >
          JAH Steel
        </p>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-panel-line bg-graphite-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-steel text-xs">
            © {new Date().getFullYear()} Jazeerat Al Hadeed. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-steel hover:text-white transition-colors"
          >
            Back to top
            <span className="flex items-center justify-center w-8 h-8 border border-panel-line group-hover:border-white/40 transition-colors">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
