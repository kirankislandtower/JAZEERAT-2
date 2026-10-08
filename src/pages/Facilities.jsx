import { motion } from 'framer-motion'
import { Factory, Wrench, ShieldCheck, Truck, Boxes, Flame } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import Cutline from '../components/Cutline'
import SEO from '../components/SEO'
import { PAGE_SEO } from '../data/seo'
import VideoHero from '../components/VideoHero'
import CtaBanner from '../components/CtaBanner'

const facilities = [
  {
    icon: Factory,
    title: 'CNC Plasma Cutting',
    desc: 'High-capacity plate cutting for structural steel profiles and architectural components.',
    image: '/assets/assetsJazeerat/IMG_9079.webp',
  },
  {
    icon: Flame,
    title: 'CNC Laser & Fiber Cutting',
    desc: 'Fine-detail cutting for precision work, openings, and intricate fabrication pieces.',
    image: '/assets/assetsJazeerat/IMG_9084.webp',
  },
  {
    icon: Wrench,
    title: 'CNC Machine Workshop',
    desc: 'Drilling, boring, and machining with digital tolerance control in one facility.',
    image: '/assets/assetsJazeerat/IMG_9087.webp',
  },
  {
    icon: ShieldCheck,
    title: 'Welding Bays',
    desc: 'Dedicated welding stations with third-party certified 6G welders and multi-process capability.',
    image: '/assets/assetsJazeerat/2. site photos /IMG_5998.webp',
  },
  {
    icon: Boxes,
    title: 'Surface Finishing',
    desc: 'Shot blasting, priming, painting and protective coating optimised for MENA climates.',
    image: '/assets/assetsJazeerat/2. site photos /IMG_4981.webp',
  },
  {
    icon: Truck,
    title: 'Logistics & Storage',
    desc: 'Site-ready staging, secure storage and coordinated transport from the workshop.',
    image: '/assets/assetsJazeerat/IMG_8609.webp',
  },
]

const delivers = [
  'Design, detailing, supply, fabrication and on-site erection of heavy and light steel structures',
  'Pre-engineered buildings (PEBs) and hot rolled steel structures',
  'Warehouses, factories, showrooms, cold stores and data centres',
  'Storage tanks, silos and pressure vessels',
  'Pipeline and pipe support works for district cooling plants',
  'Loading platforms, MEP platforms, riser frames and handrails',
  'Industrial gratings and sub-station fabrication and installation',
  'Filter housings and skids for pumps and filter systems',
  'Sheet metal works',
  'General machining: lathe, milling, drilling, rolling, bending, pressing, shearing and CNC work',
  'Hot-dip galvanizing, sandblasting and spray painting',
]

const machinery = [
  'Steel rolling machines',
  'Lathe machine',
  'Milling machines',
  'Pipe bending machines',
  'MIG welding machines',
  'Arc welding machines',
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: 'easeOut' },
  }),
}

export default function Facilities() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO
        title={PAGE_SEO['/facilities'].title}
        description={PAGE_SEO['/facilities'].description}
        path="/facilities"
      />
      <VideoHero
        pageKey="facilities"
        videoSrc="/assets/facilities-hero.mp4"
        poster="/assets/assetsJazeerat/IMG_8960.webp"
        showSparks={false}
        className="pt-40 pb-20 lg:pt-48 lg:pb-28"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <SectionLabel index="FACILITIES" as="h1">{PAGE_SEO['/facilities'].h1}</SectionLabel>
          <motion.p initial="hidden" animate="visible" custom={0} variants={fadeUp}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-steel-light"
          >
            Built for precision, capacity and speed.
          </motion.p>
          <motion.p initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="mt-8 max-w-2xl text-steel text-base leading-relaxed"
          >
            Our 7,000 m² shop floor in Al Sajaa Industrial Area, Sharjah brings cutting, machining, welding, blasting, coating and dispatch under one roof, so steel moves from raw stock to site-ready assemblies without leaving the facility.
          </motion.p>
        </div>
      </VideoHero>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Facility Highlights" />
      </div>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10">
          <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">Inside our workshop</h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, i) => {
            const Icon = facility.icon
            return (
              <motion.div key={facility.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} custom={i} variants={fadeUp}
                className="border border-panel-line bg-graphite p-8 hover:border-weld transition-colors"
              >
                <div className="mb-6 overflow-hidden">
                  <img src={facility.image} alt={`${facility.title} at Jazeerat Al Hadeed workshop, Sharjah`} loading="lazy" className="h-40 w-full object-cover" />
                </div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-steel-light">Facility</p>
                    <h3 className="mt-3 font-display text-2xl uppercase text-steel-light">{facility.title}</h3>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center bg-white/5 border border-panel-line text-white shrink-0">
                    <Icon size={24} />
                  </span>
                </div>
                <p className="text-steel text-sm leading-relaxed">{facility.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">What our workshop delivers</h2>
            <ul className="mt-6 space-y-3 text-sm text-steel">
              {delivers.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 bg-weld shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">Workshop machinery</h2>
            <ul className="mt-6 grid sm:grid-cols-2 gap-px bg-panel-line border border-panel-line">
              {machinery.map((m) => (
                <li key={m} className="bg-graphite p-5 font-display uppercase text-sm text-steel-light">{m}</li>
              ))}
            </ul>

            <h2 className="mt-12 font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">Quality on the shop floor</h2>
            <p className="mt-5 text-steel text-sm leading-relaxed">
              Quality control runs through every process. Raw materials, tools and consumables come from verified
              suppliers, and our quality control engineer inspects materials before production starts. An in-house
              maintenance technician inspects our machinery, tools and equipment on a periodic programme. Our quality
              management system is certified to ISO 9001:2015.
            </p>
            <p className="mt-4 text-steel text-sm leading-relaxed">
              Clients are welcome to visit the workshop and see our processes first-hand.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Visit the workshop"
        headingAccent="or request a tour."
        ctaLabel="Schedule a Tour"
      />
    </motion.main>
  )
}
