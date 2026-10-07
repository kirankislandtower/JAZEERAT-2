import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionLabel from './SectionLabel'

// Answers are grounded only in services and facts already published
// elsewhere on this site (Services.jsx, About.jsx, SEO.jsx) — nothing here
// is invented.
const faqs = [
  {
    q: 'What steel fabrication services does Jazeerat Al Hadeed provide?',
    a: 'Jazeerat Al Hadeed provides structural steel fabrication, steel design and detailing, CNC plasma and laser cutting, CNC machining, welding and quality control, surface finishing and steel delivery and installation, all from one integrated workshop in Sharjah, UAE.',
  },
  {
    q: 'Does Jazeerat Al Hadeed provide structural steel fabrication in Dubai?',
    a: 'Yes. Our head office is on Damascus Street in Al Qusais, Dubai, and our workshop is in Al Sajaa Industrial Area, Sharjah. We fabricate, deliver and erect structural steel for projects across Dubai. Recent Dubai work includes heavy erection and column splicing and architectural steel facade work.',
  },
  {
    q: 'Do you provide steel design and detailing?',
    a: 'Yes. Our in-house team prepares shop drawings, connection details and material take-offs before fabrication starts, so every member is checked before a single plate is cut.',
  },
  {
    q: 'Do you provide CNC plasma and laser cutting?',
    a: 'Yes. We cut structural and architectural steel plate on CNC plasma and laser systems, and we offer cutting and marking on demand.',
  },
  {
    q: 'Do you provide welding and quality control?',
    a: 'Yes. Our welders work to code and every joint is logged against our quality control record.',
  },
  {
    q: 'Do you provide steel erection and installation?',
    a: 'Yes. We coordinate transport, crane rigging and structural steel erection on site across the UAE and the MENA region, including recent work in Riyadh, Saudi Arabia.',
  },
  {
    q: 'What industries does Jazeerat Al Hadeed serve?',
    a: 'We support industrial, commercial, infrastructure and architectural projects, working with main contractors, developers, consultants and plant owners.',
  },
  {
    q: 'How do I choose a steel fabrication company in the UAE?',
    a: 'Check that the fabricator has in-house detailing, CNC cutting capacity for your plate thickness, certified welders with written QC records, coatings suited to the Gulf climate, its own erection team and recent projects similar to yours.',
  },
  {
    q: 'How quickly can I get a quote for steel fabrication?',
    a: 'Send us your drawings or specifications and we typically return a quote within 24 hours.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
}

function FaqItem({ faq, index, open, onToggle }) {
  const isOpen = open === index
  return (
    <div className="border-b border-panel-line">
      <button
        onClick={() => onToggle(isOpen ? null : index)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
      >
        <h3 className="font-display uppercase text-lg lg:text-xl text-steel-light">
          {faq.q}
        </h3>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 flex items-center justify-center w-9 h-9 border border-panel-line text-steel-light"
        >
          <Plus size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-steel text-sm lg:text-base leading-relaxed pb-6 max-w-3xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section className="py-24 lg:py-32 bg-graphite-light border-t border-panel-line">
      <script type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </script>

      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-display font-bold uppercase text-3xl lg:text-4xl text-white mt-2">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} faq={faq} index={i} open={open} onToggle={setOpen} />
          ))}
        </div>
      </div>
    </section>
  )
}
