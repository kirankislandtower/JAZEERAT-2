import { Helmet } from 'react-helmet-async'
import { SITE_URL, SITE_NAME, DEFAULT_TITLE } from '../data/seo'
const DEFAULT_IMAGE = `${SITE_URL}/assets/assetsJazeerat/sobha-one-element-tower-dubai.webp`

const JSONLD_ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  legalName: 'Jazeerat Al Hadeed Metalic Cont Ind LLC',
  parentOrganization: { '@type': 'Organization', name: 'Island Tower Electromechanical Works LLC' },
  alternateName: 'JAHSTEEL',
  foundingDate: '2019',
  description:
    'Steel fabrication and machine workshop in Al Sajaa Industrial Area, Sharjah, delivering structural steel fabrication, CNC cutting, welding, finishing and erection across the UAE and the MENA region.',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  image: DEFAULT_IMAGE,
  telephone: '+971 54 305 8357',
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

/**
 * SEO component — add to the top of every page component.
 *
 * Props:
 *  - title       : Page title (without site name suffix)
 *  - description : Meta description (150–160 chars ideal)
 *  - path        : URL path e.g. '/about' (default: '')
 *  - image       : OG image URL (default: slide-1)
 *  - noIndex     : Set true to block indexing (e.g. thank-you pages)
 *  - schema      : Extra JSON-LD object(s) for this page (FAQPage, Service…)
 */
export default function SEO({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  noIndex = false,
  schema,
}) {
  // If the title already spells out the brand name (e.g. "About Jazeerat Al
  // Hadeed | ..."), use it exactly as given instead of appending the brand
  // suffix a second time.
  const fullTitle = title
    ? (title.includes(SITE_NAME) || title.includes('JAH Steel') ? title : `${title} | ${SITE_NAME}`)
    : DEFAULT_TITLE
  const canonicalUrl = `${SITE_URL}${path}`
  const extraSchemas = schema ? (Array.isArray(schema) ? schema : [schema]) : []

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Open Graph (Facebook / LinkedIn / WhatsApp) ── */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_AE" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ── Geo targeting (MENA) ── */}
      <meta name="geo.region" content="AE-SH" />
      <meta name="geo.placename" content="Sharjah" />
      <meta name="geo.country" content="UAE" />

      {/* ── JSON-LD Structured Data ── */}
      <script type="application/ld+json">
        {JSON.stringify(JSONLD_ORGANIZATION)}
      </script>
      {extraSchemas.map((obj, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>
      ))}
    </Helmet>
  )
}
