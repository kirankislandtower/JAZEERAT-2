import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import Cutline from '../components/Cutline'
import SEO from '../components/SEO'
import IslandTowerGroup from '../components/IslandTowerGroup'
import VideoHero from '../components/VideoHero'
import CtaBanner from '../components/CtaBanner'
import { PAGE_SEO } from '../data/seo'

const PATH = '/steel-fabrication-export'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: 'easeOut' },
  }),
}

// Markets named by JAH management (Oct 2026). Saudi Arabia is already
// published elsewhere on the site as a market we have supplied.
const markets = [
  { name: 'United States', desc: 'Fabricated structural steel for projects in the USA.' },
  { name: 'India', desc: 'Structural and custom steel fabrication for Indian projects.' },
  { name: 'Africa', desc: 'Steel packages for industrial and commercial projects across Africa.' },
  { name: 'Saudi Arabia & GCC', desc: 'We have supplied fabricated steel to Saudi Arabia, including work in Riyadh.' },
]

// Each point restates capabilities already published on the site.
const exportReady = [
  { title: 'Drawings shared before cutting', desc: 'Our in-house team details every steel package in Tekla Structures and AutoCAD, and shop drawings are approved before fabrication starts, wherever the project is.' },
  { title: 'Fabricated to international codes', desc: 'Welding is carried out by certified welders to AWS D1.1 and ASME Section IX, with UT, MT, PT and RT testing available.' },
  { title: 'Quality records with the steel', desc: 'Our quality and environmental management systems are certified to ISO 9001:2015 and ISO 14001:2015, and welds are logged against our quality control records.' },
  { title: 'Protected for the journey', desc: 'Sandblasting, industrial painting, protective coatings and galvanizing protect steel against corrosion, in transit and on site.' },
  { title: 'One team, one contact', desc: 'Estimation, detailing, fabrication, finishing and dispatch are handled by one company, so you deal with one point of contact for the whole package.' },
  { title: 'Alternative shipping routes', desc: 'We use alternative routes for sending materials that do not pass through the Strait of Hormuz.' },
]

const faqs = [
  {
    q: 'Do you export fabricated steel outside the UAE?',
    a: 'Yes. We fabricate structural and custom steel in our workshop in Al Sajaa Industrial Area, Sharjah, and our systems are set up to export it to markets including the USA, India and Africa, as well as Saudi Arabia and the GCC.',
  },
  {
    q: 'Do your shipments go through the Strait of Hormuz?',
    a: 'No. We use alternative routes for sending materials that do not pass through the Strait of Hormuz.',
  },
  {
    q: 'Which standards do you fabricate to for export projects?',
    a: 'Our welders are certified to AWS D1.1 and ASME Section IX, and our quality and environmental management systems are certified to ISO 9001:2015 and ISO 14001:2015. Tell us the specification for your project and we will confirm it before quoting.',
  },
  {
    q: 'Can you work from our drawings and specifications?',
    a: 'Yes. Send us your drawings, models or specifications. Our detailing team prepares shop drawings in Tekla Structures and AutoCAD for your approval before fabrication starts.',
  },
  {
    q: 'How do I get a quote for an export project?',
    a: 'Send us your drawings or specifications and the delivery location. We typically return a quote within 24 hours.',
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

export default function ExportSteelFabrication() {
  const seo = PAGE_SEO[PATH]
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO title={seo.title} description={seo.description} path={PATH} schema={faqJsonLd} />

      <VideoHero
        pageKey="export"
        videoSrc="/assets/services-hero.mp4"
        poster="/assets/project-truss-install.webp"
        showSparks={false}
        className="pt-40 pb-20 lg:pt-48 lg:pb-28"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <SectionLabel index="EXPORT" as="h1">{seo.h1}</SectionLabel>
          </motion.div>
          <motion.p
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-steel-light"
          >
            Fabricated in Sharjah.
            <br /><span className="text-white">Shipped worldwide.</span>
          </motion.p>
          <motion.p
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="mt-6 text-lg text-steel max-w-2xl font-light leading-relaxed"
          >
            Jazeerat Al Hadeed fabricates structural and custom steel in its workshop in Al Sajaa Industrial Area,
            Sharjah, and exports it to projects in the USA, India, Africa and across the GCC.
          </motion.p>
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-white text-graphite px-7 py-4 hover:bg-steel-light transition-colors"
            >
              Request an Export Quote <ArrowRight size={18} />
            </NavLink>
            <NavLink
              to="/services"
              className="inline-flex items-center gap-2 font-display uppercase tracking-wide text-steel-light border-b border-steel pb-1 hover:text-white hover:border-white transition-colors"
            >
              See Our Services
            </NavLink>
          </motion.div>
        </div>
      </VideoHero>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Steel Fabrication Export" />
      </div>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">
              Steel fabrication <span className="text-white">for export.</span>
            </h2>
            <p className="mt-6 text-steel text-base leading-relaxed">
              Our systems are set up to export. The same team that details, fabricates, welds and finishes steel
              for UAE projects prepares steel packages for clients abroad, with shop drawings approved before
              cutting and quality records kept for every piece.
            </p>
            <p className="mt-4 text-steel text-base leading-relaxed">
              We use alternative routes for sending materials that do not pass through the Strait of Hormuz.
              We are part of <IslandTowerGroup />, with more than 30 years of steel fabrication experience behind us.
            </p>
          </div>

          <div>
            <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">
              Where we <span className="text-white">export.</span>
            </h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-px bg-panel-line border border-panel-line">
              {markets.map((m) => (
                <div key={m.name} className="bg-graphite p-6">
                  <h3 className="font-display uppercase text-lg text-steel-light">{m.name}</h3>
                  <p className="mt-2 text-sm text-steel leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">
            Set up <span className="text-white">to export.</span>
          </h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-panel-line border border-panel-line">
            {exportReady.map((r) => (
              <div key={r.title} className="bg-graphite p-8">
                <h3 className="font-display uppercase text-xl text-steel-light">{r.title}</h3>
                <p className="mt-3 text-sm text-steel leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">
            Steel fabrication export: FAQs
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
        eyebrow="Steel fabrication export"
        heading="Have a project abroad?"
        headingAccent="Send us the drawings."
        ctaLabel="Request a Quote"
      />
    </motion.main>
  )
}
