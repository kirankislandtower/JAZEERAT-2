import { useParams, NavLink, Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  PenTool, Wrench, Ruler, ShieldCheck, Flame, Boxes, Truck, Factory,
  ArrowLeft, CheckCircle2, Cpu, Activity, AlertTriangle
} from 'lucide-react'
import SEO from '../components/SEO'
import VideoHero from '../components/VideoHero'
import Cutline from '../components/Cutline'
import SectionLabel from '../components/SectionLabel'
import { SERVICES_BY_SLUG, SERVICE_SLUG_ALIASES } from '../data/services'
import { SITE_URL } from '../data/seo'

const ICONS = { ruler: Ruler, pen: PenTool, factory: Factory, wrench: Wrench, flame: Flame, boxes: Boxes, shield: ShieldCheck, truck: Truck }

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const detail = SERVICES_BY_SLUG[slug]

  // Old URLs renamed for SEO → send to the new page (Vercel also 301s these).
  if (!detail && SERVICE_SLUG_ALIASES[slug]) {
    return <Navigate to={`/services/${SERVICE_SLUG_ALIASES[slug]}`} replace />
  }

  if (!detail) {
    return (
      <motion.main
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <SEO title="Service Not Found | Jazeerat Al Hadeed" description="The service page you are looking for does not exist." noIndex />

        <div className="absolute inset-0 bp-grid opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-10 text-center flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full border border-white/10 bg-white/5 text-white mb-8">
            <AlertTriangle size={32} />
          </div>
          <p className="font-mono text-sm tracking-[0.3em] text-white uppercase mb-4">Error 404</p>
          <h1 className="font-display font-extrabold uppercase text-4xl sm:text-5xl text-steel-light leading-[0.95] mb-6">
            Service Not Found.
          </h1>
          <p className="text-steel text-lg font-light leading-relaxed max-w-md mx-auto mb-10">
            The service page you are looking for does not exist or has been relocated.
          </p>
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center justify-center gap-3 bg-white text-graphite font-display uppercase font-semibold tracking-wide px-8 py-4 text-sm hover:bg-steel-light transition-colors w-full sm:w-auto"
          >
            <ArrowLeft size={18} /> Back to Services
          </button>
        </div>
      </motion.main>
    )
  }

  const Icon = ICONS[detail.icon] || Factory
  const pageUrl = `${SITE_URL}/services/${slug}`
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: detail.title,
      serviceType: detail.title,
      description: detail.metaDescription,
      url: pageUrl,
      areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
      provider: { '@type': 'LocalBusiness', name: 'Jazeerat Al Hadeed', url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: detail.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <SEO
        title={detail.seoTitle}
        description={detail.metaDescription}
        path={`/services/${slug}`}
        schema={schema}
      />

      <VideoHero
        videoSrc={detail.video}
        poster={detail.poster}
        showSparks={slug === 'welding-qc' || slug === 'design-detailing'}
        className="pt-40 pb-20 lg:pt-48 lg:pb-28"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white hover:opacity-80 transition-opacity mb-8 border border-white/10 bg-graphite/40 px-3 py-1.5 backdrop-blur-sm"
          >
            <ArrowLeft size={12} /> Back to Services
          </button>
          
          <SectionLabel index={detail.group.toUpperCase()}>{detail.label}</SectionLabel>
          <div className="flex items-center gap-4 mb-4">
            <span className="flex h-14 w-14 items-center justify-center border border-white/10 bg-white/5 text-white shrink-0">
              <Icon size={26} strokeWidth={1.5} />
            </span>
            <h1 className="font-display font-extrabold uppercase text-3xl sm:text-5xl lg:text-6xl leading-[0.95] text-steel-light">
              {detail.h1}
            </h1>
          </div>
          <p className="mt-6 text-base sm:text-lg text-steel max-w-2xl font-light leading-relaxed">
            {detail.intro}
          </p>
        </div>
      </VideoHero>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label={detail.title} />
      </div>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* LEFT: Specs Sidebar (40% width) */}
          <div className="w-full lg:w-[40%] flex flex-col gap-8">
            
            {/* Tech Specs Card */}
            <div className="border border-panel-line bg-graphite p-8 shadow-lg shadow-black/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-steel-light" />
              <div className="flex items-center gap-2 mb-6">
                <Activity size={16} className="text-steel-light" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-steel-light">Technical Specifications</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-steel">Standard Capability</p>
                  <p className="text-steel-light text-sm font-semibold mt-1">{detail.spec}</p>
                </div>
                <div className="h-px bg-panel-line" />
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-steel">Design & Code Standard</p>
                  <p className="text-steel-light text-sm font-semibold mt-1">{detail.standards}</p>
                </div>
                <div className="h-px bg-panel-line" />
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-steel">Quality Check</p>
                  <p className="text-steel-light text-sm font-semibold mt-1">ISO 9001:2015 Certified Quality System</p>
                </div>
              </div>
            </div>

            {/* Machinery / Capacity list */}
            <div className="border border-panel-line bg-graphite p-8 shadow-lg shadow-black/20">
              <div className="flex items-center gap-2 mb-6">
                <Cpu size={16} className="text-steel-light" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-steel-light">Machinery & Capacity</h3>
              </div>
              
              <ul className="space-y-5">
                {detail.machinery.map((m) => (
                  <li key={m.name} className="flex flex-col">
                    <span className="text-sm font-bold text-steel-light">{m.name}</span>
                    <span className="text-xs text-steel mt-1 leading-relaxed">{m.cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Detailed scope (60% width) */}
          <div className="w-full lg:w-[60%] flex flex-col gap-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-steel-light">Overview</span>
              <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl text-steel-light mt-3 mb-6">
                {detail.overviewHeading}
              </h2>
              <p className="text-steel text-base leading-relaxed pl-6 border-l-2 border-weld/30">
                {detail.overview}
              </p>
            </div>

            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-steel-light">What's Included</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {detail.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3 border border-panel-line bg-graphite/40 p-4">
                    <CheckCircle2 size={16} className="text-steel-light shrink-0 mt-0.5" />
                    <span className="text-sm text-steel-light leading-relaxed">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display font-extrabold uppercase text-2xl md:text-3xl text-steel-light">
                {detail.title} FAQs
              </h2>
              <dl className="mt-6 border-t border-panel-line">
                {detail.faqs.map((f) => (
                  <div key={f.q} className="border-b border-panel-line py-5">
                    <dt className="font-display uppercase text-base text-steel-light">{f.q}</dt>
                    <dd className="mt-2 text-sm text-steel leading-relaxed">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-steel-light">Related Services</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {detail.related.map((r) => SERVICES_BY_SLUG[r] && (
                  <NavLink
                    key={r}
                    to={`/services/${r}`}
                    className="inline-flex items-center gap-2 border border-panel-line px-4 py-2.5 text-sm text-steel-light hover:border-white/50 hover:text-white transition-colors"
                  >
                    {SERVICES_BY_SLUG[r].title} →
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="border border-panel-line bg-graphite-light p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-6">
              <div>
                <p className="font-display uppercase text-lg text-steel-light">Have a project drawing?</p>
                <p className="text-xs text-steel mt-1">Get an accurate cost estimation in 24 hours.</p>
              </div>
              <NavLink
                to="/contact"
                className="inline-flex items-center gap-2 font-display uppercase font-semibold text-xs bg-white/5 border border-panel-line text-white px-6 py-3.5 hover:bg-white/10 transition-colors shrink-0"
              >
                Send Us Drawing
              </NavLink>
            </div>
          </div>

        </div>
      </section>
    </motion.main>
  )
}
