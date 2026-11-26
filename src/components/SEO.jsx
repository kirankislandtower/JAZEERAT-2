import { Helmet } from 'react-helmet-async'
import { SITE_URL, SITE_NAME, TITLE_BRAND, DEFAULT_TITLE, DEFAULT_IMAGE, PAGE_SEO, withBrand } from '../data/seo'
import { ORGANIZATION_SCHEMA } from '../data/schema'


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
  // Static pages can set their own share image in PAGE_SEO (src/data/seo.js).
  image = PAGE_SEO[path]?.image ? `${SITE_URL}${PAGE_SEO[path].image}` : DEFAULT_IMAGE,
  noIndex = false,
  schema,
  type = 'website',
  publishedTime,
}) {
  // If the title already spells out the brand name (e.g. "About Jazeerat Al
  // Hadeed | ..."), use it exactly as given instead of appending the brand
  // suffix a second time.
  const fullTitle = title
    ? (title.includes(SITE_NAME) || title.includes(TITLE_BRAND) ? title : withBrand(title))
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
      <meta property="og:type" content={type} />
      {type === 'article' && publishedTime && <meta property="article:published_time" content={publishedTime} />}
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
        {JSON.stringify(ORGANIZATION_SCHEMA)}
      </script>
      {extraSchemas.map((obj, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>
      ))}
    </Helmet>
  )
}
