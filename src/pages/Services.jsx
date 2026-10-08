import { motion } from 'framer-motion'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Factory, Wrench, Ruler, ShieldCheck, Flame, Boxes, Truck, PenTool,
} from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import Cutline from '../components/Cutline'
import SEO from '../components/SEO'
import VideoHero from '../components/VideoHero'
import CtaBanner from '../components/CtaBanner'
import { SERVICES, SERVICE_GROUPS } from '../data/services'
import { PAGE_SEO } from '../data/seo'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: 'easeOut' },
  }),
}

// Answers use only facts already published on the homepage and service pages.
const faqs = [
  {
    q: 'What steel fabrication services do you offer?',
    a: `We offer ${SERVICES.length} in-house services: ${SERVICES.map((s) => s.title).join(', ')}.`,
  },
  {
    q: 'Where do you deliver and install steel?',
    a: 'We fabricate in our Sharjah workshop and deliver and erect structural steel across Dubai and the UAE, and support projects across the MENA region.',
  },
  {
    q: 'What do you need from me to prepare a quote?',
    a: 'Send us your drawings or specifications and tell us which services you need. We typically return a quote within 24 hours.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const ICONS = { ruler: Ruler, pen: PenTool, factory: Factory, wrench: Wrench, flame: Flame, boxes: Boxes, shield: ShieldCheck, truck: Truck }

export default function Services() {
  const [filter, setFilter] = useState('all')
  const seo = PAGE_SEO['/services']
  const groups = SERVICE_GROUPS.filter((g) => filter === 'all' || g.key === filter)
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO
        title={seo.title}
        description={seo.description}
        path="/services"
        schema={faqJsonLd}
      />

      <VideoHero
        pageKey="services"
        videoSrc="/assets/services-hero.mp4"
        poster="/assets/assetsJazeerat/mild-steel-fabrication-works.webp"
        showSparks={false}
        className="pt-40 pb-20 lg:pt-48 lg:pb-28"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <SectionLabel index="SERVICES" as="h1">{seo.h1}</SectionLabel>
          </motion.div>
          <motion.p
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-steel-light"
          >
            Every stage,
            <br /><span className="text-white">one workshop.</span>
          </motion.p>
          <motion.p
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="mt-6 text-lg text-steel max-w-2xl font-light leading-relaxed"
          >
            From estimation and design to cutting, welding, coating and erection, every stage
            of your steel package is handled in our Sharjah workshop. One team, one schedule
            and one QC record, with no outsourcing between stages.
          </motion.p>
        </div>
      </VideoHero>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Service Index" />
      </div>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-3 mb-10">
            {[{ key: 'all', label: 'All' }, ...SERVICE_GROUPS].map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                aria-pressed={filter === c.key}
                className={`font-mono text-xs uppercase tracking-widest px-4 py-2.5 border transition-colors ${filter === c.key ? 'bg-white text-graphite border-white' : 'border-panel-line text-steel hover:border-white/50 hover:text-white'}`}
              >
                {c.label}
              </button>
            ))}
          </div>
          {groups.map((g) => (
            <div key={g.key} className="mb-14 last:mb-0">
              <h2 className="font-display uppercase tracking-[0.15em] text-lg text-steel-light mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-steel-light" />
                {g.label}
              </h2>
              <div className="grid sm:grid-cols-2 gap-px bg-panel-line border border-panel-line sm:[&>*:last-child:nth-child(odd)]:col-span-2">
                {SERVICES.filter((s) => s.group === g.key).map((s, i) => {
                  const Icon = ICONS[s.icon] || Factory
                  const n = SERVICES.indexOf(s) + 1
                  return (
                    <NavLink
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="bg-graphite p-10 hover:bg-panel transition-colors group block relative"
                    >
                      <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} custom={i % 4} variants={fadeUp}
                      >
                        <div className="flex items-start justify-between mb-6">
                          <Icon size={30} className="text-steel-light" strokeWidth={1.5} />
                          <span className="font-mono text-[10px] text-steel tracking-widest">
                            {String(n).padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className="font-display uppercase text-2xl text-steel-light mb-3 group-hover:text-white transition-colors">
                          {s.title}
                        </h3>
                        <p className="text-steel text-sm leading-relaxed mb-4">{s.desc}</p>

                        <div className="flex items-center justify-between border-t border-panel-line pt-4 mt-6">
                          <span className="font-mono text-[11px] text-steel/80 uppercase tracking-wide">
                            {s.spec}
                          </span>
                          <span className="font-mono text-[10px] text-steel-light group-hover:text-white uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-all">
                            Details →
                          </span>
                        </div>
                      </motion.div>
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">
            Why use one workshop for every stage?
          </h2>
          <p className="mt-5 text-steel text-base leading-relaxed">
            Every handover between subcontractors adds time and risk. When detailing, cutting,
            welding and coating happen in one facility, drawings go straight to the CNC machines,
            quality control follows each piece from cut to dispatch, and you deal with one point
            of contact for the whole steel package.
          </p>
          <p className="mt-4 text-steel text-base leading-relaxed">
            Working on a project in Dubai? See our{' '}
            <NavLink to="/steel-fabrication-dubai" className="text-steel-light underline underline-offset-4 hover:text-white transition-colors">
              steel fabrication company in Dubai
            </NavLink>{' '}
            page.
          </p>

          <h2 className="mt-16 font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">
            Steel fabrication services FAQs
          </h2>
          <dl className="mt-6 border-t border-panel-line">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-panel-line py-5">
                <dt className="font-display uppercase text-base text-steel-light">{f.q}</dt>
                <dd className="mt-2 text-sm text-steel leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBanner
        heading="Send us a drawing."
        headingAccent="We'll send back a quote."
        ctaLabel="Request a Quote"
      />
    </motion.main>
  )
}
