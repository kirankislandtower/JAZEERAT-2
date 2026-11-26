// Single source of truth for page-level SEO on the static pages.
// Used by the page components (via <SEO />) and by scripts/prerender-meta.mjs,
// which writes these tags into the static HTML at build time.

export const SITE_URL = 'https://jahsteel.ae'
export const SITE_NAME = 'Jazeerat Al Hadeed'
// Short brand used at the end of page titles: "<Page> | JAH Steel".
export const TITLE_BRAND = 'JAH Steel'
export const DEFAULT_IMAGE = `${SITE_URL}/assets/assetsJazeerat/sobha-one-element-tower-dubai.webp`
export const DEFAULT_TITLE = 'Steel Fabrication Company in Sharjah, UAE | JAH Steel'
export const DEFAULT_DESCRIPTION =
  'Structural steel fabrication, CNC cutting, welding and erection from our Sharjah workshop, serving Dubai and the UAE. Send a drawing for a quote in 24 hours.'

export const PAGE_SEO = {
  '/': {
    title: 'Structural Steel Fabrication in UAE | Jazeerat Al Hadeed',
    description:
      'Sharjah-based steel fabrication company: structural steel, CNC laser & plasma cutting, machining and erection across Dubai, the UAE and MENA. Quote in 24h.',
    h1: 'Structural Steel Fabrication Company in the UAE',
  },
  '/about': {
    title: 'About Jazeerat Al Hadeed | Steel Fabrication Company Sharjah',
    description:
      'Jazeerat Al Hadeed (JAH Steel) is an integrated steel fabrication and machine workshop in Sharjah, built on Carlton Steel Works, in operation since 1983.',
    h1: 'About Jazeerat Al Hadeed: Steel Fabrication Company in Sharjah',
    image: '/assets/timeline-growth.webp',
  },
  '/services': {
    title: 'Steel Fabrication Services in Sharjah & Dubai | JAH Steel',
    description:
      'Ten in-house services: estimation, design, Tekla detailing, CNC laser cutting, fabrication, welding & QC, galvanizing and erection across the UAE.',
    h1: 'Steel Fabrication & Engineering Services in the UAE',
    image: '/assets/assetsJazeerat/IMG_9087.webp',
  },
  '/facilities': {
    title: 'Steel Fabrication Workshop in Sharjah | JAH Steel',
    description:
      'Our 7,000 m² steel workshop in Al Sajaa, Sharjah: CNC plasma and fiber laser cutting, machining, welding bays, blasting and coating. Visits welcome.',
    h1: 'Our Steel Fabrication Workshop in Sharjah',
    image: '/assets/assetsJazeerat/IMG_8972.webp',
  },
  '/projects': {
    title: 'Structural Steel Projects in UAE & Saudi Arabia | JAH Steel',
    description:
      'Steel fabrication and erection projects in the UAE and Saudi Arabia, from high-rise facade steel in Dubai to industrial frames in Sharjah.',
    h1: 'Steel Fabrication Projects in the UAE and Saudi Arabia',
    image: '/assets/project-sobha-rendering.webp',
  },
  '/blogs': {
    title: 'Steel Fabrication Guides & Insights | JAH Steel',
    description:
      'Practical guides on structural steel, fabrication, welding standards and coatings for UAE contractors, consultants and developers.',
    h1: 'Steel Fabrication Guides & Insights',
    image: '/assets/assetsJazeerat/IMG_8960.webp',
  },
  '/contact': {
    title: 'Contact JAH Steel | Steel Fabrication Quote, Sharjah',
    description:
      'Send your drawings for a steel fabrication quote within 24 hours. Workshop in Al Sajaa Industrial Area, Sharjah. Call or WhatsApp us.',
    h1: 'Request a Steel Fabrication Quote',
    image: '/assets/team-in-jah-uniform.webp',
  },
  '/steel-fabrication-dubai': {
    title: 'Steel Fabrication Company in Dubai | JAH Steel',
    description:
      'Steel fabrication company in Dubai, head office in Al Qusais, 7,000 m² workshop in Sharjah. Structural steel, CNC cutting and erection. Quote in 24 hours.',
    h1: 'Steel Fabrication Company in Dubai',
  },
  '/steel-fabrication-export': {
    title: 'Steel Fabrication Export from the UAE | JAH Steel',
    description:
      'Structural steel fabricated in Sharjah and exported to the USA, India, Africa and the GCC, by routes that avoid the Strait of Hormuz. Quote in 24 hours.',
    h1: 'Steel Fabrication Export from the UAE',
    image: '/assets/assetsJazeerat/mild-steel-fabrication-works.webp',
  },
  '/steel-structure-erection-abu-dhabi': {
    title: 'Steel Structure Erection in Abu Dhabi | JAH Steel',
    description:
      'Steel structure erection in Abu Dhabi: fabricated in our Sharjah workshop, delivered in phases and installed by our own crews. Quote in 24 hours.',
    h1: 'Steel Structure Erection in Abu Dhabi',
    image: '/assets/assetsJazeerat/IMG_9087.webp',
  },
}

// Search results cut titles at roughly 60 characters. Append the brand only
// when it still fits; otherwise the page's own title carries the keywords.
export const withBrand = (title, max = 60) =>
  `${title} | ${TITLE_BRAND}`.length <= max ? `${title} | ${TITLE_BRAND}` : title
