import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   VARIANT 1 — Logo Splash
   Full dark screen, JAH logo animates in, red progress bar,
   then the whole thing fades out.
───────────────────────────────────────────────────────────── */
function V1_LogoSplash({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 2000
    const raf = (t) => {
      const p = Math.min((t - start) / duration, 1)
      setProgress(Math.round(p * 100))
      if (p < 1) requestAnimationFrame(raf)
      else setTimeout(onDone, 500)
    }
    requestAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0d0f13] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-4"
      >
        <img src="/favicon.png" alt="JAH Logo" className="w-16 h-16 object-contain" />
        <div className="text-center">
          <p className="font-display font-bold uppercase text-white text-xl tracking-[0.3em]">JAZEERAT AL HADEED</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 mt-1">Metallic Cont Ind LLC</p>
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <motion.div
          className="h-[2px] bg-[#d62f22]"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'linear', duration: 0.1 }}
        />
      </div>

      {/* Progress number */}
      <motion.p
        className="absolute bottom-6 right-8 font-mono text-[11px] text-white/30 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {String(progress).padStart(3, '0')}%
      </motion.p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   VARIANT 2 — Cinema Curtain Wipe
   Two black panels (top & bottom) slide apart revealing the site.
───────────────────────────────────────────────────────────── */
function V2_CurtainWipe({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      <>
        {/* Top panel */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-[9999] bg-[#0d0f13] flex items-end justify-center pb-8"
          style={{ height: '50vh' }}
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          exit={{}}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <img src="/favicon.png" alt="JAH" className="w-8 h-8 object-contain opacity-80" />
            <span className="font-display uppercase text-white/80 text-sm tracking-[0.35em]">JAZEERAT AL HADEED</span>
          </motion.div>
        </motion.div>

        {/* Bottom panel */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#0d0f13]"
          style={{ height: '50vh' }}
          initial={{ y: 0 }}
          animate={{ y: '100%' }}
          exit={{}}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Center divider line */}
        <motion.div
          className="fixed top-1/2 left-0 right-0 z-[10000] h-px bg-[#d62f22]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{ duration: 1.4, times: [0, 0.3, 0.6, 1], delay: 0.1 }}
        />
      </>
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────────────────────────
   VARIANT 3 — Counter Preloader
   Giant percentage counter counts from 0 to 100, then wipes.
───────────────────────────────────────────────────────────── */
function V3_Counter({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 2200
    const raf = (t) => {
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 100))
      if (p < 1) requestAnimationFrame(raf)
      else setTimeout(onDone, 400)
    }
    requestAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0d0f13] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Giant number */}
      <motion.p
        className="font-display font-extrabold text-[22vw] leading-none text-white/[0.04] select-none absolute"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2 }}
      >
        {String(count).padStart(3, '0')}
      </motion.p>

      {/* Foreground counter */}
      <div className="relative z-10 text-center">
        <motion.p
          key={count}
          className="font-display font-bold text-[6rem] leading-none text-white tabular-nums"
        >
          {count}
          <span className="text-[#d62f22] text-5xl">%</span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <img src="/favicon.png" alt="JAH" className="w-10 h-10 mx-auto mt-6 mb-2 object-contain opacity-60" />
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/30">Loading Experience</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   VARIANT 4 — Brand Name Reveal (Typewriter)
   "JAZEERAT AL HADEED" types out letter by letter on dark screen.
───────────────────────────────────────────────────────────── */
function V4_Typewriter({ onDone }) {
  const brand = 'JAZEERAT AL HADEED'
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('typing') // typing | hold | done

  useEffect(() => {
    if (phase === 'typing') {
      if (displayed.length < brand.length) {
        const t = setTimeout(() => {
          setDisplayed(brand.slice(0, displayed.length + 1))
        }, 70)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('done'), 600)
        return () => clearTimeout(t)
      }
    }
    if (phase === 'done') {
      const t = setTimeout(onDone, 700)
      return () => clearTimeout(t)
    }
  }, [displayed, phase, onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0d0f13] flex flex-col items-center justify-center"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.6em] text-white/30 mb-6">Established 2019 · Dubai, UAE</p>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-[0.12em] uppercase min-w-[20ch] text-center">
          {displayed}
          <span className="inline-block w-[3px] h-[1em] bg-[#d62f22] ml-1 align-middle animate-pulse" />
        </h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: displayed.length / brand.length }}
          className="mt-8 h-px bg-[#d62f22] origin-left"
          transition={{ ease: 'linear', duration: 0.07 }}
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/20 mt-3">Metallic Cont Ind LLC</p>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   VARIANT 5 — Welding Spark Intro
   Animated sparks particle burst on dark screen, then fades.
───────────────────────────────────────────────────────────── */
function Spark({ x, y, angle, speed, size, delay }) {
  return (
    <motion.div
      className="absolute rounded-full bg-[#d62f22]"
      style={{ width: size, height: size, left: '50%', top: '50%' }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos(angle) * speed * 120,
        y: Math.sin(angle) * speed * 120,
        opacity: 0,
        scale: 0,
      }}
      transition={{ duration: 0.9 + Math.random() * 0.6, delay, ease: 'easeOut' }}
    />
  )
}

function V5_WeldingSpark({ onDone }) {
  const sparks = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      angle: (Math.PI * 2 * i) / 40 + Math.random() * 0.4,
      speed: 0.5 + Math.random() * 1.2,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 0.3,
    }))
  )

  useEffect(() => {
    const t = setTimeout(onDone, 2400)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0d0f13] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Spark origin flash */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-white"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 6, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
      />

      {/* Sparks */}
      <div className="absolute inset-0 pointer-events-none">
        {sparks.current.map((s) => (
          <Spark key={s.id} {...s} />
        ))}
      </div>

      {/* Glow burst */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(214,47,34,0.35) 0%, transparent 70%)' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2.5, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 1.2, delay: 0.1 }}
      />

      {/* Logo & brand */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-10 text-center"
      >
        <img src="/favicon.png" alt="JAH" className="w-14 h-14 mx-auto mb-4 object-contain" />
        <p className="font-display uppercase font-bold text-white text-lg tracking-[0.3em]">JAZEERAT AL HADEED</p>
        <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-[#d62f22] mt-1">Steel · Fabrication · GCC</p>
      </motion.div>

      {/* Ember trail dots */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#d62f22]"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], y: [-20, 20] }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.1, repeat: 1 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN PRELOADER — pick the active variant via ACTIVE_VARIANT
   Change this number (1–5) to switch between them
───────────────────────────────────────────────────────────── */
const ACTIVE_VARIANT = 2

const VARIANTS = {
  1: V1_LogoSplash,
  2: V2_CurtainWipe,
  3: V3_Counter,
  4: V4_Typewriter,
  5: V5_WeldingSpark,
}

export default function Preloader({ onDone }) {
  const [show, setShow] = useState(true)

  const handleDone = () => {
    setShow(false)
    setTimeout(onDone, 800)
  }

  const Variant = VARIANTS[ACTIVE_VARIANT]

  return (
    <AnimatePresence mode="wait">
      {show && <Variant key="preloader" onDone={handleDone} />}
    </AnimatePresence>
  )
}
