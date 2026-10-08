// Single source of truth for page-level SEO on the static pages.
// Used by the page components (via <SEO />) and by scripts/prerender-meta.mjs,
// which writes these tags into the static HTML at build time.

export const SITE_URL = 'https://jahsteel.ae'
export const SITE_NAME = 'Jazeerat Al Hadeed'
export const DEFAULT_TITLE = 'Steel Fabrication Company in Sharjah, UAE | JAH Steel'
export const DEFAULT_DESCRIPTION =
  'Structural steel fabrication, CNC cutting, welding and erection from our Sharjah workshop, serving Dubai and the UAE. Send a drawing for a quote in 24 hours.'

export const PAGE_SEO = {
  '/': {
    title: 'Structural Steel Fabrication Company in UAE | Jazeerat Al Hadeed',
    description:
      'Sharjah-based steel fabrication company: structural steel, CNC laser & plasma cutting, machining and erection across Dubai, the UAE and MENA. Quote in 24h.',
    h1: 'Structural Steel Fabrication Company in the UAE',
  },
  '/about': {
    title: 'About Jazeerat Al Hadeed | Steel Fabrication Company Sharjah',
    description:
      'Jazeerat Al Hadeed (JAH Steel) is an integrated steel fabrication and machine workshop in Sharjah, built on Carlton Steel Works, in operation since 1983.',
    h1: 'About Jazeerat Al Hadeed: Steel Fabrication Company in Sharjah',
  },
  '/services': {
    title: 'Steel Fabrication Services in Sharjah & Dubai | JAH Steel',
    description:
      'Ten in-house steel services: estimation, structural design, Tekla detailing, CNC laser cutting, fabrication, welding & QC, galvanizing and erection across the UAE.',
    h1: 'Steel Fabrication & Engineering Services in the UAE',
  },
  '/facilities': {
    title: 'Steel Fabrication Workshop in Sharjah | JAH Steel',
    description:
      'Inside our Sharjah workshop: CNC plasma and fiber laser cutting, machining, welding bays, blasting and coating, and storage for site-ready steel.',
    h1: 'Our Steel Fabrication Workshop in Sharjah',
  },
  '/projects': {
    title: 'Structural Steel Projects in UAE & Saudi Arabia | JAH Steel',
    description:
      'Steel fabrication and erection projects by Jazeerat Al Hadeed in the UAE and Saudi Arabia, from high-rise facade steel in Dubai to industrial frames in Sharjah.',
    h1: 'Steel Fabrication Projects in the UAE and Saudi Arabia',
  },
  '/blogs': {
    title: 'Steel Fabrication Guides & Insights | JAH Steel',
    description:
      'Practical guides on structural steel, fabrication, welding standards and coatings for UAE contractors, consultants and developers.',
    h1: 'Steel Fabrication Guides & Insights',
  },
  '/contact': {
    title: 'Contact JAH Steel | Steel Fabrication Quote, Sharjah',
    description:
      'Send your drawings for a steel fabrication quote within 24 hours. Workshop in Al Sajaa Industrial Area, Sharjah. Call or WhatsApp us.',
    h1: 'Request a Steel Fabrication Quote',
  },
  '/steel-fabrication-dubai': {
    title: 'Steel Fabrication Company in Dubai | JAH Steel',
    description:
      'Steel fabrication company in Dubai with a head office in Al Qusais and a 7,000 m² workshop in Sharjah. Structural steel, CNC cutting, welding and erection.',
    h1: 'Steel Fabrication Company in Dubai',
  },
}
