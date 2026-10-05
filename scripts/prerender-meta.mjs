// Post-build step: writes a copy of dist/index.html for every known route with
// that page's own <title>, meta description, canonical and Open Graph tags.
//
// Why: the site is a client-rendered SPA, so without this every URL returns the
// same HTML head. Google renders JavaScript later (and less reliably), and
// WhatsApp, LinkedIn and most link previewers never run it at all. With these
// files, the first HTML any crawler sees already describes the right page.
//
// Vercel serves dist/about.html at /about (cleanUrls in vercel.json) before the
// SPA rewrite kicks in; the React app then hydrates as normal.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { PAGE_SEO, SITE_URL, SITE_NAME } from '../src/data/seo.js'
import { SERVICES } from '../src/data/services.js'
import { LOCAL_BLOGS } from '../src/data/localBlogs.js'

const DIST = 'dist'
const DEFAULT_IMAGE = `${SITE_URL}/assets/assetsJazeerat/sobha-one-element-tower-dubai.webp`
const template = readFileSync(join(DIST, 'index.html'), 'utf8')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function headFor({ path, title, description, image = DEFAULT_IMAGE }) {
  const url = SITE_URL + path
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" data-rh="true" />`,
    `<link rel="canonical" href="${esc(url)}" data-rh="true" />`,
    `<meta property="og:type" content="website" data-rh="true" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" data-rh="true" />`,
    `<meta property="og:title" content="${esc(title)}" data-rh="true" />`,
    `<meta property="og:description" content="${esc(description)}" data-rh="true" />`,
    `<meta property="og:url" content="${esc(url)}" data-rh="true" />`,
    `<meta property="og:image" content="${esc(image)}" data-rh="true" />`,
    `<meta name="twitter:card" content="summary_large_image" data-rh="true" />`,
  ].join('\n    ')
}

const routes = [
  ...Object.entries(PAGE_SEO).map(([path, s]) => ({ path, title: s.title, description: s.description })),
  ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, title: s.seoTitle, description: s.metaDescription })),
  ...LOCAL_BLOGS.map((b) => ({
    path: `/blogs/${b.slug}`,
    title: `${b.title} | Jazeerat Al Hadeed Insights`,
    description: b.excerpt,
    image: b.image_url?.startsWith('http') ? b.image_url : `${SITE_URL}${b.image_url}`,
  })),
]

for (const r of routes) {
  const html = template.replace(/<title>[\s\S]*?<\/title>/, headFor(r))
  const file = r.path === '/' ? join(DIST, 'index.html') : join(DIST, `${r.path.slice(1)}.html`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

console.log(`prerender-meta: wrote ${routes.length} pages`)
