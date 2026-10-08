import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import Cutline from '../components/Cutline'
import SEO from '../components/SEO'
import VideoHero from '../components/VideoHero'
import CtaBanner from '../components/CtaBanner'
import { PAGE_SEO } from '../data/seo'
import { SERVICES } from '../data/services'

const PATH = '/steel-fabrication-dubai'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: 'easeOut' },
  }),
}

const reasons = [
  { title: 'A Dubai head office', desc: 'Our head office is on Damascus Street in Al Qusais, so meetings, drawings and approvals are handled in Dubai.' },
  { title: 'One team, drawing to erection', desc: 'Design, detailing, supply, fabrication and on-site erection are handled by one company, with one point of contact.' },
  { title: 'A 7,000 m² workshop', desc: 'Steel is fabricated on our own shop floor in Al Sajaa Industrial Area, Sharjah, and delivered to site in Dubai.' },
  { title: 'Certified quality', desc: 'Our quality and environmental management systems are certified to ISO 9001:2015 and ISO 14001:2015.' },
  { title: 'Certified welders', desc: 'Our welders are third-party certified to 6G and are capable of argon, TIG and MIG welding.' },
  { title: 'Quotes in 24 hours', desc: 'Send us your drawings or specifications and we typically return a quote within 24 hours.' },
]

const steelwork = [
  'Structural steel frames, trusses, columns and beams',
  'Pre-engineered buildings, warehouses and factories',
  'Architectural facade steel and cladding support structures',
  'Steel staircases, handrails and balcony railings',
  'Canopies, including warehouse loading canopies',
  'Access platforms, catwalks and cage ladders',
  'Pipe support steel for district cooling plants',
  'Heavy erection, crane lifting and column splicing on site',
]

// Answers use only facts already published elsewhere on this site.
const faqs = [
  {
    q: 'Where is your office in Dubai?',
    a: 'Our head office is on Damascus Street in Al Qusais, Dubai. Our fabrication workshop is in Al Sajaa Industrial Area, Sharjah.',
  },
  {
    q: 'Where is the steel for Dubai projects fabricated?',
    a: 'In our own 7,000 m² workshop in Al Sajaa Industrial Area, Sharjah. Fabricated steel is then delivered to your site in Dubai, in phases that match your erection sequence.',
  },
  {
    q: 'Do you install steel on site in Dubai?',
    a: 'Yes. Our own on-site erection and installation team installs the steel we fabricate, including crane lifting, bolting and site welding.',
  },
  {
    q: 'Which steel fabrication services do you offer in Dubai?',
    a: `All ${SERVICES.length} of our services: ${SERVICES.map((s) => s.title).join(', ')}.`,
  },
  {
    q: 'How quickly can I get a quote for a Dubai project?',
    a: 'Send us your drawings or specifications and we typically return a quote within 24 hours.',
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

export default function DubaiSteelFabrication() {
  const seo = PAGE_SEO[PATH]
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO title={seo.title} description={seo.description} path={PATH} schema={faqJsonLd} />

      <VideoHero
        pageKey="dubai"
        videoSrc="/assets/services-hero.mp4"
        poster="/assets/assetsJazeerat/sobha-one-element-tower-dubai.webp"
        showSparks={false}
        className="pt-40 pb-20 lg:pt-48 lg:pb-28"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <SectionLabel index="DUBAI" as="h1">{seo.h1}</SectionLabel>
          </motion.div>
          <motion.p
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-steel-light"
          >
            Dubai office.
            <br /><span className="text-white">Sharjah workshop.</span>
          </motion.p>
          <motion.p
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="mt-6 text-lg text-steel max-w-2xl font-light leading-relaxed"
          >
            Jazeerat Al Hadeed is a steel fabrication company with its head office in Al Qusais, Dubai.
            We design, detail, fabricate and erect structural steel for contractors and developers
            across Dubai, with fabrication carried out in our own workshop in Sharjah.
          </motion.p>
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-white text-graphite px-7 py-4 hover:bg-steel-light transition-colors"
            >
              Request a Quote <ArrowRight size={18} />
            </NavLink>
            <NavLink
              to="/projects"
              className="inline-flex items-center gap-2 font-display uppercase tracking-wide text-steel-light border-b border-steel pb-1 hover:text-white hover:border-white transition-colors"
            >
              See Our Projects
            </NavLink>
          </motion.div>
        </div>
      </VideoHero>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Steel Fabrication in Dubai" />
      </div>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">
              Structural steel fabrication <span className="text-white">for Dubai projects.</span>
            </h2>
            <p className="mt-6 text-steel text-base leading-relaxed">
              Dubai projects move quickly, and steel that arrives late or does not fit holds up every trade behind it.
              We keep design, detailing, cutting, fabrication, welding, finishing and erection inside one company,
              so drawings go straight to the workshop and one team stays responsible until handover.
            </p>
            <p className="mt-4 text-steel text-base leading-relaxed">
              Our recent Dubai work includes heavy steel erection and column splicing, architectural facade steel
              and warehouse loading canopies. We are part of Island Tower Electromechanical Works LLC, and we
              have more than 30 years of steel fabrication experience behind us.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-px bg-panel-line border border-panel-line">
              {[
                ['Head Office', 'Damascus Street, Al Qusais, Dubai, UAE'],
                ['Workshop', 'Al Sajaa Industrial Area, Sharjah, UAE'],
              ].map(([label, value]) => (
                <address key={label} className="not-italic bg-graphite p-6 flex items-start gap-3">
                  <MapPin size={18} className="text-steel-light shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-steel">{label}</p>
                    <p className="text-steel-light text-sm mt-1">{value}</p>
                  </div>
                </address>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">
              Steelwork we deliver <span className="text-white">in Dubai.</span>
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-steel">
              {steelwork.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 bg-weld shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">
            Our steel fabrication services <span className="text-white">in Dubai.</span>
          </h2>
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

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">
            Why Dubai contractors <span className="text-white">work with us.</span>
          </h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-panel-line border border-panel-line">
            {reasons.map((r) => (
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
            Steel fabrication in Dubai: FAQs
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
        eyebrow="Steel fabrication in Dubai"
        heading="Have a Dubai project?"
        headingAccent="Send us the drawings."
        ctaLabel="Request a Quote"
      />
    </motion.main>
  )
}
