import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight, ChevronsDown } from 'lucide-react'

const HeroVideo = ({ src, isActive, isAdjacent, animate, transition, style }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.playsInline = true

    let isMounted = true

    const attemptPlay = () => {
      if (!isMounted || !video) return
      if (isActive) {
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Video play interrupted or waiting for buffer:', err)
          })
        }
      } else {
        video.pause()
      }
    }

    if (isActive) {
      attemptPlay()
    } else {
      video.pause()
    }

    const handleCanPlay = () => {
      if (isActive && isMounted) {
        attemptPlay()
      }
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleCanPlay)

    return () => {
      isMounted = false
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', handleCanPlay)
    }
  }, [isActive, src])

  if (!isActive && !isAdjacent) return null

  return (
    <motion.video
      ref={videoRef}
      src={src}
      className="w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      animate={animate}
      transition={transition}
      style={style}
    />
  )
}

export default function SlidingHero({ slides }) {
  const allSlides = slides || []
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const startX = useRef(0)
  const isPointerDown = useRef(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  useEffect(() => {
    if (isPaused || allSlides.length <= 1) return undefined
    const t = setInterval(() => setIndex(i => (i + 1) % allSlides.length), 6000)
    return () => clearInterval(t)
  }, [isPaused, allSlides.length])

  const go = i => setIndex((i + allSlides.length) % allSlides.length)

  function handlePointerDown(e) {
    isPointerDown.current = true
    setIsPaused(true)
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0
  }
  function handlePointerUp(e) {
    if (!isPointerDown.current) return
    isPointerDown.current = false
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0
    const dx = endX - startX.current
    if (dx > 60) go(index - 1)
    else if (dx < -60) go(index + 1)
    setTimeout(() => setIsPaused(false), 1200)
  }
  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1) }
    if (e.key === ' ') { e.preventDefault(); setIsPaused(p => !p) }
  }

  if (allSlides.length === 0) return null

  return (
    <section
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero carousel"
      tabIndex={0}
      className="relative w-full min-h-[99vh] max-h-screen overflow-hidden bg-graphite select-none"
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* ═══════════════════════════════════════════
          LAYER 1 — Fullscreen Background Video/Image
      ═══════════════════════════════════════════ */}
      {allSlides.map((s, i) => {
        const isVideoSlide = (
          s.type === 'video' ||
          s.src?.toLowerCase().includes('.mp4') ||
          s.src?.toLowerCase().includes('.webm') ||
          s.src?.toLowerCase().includes('/videos/')
        )
        const fallbackPoster = s.poster || s.image || '/assets/assetsJazeerat/sobha-one-element-tower-dubai.webp'

        return (
          <motion.div
            key={i}
            className={`absolute inset-0 ${i === index ? 'z-10' : 'z-0'}`}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ scale: i === index ? bgScale : 1 }}
          >
            {isVideoSlide && !isMobile ? (
              <HeroVideo
                src={s.src}
                isActive={i === index}
                isAdjacent={Math.abs(i - index) === 1 || (index === 0 && i === allSlides.length - 1) || (index === allSlides.length - 1 && i === 0)}
                animate={i === index ? { scale: [1, 1.05] } : { scale: 1 }}
                transition={{ duration: 6.5, ease: 'easeOut' }}
              />
            ) : (
              <motion.img
                src={isVideoSlide ? fallbackPoster : s.src}
                alt={s.caption}
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={i === 0 ? 'high' : 'auto'}
                animate={i === index ? { scale: [1, 1.05] } : { scale: 1 }}
                transition={{ duration: 6.5, ease: 'easeOut' }}
              />
            )}
          </motion.div>
        )
      })}

      {/* ═══════════════════════════════════════════
          LAYER 2 — Architectural Vignette & Darkening Scrim
      ═══════════════════════════════════════════ */}
      <div className="absolute inset-0 z-20 bg-black/30 pointer-events-none" />
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(13,15,19,0.75) 100%)' }}
      />
      <div className="absolute inset-0 z-20 bp-grid-fine opacity-10 pointer-events-none" />

      {/* ═══════════════════════════════════════════
          LAYER 3 — Centered High-Impact Architectural Content
      ═══════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-30 flex items-center justify-center text-center px-6"
        style={{ y: overlayY, opacity: overlayOpacity }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center pt-16">

          {/* Minimalist Tag Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${index}`}
              initial={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 sm:mb-8 max-w-full"
            >
              <span className="w-2 h-2 rounded-full bg-weld animate-pulse shrink-0" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.35em] text-white/90 font-semibold truncate">
                {allSlides[index].tag || 'GCC REGIONAL FABRICATION'}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Centered Headline with Thinner Font & Vertical Fading White Gradient */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`h1-${index}`}
              initial={{ opacity: 0, y: 24, filter: 'blur(12px)', scale: 0.98 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(12px)', scale: 1.02 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-medium uppercase text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.1] sm:leading-[1.08] tracking-[0.03em] sm:tracking-[0.04em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/35 drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] max-w-4xl px-2"
            >
              {allSlides[index].caption}
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-4 sm:mt-6 text-steel-light/90 text-sm sm:text-lg md:text-xl leading-relaxed max-w-2xl font-body px-2"
            >
              {allSlides[index].sub}
            </motion.p>
          </AnimatePresence>

          {/* Floating Glassmorphic Action Bar (Responsive Mobile/Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 sm:mt-10 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center justify-center gap-2 w-full sm:w-auto"
          >
            <NavLink
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-white text-graphite font-display uppercase font-bold tracking-wider px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-full text-xs sm:text-sm hover:bg-steel-light transition-all shadow-md w-full sm:w-auto"
            >
              <span>Start a Project</span>
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </NavLink>

            <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
              <NavLink
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-display uppercase tracking-wider text-white hover:bg-white/15 transition-colors flex-1 sm:flex-none text-center"
              >
                Services
              </NavLink>

              <NavLink
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-display uppercase tracking-wider text-white hover:bg-white/15 transition-colors flex-1 sm:flex-none text-center"
              >
                Projects
              </NavLink>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════
          LAYER 4 — Centered Minimalist Pagination Dots
      ═══════════════════════════════════════════ */}
      {allSlides.length > 1 && (
        <div className="absolute bottom-12 left-0 right-0 z-40 flex items-center justify-center gap-3">
          {allSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-500 ${i === index ? 'w-10 bg-weld' : 'w-2 bg-white/40 hover:bg-white/80'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      <motion.div style={{ opacity: overlayOpacity }} className="absolute bottom-4 left-0 right-0 z-40 flex flex-col items-center gap-1 text-white/50 text-[9px] uppercase tracking-[0.35em] pointer-events-none">
        <span>Scroll</span>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronsDown size={14} className="text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  )
}

