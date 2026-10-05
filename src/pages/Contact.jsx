import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ArrowUpRight, Check, MessageCircle } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import SEO from '../components/SEO'
import { PAGE_SEO } from '../data/seo'
import VideoHero from '../components/VideoHero'
import { supabase } from '../lib/supabase'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const inputClass =
  'w-full bg-transparent border-b border-panel-line focus:border-weld outline-none py-3 text-steel-light placeholder:text-steel/60 transition-colors'

// Area-level map searches until exact Google Maps pins are supplied.
const LOCATIONS = [
  { label: 'Head Office', address: 'Damascus Street, Al Qusais, Dubai, UAE', query: 'Damascus Street, Al Qusais, Dubai, UAE' },
  { label: 'Workshop', address: 'Al Sajaa Industrial Area, Sharjah, UAE', query: 'Al Sajaa Industrial Area, Sharjah, UAE' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('enquiries').insert([
        {
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.phone ? `Phone / WhatsApp: ${form.phone}\n\n${form.message}` : form.message
        }
      ])

      if (!error) {
        setSent(true)
      } else {
        console.error(error)
        alert("Something went wrong saving to database. Please try again.")
      }
    } catch (err) {
      console.error(err)
      alert("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO
        title={PAGE_SEO['/contact'].title}
        description={PAGE_SEO['/contact'].description}
        path="/contact"
      />

      <VideoHero
        pageKey="contact"
        videoSrc="/assets/contact-hero.mp4"
        poster="/assets/assetsJazeerat/IMG_8971.webp"
        showSparks={false}
        className="pt-40 pb-20 lg:pt-48 lg:pb-24"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <SectionLabel index="CONTACT" as="h1">{PAGE_SEO['/contact'].h1}</SectionLabel>
          </motion.div>
          <motion.p
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-steel-light"
          >
            Tell us what
            <br />you're <span className="text-white">building.</span>
          </motion.p>
          <motion.p
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="mt-6 text-lg text-steel max-w-2xl font-light leading-relaxed"
          >
            Send us your drawings and project details. Our estimation team replies with a quote,
            typically within 24 hours.
          </motion.p>
        </div>
      </VideoHero>

      <section id="contact-form" className="pb-28 lg:pb-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-5 gap-16">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="lg:col-span-3"
          >
            {sent ? (
              <div className="border border-panel-line p-10 flex flex-col items-start gap-4">
                <span className="w-12 h-12 flex items-center justify-center bg-white/5 border border-panel-line text-white">
                  <Check size={24} />
                </span>
                <h3 className="font-display uppercase text-2xl text-steel-light">Request received</h3>
                <p className="text-steel text-sm leading-relaxed max-w-sm">
                  Thanks — our team will review your spec and get back to you shortly with
                  next steps and a quote.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="font-mono text-[11px] text-steel uppercase tracking-widest">Name <span className="text-weld">*</span></label>
                    <input
                      required name="name" value={form.name} onChange={handleChange}
                      placeholder="Your full name" className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] text-steel uppercase tracking-widest">Email <span className="text-weld">*</span></label>
                    <input
                      required type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="you@company.com" className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[11px] text-steel uppercase tracking-widest">Phone / WhatsApp <span className="text-steel/50 normal-case">(optional)</span></label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+971 ..." className={inputClass}
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-steel uppercase tracking-widest">Company <span className="text-steel/50 normal-case">(optional)</span></label>
                  <input
                    name="company" value={form.company} onChange={handleChange}
                    placeholder="Company / contractor name" className={inputClass}
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-steel uppercase tracking-widest">Project details <span className="text-weld">*</span></label>
                  <textarea
                    required rows={5} name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us about scope, materials, tolerances and timeline"
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-white text-graphite px-8 py-4 hover:bg-steel-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                  {!isSubmitting && <ArrowUpRight size={18} />}
                </button>
              </form>
            )}

            <div className="mt-14 border border-panel-line p-8">
              <h2 className="font-display uppercase text-2xl text-steel-light">What to send for a fast quote</h2>
              <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-steel">
                {[
                  'Drawings or specifications (PDF, DWG or IFC)',
                  'Steel grade, if specified',
                  'Approximate tonnage or quantities',
                  'Finish required (paint system or galvanizing)',
                  'Site location',
                  'Required delivery date',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 bg-weld shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: MapPin, label: 'Head Office', value: 'Damascus Street, Al Qusais, Dubai, UAE', link: null },
              { icon: MapPin, label: 'Workshop', value: 'P.O. Box 61204, Al Sajaa Industrial Area, Sharjah, UAE', link: null },
              { icon: MessageCircle, label: 'WhatsApp', value: '+971 54 305 8357', link: 'https://wa.me/971543058357' },
              { icon: Phone, label: 'Phone', value: '+971 54 305 8357', link: 'tel:+971543058357' },
              { icon: Phone, label: 'Phone 2', value: '+971 55 145 3288', link: 'tel:+971551453288' },
              { icon: Mail, label: 'Email', value: 'info@jahsteel.ae', link: 'mailto:info@jahsteel.ae' },
              { icon: Clock, label: 'Hours', value: 'Sat – Thu, 07:00 – 18:00', link: null },
            ].map((c) => {
              const content = (
                <>
                  <c.icon size={22} className="text-steel-light shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-steel">{c.label}</p>
                    <p className="text-steel-light mt-1 group-hover:text-white transition-colors">{c.value}</p>
                  </div>
                </>
              )

              return c.link ? (
                <a
                  key={c.label}
                  href={c.link}
                  target={c.link.startsWith('http') ? '_blank' : undefined}
                  rel={c.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group border border-panel-line p-6 flex items-start gap-4 hover:border-weld/50 transition-colors block cursor-pointer"
                >
                  {content}
                </a>
              ) : (
                <div key={c.label} className="group border border-panel-line p-6 flex items-start gap-4 hover:border-weld/50 transition-colors">
                  {content}
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="font-display font-extrabold uppercase text-3xl lg:text-4xl text-steel-light">Find us</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {LOCATIONS.map((l) => (
              <div key={l.label} className="border border-panel-line">
                <iframe
                  title={`Map: ${l.label}, ${l.address}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(l.query)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-64 border-0 grayscale"
                />
                <div className="p-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-steel">{l.label}</p>
                    <p className="text-steel-light mt-1">{l.address}</p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.query)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-steel-light hover:text-white transition-colors"
                  >
                    Open in Maps →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  )
}
