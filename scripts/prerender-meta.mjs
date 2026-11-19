// Post-build step: writes a static HTML file for every known route, so the
// first HTML a crawler sees already describes the right page.
//
// Why: the site is a client-rendered SPA. Without this every URL returns the
// same empty shell. Google renders JavaScript later (and less reliably), and
// Bing, AI crawlers, WhatsApp and LinkedIn previews mostly never run it.
//
// For each route this writes:
//   - <head>: title, meta description, canonical, Open Graph and JSON-LD
//   - <body>: a plain HTML version of the page (H1, intro, article text,
//     FAQs and links) inside #root. React replaces it on load, so visitors
//     see the normal app; crawlers get real content and internal links.
// It also writes:
//   - dist/sitemap.xml, rebuilt from scratch on every deploy
//   - dist/404.html, served by Vercel with a real 404 status
//   - dist/app-shell.html, a neutral shell for blog and project URLs created in
//     Supabase after the last deploy (see the rewrites in vercel.json)
//
// Vercel serves dist/about.html at /about (cleanUrls in vercel.json).

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { PAGE_SEO, SITE_URL, SITE_NAME, DEFAULT_IMAGE } from '../src/data/seo.js'
import { SERVICES } from '../src/data/services.js'
import { ORGANIZATION_SCHEMA, serviceSchemas, blogPostingSchemas, breadcrumbSchema } from '../src/data/schema.js'
import { clipText } from '../src/lib/clipText.js'
import { LOCAL_BLOGS } from '../src/data/localBlogs.js'
import { slugify } from '../src/lib/slugify.js'

const DIST = 'dist'
const template = readFileSync(join(DIST, 'index.html'), 'utf8')

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// JSON inside <script> must not be able to close the tag.
const jsonLd = (obj) =>
  `<script type="application/ld+json" data-prerender>${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`

const absolute = (url) => (!url ? undefined : url.startsWith('http') ? url : `${SITE_URL}${url}`)

// ── Head ────────────────────────────────────────────────────────────────────
// Tagged data-prerender so main.jsx can drop them once Helmet renders its own
// copies (React 19 hoists Helmet's tags instead of reusing these).
function headFor({ path, title, description, image = DEFAULT_IMAGE, type = 'website', published, schemas = [], noIndex }) {
  const url = SITE_URL + path
  const tags = [
    `<title data-prerender>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" data-prerender />`,
  ]
  if (noIndex) {
    tags.push(`<meta name="robots" content="noindex, nofollow" data-prerender />`)
  } else {
    tags.push(
      `<link rel="canonical" href="${esc(url)}" data-prerender />`,
      `<meta property="og:type" content="${type}" data-prerender />`,
      `<meta property="og:site_name" content="${esc(SITE_NAME)}" data-prerender />`,
      `<meta property="og:title" content="${esc(title)}" data-prerender />`,
      `<meta property="og:description" content="${esc(description)}" data-prerender />`,
      `<meta property="og:url" content="${esc(url)}" data-prerender />`,
      `<meta property="og:image" content="${esc(image)}" data-prerender />`,
      `<meta name="twitter:card" content="summary_large_image" data-prerender />`,
    )
    if (type === 'article' && published) {
      tags.push(`<meta property="article:published_time" content="${esc(published)}" data-prerender />`)
    }
    tags.push(jsonLd(ORGANIZATION_SCHEMA), ...schemas.map(jsonLd))
  }
  return tags.join('\n    ')
}

// ── Body ────────────────────────────────────────────────────────────────────
const NAV = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/facilities', 'Facilities'],
  ['/projects', 'Projects'],
  ['/blogs', 'Blogs'],
  ['/contact', 'Contact'],
]

const link = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`
const list = (items) => (items.length ? `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>` : '')

// Minimal styling in the site's colours, only for the moment before the app
// loads (or for anyone without JavaScript).
const STYLE =
  '<style>#prerender{font:16px/1.6 system-ui,sans-serif;color:#d6dade;background:#1a1d20;max-width:860px;margin:0 auto;padding:24px}#prerender a{color:#f26b1d}#prerender nav a{margin-right:16px}#prerender h1{font-size:2rem;line-height:1.2;color:#fff}</style>'

function bodyFor(main) {
  const nav = `<nav aria-label="Main">${NAV.map(([href, text]) => link(href, text)).join(' ')}</nav>`
  const footer =
    `<footer><p>${esc(SITE_NAME)} (JAH Steel), Al Sajaa Industrial Area, Sharjah, UAE. ` +
    `${link('tel:+971543058357', '+971 54 305 8357')} · ${link('mailto:info@jahsteel.ae', 'info@jahsteel.ae')} · ` +
    `${link('/contact', 'Request a quote')}</p></footer>`
  return `${STYLE}<div id="prerender">${nav}<main>${main}</main>${footer}</div>`
}

const section = (h, html) => (html ? `<section><h2>${esc(h)}</h2>${html}</section>` : '')

// ── Data ────────────────────────────────────────────────────────────────────
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

// On Vercel a failed Supabase fetch stops the deploy, so a build can never
// replace the live site with one that is missing every blog post and project.
// Locally it only warns. PRERENDER_FIXTURES=<dir> reads <table>.json instead,
// for testing without network access.
async function fetchTable(table, columns) {
  if (process.env.PRERENDER_FIXTURES) {
    return JSON.parse(readFileSync(join(process.env.PRERENDER_FIXTURES, `${table}.json`), 'utf8'))
  }
  const fail = (msg) => {
    if (process.env.VERCEL) throw new Error(`prerender-meta: ${msg}`)
    console.warn(`prerender-meta: ${msg}, skipping`)
    return []
  }
  const env = supabaseEnv()
  if (!env) return fail(`no Supabase credentials for ${table}`)
  try {
    const res = await fetch(`${env.url}/rest/v1/${table}?select=${columns}`, {
      headers: { apikey: env.key, Authorization: `Bearer ${env.key}` },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    return fail(`could not load ${table} (${err.message})`)
  }
}

const dbBlogs = await fetchTable('blogs', 'slug,title,excerpt,image_url,category,created_at,content')
const dbProjects = await fetchTable('projects', 'title,location,scope,description,image_url,gallery,created_at')

// Database posts win; local posts only fill in slugs the database lacks.
const blogs = [...dbBlogs, ...LOCAL_BLOGS.filter((b) => !dbBlogs.some((d) => d.slug === b.slug))].sort(
  (a, b) => new Date(b.created_at) - new Date(a.created_at),
)
const projects = dbProjects.map((p) => ({ ...p, slug: slugify(p.title) }))

const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
const day = (d) => new Date(d).toISOString().slice(0, 10)

// ── Routes ──────────────────────────────────────────────────────────────────
// Page-specific body content for the static pages listed in PAGE_SEO.
const staticExtras = {
  '/services': () =>
    section('Our services', list(SERVICES.map((s) => `${link(`/services/${s.slug}`, s.title)}: ${esc(s.metaDescription)}`))),
  '/projects': () =>
    section('Projects', list(projects.map((p) => `${link(`/projects/${p.slug}`, p.title)}, ${esc(p.location)}: ${esc(p.scope)}`))),
  '/blogs': () =>
    section(
      'Latest articles',
      list(blogs.map((b) => `${link(`/blogs/${b.slug}`, b.title)} (${fmtDate(b.created_at)}): ${esc(b.excerpt)}`)),
    ),
  '/': () =>
    section('Services', list(SERVICES.map((s) => link(`/services/${s.slug}`, s.title)))) +
    section('Latest articles', list(blogs.slice(0, 5).map((b) => link(`/blogs/${b.slug}`, b.title)))),
}

const routes = [
  ...Object.entries(PAGE_SEO).map(([path, s]) => ({
    path,
    title: s.title,
    description: s.description,
    image: absolute(s.image) || DEFAULT_IMAGE,
    schemas: path === '/' ? [] : [breadcrumbSchema([['Home', '/'], [s.h1 || s.title, path]])],
    main: `<h1>${esc(s.h1 || s.title)}</h1><p>${esc(s.description)}</p>${staticExtras[path]?.() || ''}`,
    priority: path === '/' ? '1.0' : '0.8',
    changefreq: path === '/blogs' || path === '/' ? 'weekly' : 'monthly',
    lastmod: path === '/blogs' || path === '/' ? blogs[0] && day(blogs[0].created_at) : undefined,
  })),
  ...SERVICES.map((s) => {
    const related = (s.related || [])
      .map((slug) => SERVICES.find((x) => x.slug === slug))
      .filter(Boolean)
      .map((x) => link(`/services/${x.slug}`, x.title))
    return {
      path: `/services/${s.slug}`,
      title: s.seoTitle,
      description: s.metaDescription,
      image: absolute(s.poster) || DEFAULT_IMAGE,
      schemas: serviceSchemas(s),
      main:
        `<h1>${esc(s.h1 || s.title)}</h1><p>${esc(s.intro || s.desc)}</p>` +
        section('Capabilities', list((s.capabilities || []).map(esc))) +
        (s.details || []).map((d) => section(d.heading, `<p>${esc(d.body)}</p>`)).join('') +
        section('Frequently asked questions', (s.faqs || []).map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')) +
        section('Related services', list(related)),
      priority: '0.8',
      changefreq: 'monthly',
    }
  }),
  ...blogs.map((b) => {
    const image = absolute(b.image_url) || DEFAULT_IMAGE
    const more = blogs.filter((x) => x.slug !== b.slug).slice(0, 3)
    return {
      path: `/blogs/${b.slug}`,
      title: `${b.title} | JAH Steel`,
      description: b.excerpt,
      image,
      type: 'article',
      published: b.created_at,
      schemas: blogPostingSchemas({ ...b, image_url: image }),
      // Post HTML is written by the JAH team in Supabase and is rendered the
      // same way (as HTML) by BlogPost.jsx.
      main:
        `<article><h1>${esc(b.title)}</h1><p>${esc(b.category || 'Blog')} · ${fmtDate(b.created_at)}</p>` +
        `${b.content || `<p>${esc(b.excerpt)}</p>`}</article>` +
        section('More articles', list(more.map((x) => link(`/blogs/${x.slug}`, x.title)))),
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: day(b.created_at),
    }
  }),
  ...projects.map((p) => {
    const description = p.description || p.scope
    return {
      path: `/projects/${p.slug}`,
      title: `${p.title}, ${p.location} | JAH Steel Project`,
      description: clipText(`${p.title}, ${p.location}: ${description}`),
      image: absolute(p.gallery?.[0] || p.image_url) || DEFAULT_IMAGE,
      schemas: [breadcrumbSchema([['Home', '/'], ['Projects', '/projects'], [p.title, `/projects/${p.slug}`]])],
      main: `<h1>${esc(p.title)}</h1><p>${esc(p.location)} · ${esc(p.scope)}</p><p>${esc(description)}</p>`,
      priority: '0.6',
      changefreq: 'monthly',
    }
  }),
]

function render(r) {
  // index.html carries a site-wide "index, follow"; drop it where the page sets noindex.
  const base = r.noIndex ? template.replace(/\s*<meta name="robots" content="index, follow" \/>/, '') : template
  return base
    .replace(/<title>[\s\S]*?<\/title>/, headFor(r))
    .replace('<div id="root"></div>', `<div id="root">${bodyFor(r.main)}</div>`)
}

for (const r of routes) {
  const file = r.path === '/' ? join(DIST, 'index.html') : join(DIST, `${r.path.slice(1)}.html`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, render(r))
}
console.log(`prerender-meta: wrote ${routes.length} pages`)

// Not found: Vercel serves dist/404.html with a 404 status for any path that
// has no file and no rewrite.
writeFileSync(
  join(DIST, '404.html'),
  render({
    path: '/404',
    title: 'Page Not Found | JAH Steel',
    description: 'The page you are looking for does not exist.',
    noIndex: true,
    main: `<h1>Page not found</h1><p>The page you are looking for does not exist. ${link('/', 'Go to the homepage')}.</p>`,
  }),
)

// Neutral shell (no canonical, default title) for /blogs/* and /projects/*
// URLs that were added in Supabase after this build. The app loads the post
// and sets its own tags; the next deploy prerenders it properly.
writeFileSync(join(DIST, 'app-shell.html'), template)

// Sitemap, rebuilt from the route list on every deploy.
const urls = routes
  .map(
    (r) =>
      `  <url>\n    <loc>${esc(SITE_URL + r.path)}</loc>\n` +
      (r.lastmod ? `    <lastmod>${r.lastmod}</lastmod>\n` : '') +
      `    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
  )
  .join('\n')
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
console.log(`prerender-meta: sitemap has ${routes.length} URLs`)

// Every HTML file in dist should be a known route, the 404 page or the shell.
const known = new Set(routes.map((r) => (r.path === '/' ? 'index.html' : `${r.path.slice(1)}.html`)))
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name).slice(DIST.length + 1)] : [],
  )
const stray = walk(DIST).filter((f) => !known.has(f) && !['404.html', 'app-shell.html'].includes(f) && !f.startsWith('google'))
if (stray.length) console.warn(`prerender-meta: HTML files not in the route list: ${stray.join(', ')}`)
