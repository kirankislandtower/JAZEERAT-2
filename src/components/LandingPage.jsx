import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import SectionLabel from './SectionLabel'
import Cutline from './Cutline'
import SEO from './SEO'
import IslandTowerGroup from './IslandTowerGroup'
import VideoHero from './VideoHero'
import CtaBanner from './CtaBanner'
import { PAGE_SEO } from '../data/seo'
import { SERVICES } from '../data/services'
import { LANDING_PAGES, ISLAND_TOWER, faqSchema } from '../data/landingPages'

// Shared layout for the location / market landing pages
// (/steel-fabrication-dubai, /steel-structure-erection-abu-dhabi,
// /steel-fabrication-export). All copy lives in src/data/landingPages.js so
// the prerendered HTML (scripts/prerender-meta.mjs) carries the same text.

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: 'easeOut' },
  }),
}

// Highlights the parent company name the same way as elsewhere on the site.
function GroupText({ text }) {
  const parts = text.split(ISLAND_TOWER)
  return parts.map((p, i) => (
    <Fragment key={i}>
      {p}
      {i < parts.length - 1 && <IslandTowerGroup />}
    </Fragment>
  ))
}

// "Steelwork we deliver in Dubai" -> "Steelwork we deliver" + accent "in Dubai."
function SplitHeading({ text, accentWords = 2 }) {
  const words = text.split(' ')
  const head = words.slice(0, -accentWords).join(' ')
  const accent = words.slice(-accentWords).join(' ')
  return (
    <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">
      {head} <span className="text-white">{accent}.</span>
    </h2>
  )
}

function CardGrid({ items, cols = 'lg:grid-cols-3', pad = 'p-8', titleSize = 'text-xl' }) {
  return (
    <div className={`mt-8 grid sm:grid-cols-2 ${cols} gap-px bg-panel-line border border-panel-line`}>
      {items.map((r) => (
        <div key={r.title} className={`bg-graphite ${pad}`}>
          <h3 className={`font-display uppercase ${titleSize} text-steel-light`}>{r.title}</h3>
          <p className="mt-3 text-sm text-steel leading-relaxed">{r.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default function LandingPage({ path, pageKey, label, heroLine1, heroLine2, video, poster, image, imageAlt, imagePosition, primaryCta, secondaryCta, cta }) {
  const seo = PAGE_SEO[path]
  const page = LANDING_PAGES[path]

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO title={seo.title} description={seo.description} path={path} schema={faqSchema(page.faqs.items)} />

      <VideoHero pageKey={pageKey} videoSrc={video} poster={poster} image={image} imageAlt={imageAlt} imagePosition={imagePosition} showSparks={false} className="pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <SectionLabel index={label} as="h1">{seo.h1}</SectionLabel>
          </motion.div>
          <motion.p
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-steel-light"
          >
            {heroLine1}
            <br /><span className="text-white">{heroLine2}</span>
          </motion.p>
          <motion.p
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className={`mt-6 text-lg max-w-2xl font-light leading-relaxed ${image ? 'text-steel-light [text-shadow:0_1px_12px_rgba(19,21,25,0.85)]' : 'text-steel'}`}
          >
            {page.intro}
          </motion.p>
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-white text-graphite px-7 py-4 hover:bg-steel-light transition-colors"
            >
              {primaryCta} <ArrowRight size={18} />
            </NavLink>
            <NavLink
              to={secondaryCta.to}
              className="inline-flex items-center gap-2 font-display uppercase tracking-wide text-steel-light border-b border-steel pb-1 hover:text-white hover:border-white transition-colors"
            >
              {secondaryCta.label}
            </NavLink>
          </motion.div>
        </div>
      </VideoHero>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label={cta.eyebrow} />
      </div>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
          <div>
            <SplitHeading text={page.about.heading} accentWords={path === '/steel-fabrication-export' ? 2 : 3} />
            {page.about.paragraphs.map((p, i) => (
              <p key={i} className={`${i === 0 ? 'mt-6' : 'mt-4'} text-steel text-base leading-relaxed`}>
                <GroupText text={p} />
              </p>
            ))}
            {page.about.addresses && (
              <div className="mt-8 grid sm:grid-cols-2 gap-px bg-panel-line border border-panel-line">
                {page.about.addresses.map(([lbl, value]) => (
                  <address key={lbl} className="not-italic bg-graphite p-6 flex items-start gap-3">
                    <MapPin size={18} className="text-steel-light shrink-0 mt-0.5" />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-steel">{lbl}</p>
                      <p className="text-steel-light text-sm mt-1">{value}</p>
                    </div>
                  </address>
                ))}
              </div>
            )}
          </div>

          <div>
            {page.list && (
              <>
                <SplitHeading text={page.list.heading} />
                <ul className="mt-6 space-y-3 text-sm text-steel">
                  {page.list.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 bg-weld shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {page.markets && (
              <>
                <SplitHeading text={page.markets.heading} accentWords={1} />
                <div className="mt-6 grid sm:grid-cols-2 gap-px bg-panel-line border border-panel-line">
                  {page.markets.items.map((m) => (
                    <div key={m.title} className="bg-graphite p-6">
                      <h3 className="font-display uppercase text-lg text-steel-light">{m.title}</h3>
                      <p className="mt-2 text-sm text-steel leading-relaxed">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {page.process && (
        <section className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <SplitHeading text={page.process.heading} accentWords={2} />
            <CardGrid items={page.process.items.map((s, i) => ({ ...s, title: `${String(i + 1).padStart(2, '0')} · ${s.title}` }))} cols="lg:grid-cols-4" pad="p-7" titleSize="text-lg" />
          </div>
        </section>
      )}

      {page.servicesHeading && (
        <section className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <SplitHeading text={page.servicesHeading} accentWords={2} />
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-panel-line border border-panel-line">
              {SERVICES.map((s, i) => (
                <NavLink key={s.slug} to={`/services/${s.slug}`} className="bg-graphite p-7 hover:bg-panel transition-colors group block">
                  <p className="font-mono text-[10px] text-steel tracking-widest">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 font-display uppercase text-lg text-steel-light group-hover:text-white transition-colors">{s.title}</h3>
                  <p className="mt-3 font-mono text-[10px] text-steel-light uppercase tracking-widest">Details →</p>
                </NavLink>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SplitHeading text={page.reasons.heading} accentWords={path === '/steel-fabrication-export' ? 2 : 3} />
          <CardGrid items={page.reasons.items} />
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">{page.faqs.heading}</h2>
          <dl className="mt-6 border-t border-panel-line">
            {page.faqs.items.map((f) => (
              <div key={f.q} className="border-b border-panel-line py-5">
                <dt className="font-display uppercase text-base text-steel-light">{f.q}</dt>
                <dd className="mt-2 text-sm text-steel leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBanner eyebrow={cta.eyebrow} heading={cta.heading} headingAccent={cta.accent} ctaLabel="Request a Quote" />
    </motion.main>
  )
}
