// JSON-LD structured data shared by the React pages (via <SEO schema>) and by
// scripts/prerender-meta.mjs, which writes the same objects into the static
// HTML so crawlers that don't run JavaScript still see them.
// Plain JS only (no JSX): the build script imports this file under Node.

import { SITE_URL, SITE_NAME, DEFAULT_IMAGE } from './seo.js'

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  legalName: 'Jazeerat Al Hadeed Metalic Cont Ind LLC',
  parentOrganization: { '@type': 'Organization', name: 'Island Tower Group' },
  alternateName: 'JAHSTEEL',
  foundingDate: '2019',
  description:
    'Steel fabrication and machine workshop in Al Sajaa Industrial Area, Sharjah, delivering structural steel fabrication, CNC cutting, welding, finishing and erection across the UAE and the MENA region.',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  image: DEFAULT_IMAGE,
  telephone: '+971 54 305 8357',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '18:00',
    },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:30', closes: '14:00' },
  ],
  contactPoint: [
    { '@type': 'ContactPoint', telephone: '+971 54 305 8357', contactType: 'sales' },
    { '@type': 'ContactPoint', telephone: '+971 55 145 3288', contactType: 'sales' },
  ],
  email: 'info@jahsteel.ae',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Al Sajaa Industrial Area',
    postOfficeBoxNumber: '61204',
    addressLocality: 'Sharjah',
    addressRegion: 'Sharjah',
    addressCountry: 'AE',
  },
  // The workshop above is the primary address; the head office is listed as
  // a second location.
  location: [
    {
      '@type': 'Place',
      name: 'Jazeerat Al Hadeed Head Office',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Damascus Street, Al Qusais',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Saudi Arabia' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Steel Fabrication Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Structural Steel Fabrication' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Steel Detailing & Shop Drawings' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CNC Laser & Plasma Cutting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Welding & Quality Control' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Surface Finishing & Galvanizing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Steel Erection & Installation' } },
    ],
  },
  sameAs: [
    'https://www.linkedin.com/company/jahsteel/',
  ],
}

const absolute = (url) => (!url ? undefined : url.startsWith('http') ? url : `${SITE_URL}${url}`)

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  }
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function serviceSchemas(detail) {
  const url = `${SITE_URL}/services/${detail.slug}`
  const list = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: detail.title,
      serviceType: detail.title,
      description: detail.metaDescription,
      url,
      areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
      provider: { '@type': 'LocalBusiness', name: SITE_NAME, url: SITE_URL },
    },
    breadcrumbSchema([['Home', '/'], ['Services', '/services'], [detail.title, `/services/${detail.slug}`]]),
  ]
  if (detail.faqs?.length) list.push(faqSchema(detail.faqs))
  return list
}

export function blogPostingSchemas(post) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: absolute(post.image_url),
      datePublished: post.created_at,
      mainEntityOfPage: `${SITE_URL}/blogs/${post.slug}`,
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
    breadcrumbSchema([['Home', '/'], ['Blogs', '/blogs'], [post.title, `/blogs/${post.slug}`]]),
  ]
}
