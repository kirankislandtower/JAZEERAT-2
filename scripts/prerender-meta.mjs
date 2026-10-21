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

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { PAGE_SEO, SITE_URL, SITE_NAME } from '../src/data/seo.js'
import { SERVICES } from '../src/data/services.js'
import { LOCAL_BLOGS } from '../src/data/localBlogs.js'
import { slugify } from '../src/lib/slugify.js'

const DIST = 'dist'
const DEFAULT_IMAGE = `${SITE_URL}/assets/assetsJazeerat/sobha-one-element-tower-dubai.webp`
const template = readFileSync(join(DIST, 'index.html'), 'utf8')

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Tagged data-prerender so the app can drop them once Helmet renders its own
// copies (React 19 hoists Helmet's tags instead of reusing these).
function headFor({ path, title, description, image = DEFAULT_IMAGE }) {
  const url = SITE_URL + path
  return [
    `<title data-prerender>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" data-prerender />`,
    `<link rel="canonical" href="${esc(url)}" data-prerender />`,
    `<meta property="og:type" content="website" data-prerender />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" data-prerender />`,
    `<meta property="og:title" content="${esc(title)}" data-prerender />`,
    `<meta property="og:description" content="${esc(description)}" data-prerender />`,
    `<meta property="og:url" content="${esc(url)}" data-prerender />`,
    `<meta property="og:image" content="${esc(image)}" data-prerender />`,
    `<meta name="twitter:card" content="summary_large_image" data-prerender />`,
  ].join('\n    ')
}

const absolute = (url) => (!url ? undefined : url.startsWith('http') ? url : `${SITE_URL}${url}`)

// Supabase credentials come from the build environment (Vercel project env
// vars). Locally, fall back to .env.local so `npm run build` behaves the same.
function supabaseEnv() {
  let url = process.env.VITE_SUPABASE_URL
  let key = process.env.VITE_SUPABASE_ANON_KEY
  if ((!url || !key) && existsSync('.env.local')) {
    for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
      const m = line.match(/^\s*(VITE_SUPABASE_URL|VITE_SUPABASE_ANON_KEY)\s*=\s*"?([^"\s]+)"?/)
      if (m && m[1] === 'VITE_SUPABASE_URL') url ||= m[2]
      if (m && m[1] === 'VITE_SUPABASE_ANON_KEY') key ||= m[2]
    }
  }
  return url && key ? { url, key } : null
}

// Blog posts and projects live in Supabase, so their pages are prerendered
// from the database. If it can't be reached, the build still succeeds and
// those pages fall back to the client-rendered head.
async function fetchTable(table, columns) {
  const env = supabaseEnv()
  if (!env) {
    console.warn(`prerender-meta: no Supabase credentials, skipping ${table}`)
    return []
  }
  try {
    const res = await fetch(`${env.url}/rest/v1/${table}?select=${columns}`, {
      headers: { apikey: env.key, Authorization: `Bearer ${env.key}` },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn(`prerender-meta: could not load ${table} (${err.message}), skipping`)
    return []
  }
}

const dbBlogs = await fetchTable('blogs', 'slug,title,excerpt,image_url')
const dbProjects = await fetchTable('projects', 'title,location,scope,description,image_url,gallery')

// Database posts win; local posts only fill in slugs the database lacks.
const blogs = [...dbBlogs, ...LOCAL_BLOGS.filter((b) => !dbBlogs.some((d) => d.slug === b.slug))]

// Titles and descriptions match what ProjectDetail.jsx and BlogPost.jsx set at runtime.
const routes = [
  ...Object.entries(PAGE_SEO).map(([path, s]) => ({ path, title: s.title, description: s.description })),
  ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, title: s.seoTitle, description: s.metaDescription })),
  ...blogs.map((b) => ({
    path: `/blogs/${b.slug}`,
    title: `${b.title} | Jazeerat Al Hadeed Insights`,
    description: b.excerpt,
    image: absolute(b.image_url),
  })),
  ...dbProjects.map((p) => ({
    path: `/projects/${slugify(p.title)}`,
    title: `${p.title}, ${p.location} | JAH Steel Project`,
    description: `${p.title} — ${p.description || p.scope} Delivered by Jazeerat Al Hadeed in ${p.location}.`,
    image: absolute(p.gallery?.[0] || p.image_url),
  })),
]

for (const r of routes) {
  const html = template.replace(/<title>[\s\S]*?<\/title>/, headFor(r))
  const file = r.path === '/' ? join(DIST, 'index.html') : join(DIST, `${r.path.slice(1)}.html`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

console.log(`prerender-meta: wrote ${routes.length} pages`)

// New posts and projects added in Supabase are appended to the sitemap, so it
// doesn't need editing by hand each time.
const sitemapFile = join(DIST, 'sitemap.xml')
if (existsSync(sitemapFile)) {
  let sitemap = readFileSync(sitemapFile, 'utf8')
  const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))
  const today = new Date().toISOString().slice(0, 10)
  const missing = routes
    .filter((r) => r.path.startsWith('/blogs/') || r.path.startsWith('/projects/'))
    .map((r) => SITE_URL + r.path)
    .filter((loc) => !listed.has(loc))
  if (missing.length) {
    const entries = missing
      .map((loc) => `  <url>\n    <loc>${esc(loc)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`)
      .join('\n')
    sitemap = sitemap.replace('</urlset>', `${entries}\n</urlset>`)
    writeFileSync(sitemapFile, sitemap)
  }
  console.log(`prerender-meta: sitemap has ${listed.size + missing.length} URLs (${missing.length} added)`)
}
