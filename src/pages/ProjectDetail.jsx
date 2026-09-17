import { useState, useEffect } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Layers, Home, Truck, ShieldCheck, Factory, ArrowLeft, MapPin, AlertTriangle } from 'lucide-react'
import SEO from '../components/SEO'
import SectionLabel from '../components/SectionLabel'
import Cutline from '../components/Cutline'
import CtaBanner from '../components/CtaBanner'
import { supabase } from '../lib/supabase'
import { slugify } from '../lib/slugify'

const iconMap = { Factory, Home, Truck, ShieldCheck, Layers }

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProject() {
      try {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: true })
        if (!error && data) {
          const match = data.find((p) => slugify(p.title) === slug)
          setProject(match || null)
        }
      } catch {
        setProject(null)
      }
      setLoading(false)
    }
    loadProject()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-graphite flex items-center justify-center">
        <span className="font-mono text-steel uppercase tracking-widest text-sm">Loading Project...</span>
      </div>
    )
  }

  if (!project) {
    return (
      <motion.main
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <SEO title="Project Not Found | Jazeerat Al Hadeed" description="The project page you are looking for does not exist." noIndex />
        <div className="absolute inset-0 bp-grid opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-10 text-center flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full border border-white/10 bg-white/5 text-white mb-8">
            <AlertTriangle size={32} />
          </div>
          <p className="font-mono text-sm tracking-[0.3em] text-white uppercase mb-4">Error 404</p>
          <h1 className="font-display font-extrabold uppercase text-4xl sm:text-5xl text-steel-light leading-[0.95] mb-6">
            Project Not Found.
          </h1>
          <p className="text-steel text-lg font-light leading-relaxed max-w-md mx-auto mb-10">
            The project page you are looking for does not exist or has been moved.
          </p>
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center justify-center gap-3 bg-white text-graphite font-display uppercase font-semibold tracking-wide px-8 py-4 text-sm hover:bg-steel-light transition-colors w-full sm:w-auto"
          >
            <ArrowLeft size={18} /> Back to Projects
          </button>
        </div>
      </motion.main>
    )
  }

  const Icon = iconMap[project.icon] || Layers
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image_url]
  const description = project.description || project.scope

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jahsteel.ae/' },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://jahsteel.ae/projects' },
      { '@type': 'ListItem', position: 3, name: project.title, item: `https://jahsteel.ae/projects/${slug}` },
    ],
  }

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO
        title={`${project.title} | Steel Fabrication Project`}
        description={`${project.title} — ${description} Delivered by Jazeerat Al Hadeed in ${project.location}.`}
        path={`/projects/${slug}`}
        image={gallery[0]?.startsWith('http') ? gallery[0] : `https://jahsteel.ae${gallery[0]}`}
      />

      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>

      <section className="pt-40 pb-16 lg:pt-48 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-steel">
              <li><NavLink to="/" className="hover:text-white transition-colors">Home</NavLink></li>
              <li aria-hidden>/</li>
              <li><NavLink to="/projects" className="hover:text-white transition-colors">Projects</NavLink></li>
              <li aria-hidden>/</li>
              <li className="text-steel-light truncate max-w-[200px]">{project.title}</li>
            </ol>
          </nav>

          <SectionLabel index="PROJECT">Case Study</SectionLabel>
          <div className="flex items-center gap-3 mt-4 mb-4">
            <span className="flex h-12 w-12 items-center justify-center border border-panel-line bg-white/5 text-white shrink-0">
              <Icon size={22} strokeWidth={1.5} />
            </span>
            <h1 className="font-display font-extrabold uppercase text-3xl sm:text-5xl lg:text-6xl leading-[0.95] text-steel-light">
              {project.title}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-steel text-sm font-mono uppercase tracking-widest">
            <MapPin size={14} className="text-steel-light" />
            {project.location}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Project Gallery" />
      </div>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10">
          <div className="grid grid-cols-2 gap-3">
            {gallery.map((img, i) => (
              <img
                key={img + i}
                src={img}
                alt={`${project.title} — ${project.location} steel fabrication project, image ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                className={`w-full object-cover border border-panel-line ${i === 0 && gallery.length > 1 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
              />
            ))}
          </div>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-steel-light mb-3">Scope of Work</h2>
            <p className="text-steel text-base leading-relaxed pl-6 border-l-2 border-weld/30 mb-10">
              {project.scope}
            </p>

            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-steel-light mb-3">Project Overview</h2>
            <p className="text-steel text-base leading-relaxed mb-10">
              {description}
            </p>

            <div className="border border-panel-line bg-graphite-light p-8 flex flex-col gap-4">
              <h3 className="font-display uppercase text-lg text-steel-light">Explore Related Work</h3>
              <NavLink to="/services" className="text-steel-light hover:text-white transition-colors text-sm font-mono uppercase tracking-widest">
                Explore our structural steel fabrication services →
              </NavLink>
              <NavLink to="/projects" className="text-steel-light hover:text-white transition-colors text-sm font-mono uppercase tracking-widest">
                Browse the full project gallery →
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Have a similar project?"
        headingAccent="Let's talk."
        ctaLabel="Contact Us"
      />
    </motion.main>
  )
}
