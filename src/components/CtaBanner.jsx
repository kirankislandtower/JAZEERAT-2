import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Magnetic from './Magnetic'

/**
 * CtaBanner — shared bordered call-to-action panel used at the end of
 * inner pages (Services, Facilities, Projects, About). Keeps the CTA
 * treatment consistent instead of every page hand-rolling its own.
 */
export default function CtaBanner({
  eyebrow = 'Work with us',
  heading,
  headingAccent,
  body = "Send us a drawing and we'll send back a quote — typically within 24 hours.",
  ctaLabel = 'Start a Project',
  ctaTo = '/contact',
}) {
  return (
    <motion.section
      className="py-16 border-t border-panel-line"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="border border-panel-line bg-graphite-light p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          <motion.div className="absolute inset-0 border-l-2 border-weld/0 group-hover:border-weld/20 transition-colors pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-weld/0 group-hover:from-weld/[0.04] to-transparent transition-colors pointer-events-none" />

          <div className="relative">
            <p className="font-mono text-xs tracking-widest text-steel uppercase mb-2">{eyebrow}</p>
            <h3 className="font-display font-extrabold uppercase text-3xl sm:text-4xl text-steel-light leading-tight">
              {heading}{' '}
              {headingAccent && <span className="text-weld">{headingAccent}</span>}
            </h3>
            {body && (
              <p className="mt-3 text-steel text-sm max-w-md leading-relaxed">{body}</p>
            )}
          </div>

          <Magnetic>
            <NavLink
              to={ctaTo}
              className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-white text-graphite px-8 py-4 hover:bg-steel-light transition-colors"
            >
              {ctaLabel}
              <ArrowRight size={18} />
            </NavLink>
          </Magnetic>
        </div>
      </div>
    </motion.section>
  )
}
