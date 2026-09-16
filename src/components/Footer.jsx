import { NavLink } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import Logo from './Logo'

function LinkedinIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM3.558 20.452h3.559V9H3.558v11.452z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-graphite-light border-t border-panel-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Logo className="h-10 w-auto mb-4" />
          <p className="max-w-md text-steel text-sm leading-relaxed">
            An integrated machine workshop delivering precision steel fabrication for
            industrial construction and mechanical engineering across the MENA region.
          </p>
        </div>

        <div>
          <h4 className="font-display uppercase tracking-wide text-steel-light mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm">
            {[
              ['Home', '/'],
              ['About', '/about'],
              ['Services', '/services'],
              ['Facilities', '/facilities'],
              ['Projects', '/projects'],
              ['Insights', '/blogs'],
              ['Contact', '/contact'],
            ].map(([label, to]) => (
              <li key={to}>
                <NavLink to={to} className="text-steel hover:text-white transition-colors">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display uppercase tracking-wide text-steel-light mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-steel">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-steel-light shrink-0 mt-0.5" />
              <span>Industrial Area, Dubai, UAE</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-steel-light shrink-0" />
              <a href="tel:+971543058357" className="hover:text-white transition-colors">+971 54 305 8357</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-steel-light shrink-0" />
              <span>info@jahsteel.ae</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-panel-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-steel text-xs">
            © {new Date().getFullYear()} Jazeerat Al Hadeed. All rights reserved.
          </p>
          <a
            href="https://www.linkedin.com/company/jahsteel/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jazeerat Al Hadeed on LinkedIn"
            className="flex items-center justify-center w-9 h-9 border border-panel-line text-steel hover:text-white hover:border-white/40 transition-colors"
          >
            <LinkedinIcon width={16} height={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
