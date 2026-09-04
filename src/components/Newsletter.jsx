import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

/**
 * Newsletter — shared subscribe block used at the foot of the blog
 * listing and individual post pages, so both share one design and
 * one (eventual) submit implementation instead of two hand-copies.
 */
export default function Newsletter() {
  return (
    <section className="py-24 lg:py-32 bg-graphite relative overflow-hidden border-t border-panel-line">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,47,34,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          custom={0} variants={fadeUp}
          className="inline-flex items-center justify-center w-16 h-16 bg-graphite border border-panel-line mb-8"
        >
          <Mail size={24} className="text-white" />
        </motion.div>

        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
          className="font-display font-extrabold uppercase text-4xl lg:text-5xl text-steel-light mb-6"
        >
          Get the latest <span className="text-white">insights.</span>
        </motion.h2>

        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
          className="text-steel max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Subscribe to our newsletter for technical breakdowns, industry news, and inside looks at major MENA infrastructure projects.
        </motion.p>

        <motion.form
          initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp}
          className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4"
          onSubmit={(e) => { e.preventDefault(); alert('Subscribed!') }}
        >
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="flex-1 bg-graphite-light border border-panel-line focus:border-weld outline-none px-6 py-4 text-steel-light placeholder:text-steel/50 font-mono text-sm"
          />
          <button
            type="submit"
            className="font-display uppercase tracking-wide font-semibold bg-white text-graphite px-8 py-4 hover:bg-steel-light transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  )
}
