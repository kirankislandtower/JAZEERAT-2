import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Play, Pause, X, Volume2, VolumeX, Maximize2 } from 'lucide-react'

/**
 * SiteVisitSection — Cinematic "Watch Our Story" section with lightbox modal.
 *
 * Props:
 *  - videoSrc : URL or path to the factory visit video
 *  - poster   : Thumbnail image shown before play
 */
export default function SiteVisitSection({
  videoSrc = '/assets/site-visit.mp4',
  poster = '/assets/site-visit-poster.webp',
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef(null)
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1])

  // Auto-play when modal opens
  useEffect(() => {
    if (modalOpen && videoRef.current) {
      videoRef.current.play().catch(() => {})
      setPlaying(true)
    }
    if (!modalOpen && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setPlaying(false)
      setProgress(0)
    }
  }, [modalOpen])

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  // Preload just enough metadata to show the real duration on the thumbnail
  // badge, without waiting for the user to open the modal first.
  useEffect(() => {
    const probe = document.createElement('video')
    probe.preload = 'metadata'
    probe.src = videoSrc
    const onMeta = () => setDuration(probe.duration)
    probe.addEventListener('loadedmetadata', onMeta)
    return () => probe.removeEventListener('loadedmetadata', onMeta)
  }, [videoSrc])

  // Track progress
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => {
      setCurrentTime(v.currentTime)
      setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0)
    }
    const onMeta = () => setDuration(v.duration)
    const onEnd = () => setPlaying(false)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('ended', onEnd)
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('ended', onEnd)
    }
  }, [modalOpen])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setModalOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const handleProgressClick = (e) => {
    const v = videoRef.current
    if (!v) return
    const rect = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration
  }

  const fmt = (s) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  const requestFullscreen = () => {
    const v = videoRef.current
    if (v?.requestFullscreen) v.requestFullscreen()
    else if (v?.webkitRequestFullscreen) v.webkitRequestFullscreen()
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          STORY SECTION
      ══════════════════════════════════════════════════════ */}
      <section ref={sectionRef} className="relative bg-graphite py-24 lg:py-36 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bp-grid-fine opacity-20 pointer-events-none" />

        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(214,47,34,0.06),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.35em] text-[#d62f22] border border-[#d62f22]/30 px-3 py-1 rounded-full bg-[#d62f22]/5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d62f22] animate-pulse" />
              Behind the Workshop
            </span>
            <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl lg:text-5xl text-white mt-4 tracking-tight">
              See Our Facility{' '}
              <span className="text-steel-light">in Action</span>
            </h2>
            <p className="mt-4 text-steel text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
              A real look inside our workshop — the machines, the team, and the precision behind every project.
            </p>
          </motion.div>

          {/* ── Cinematic Video Thumbnail ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-4xl mx-auto"
          >
            <div
              className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
              onClick={() => setModalOpen(true)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              role="button"
              tabIndex={0}
              aria-label="Play factory visit video"
              onKeyDown={(e) => e.key === 'Enter' && setModalOpen(true)}
            >
              {/* Thumbnail image */}
              <motion.img
                src={poster}
                alt="JAH factory visit"
                className="w-full h-full object-cover"
                style={{ scale: imgScale }}
              />

              {/* Scrim */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-500" />

              {/* Film grain overlay */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '180px' }}
              />

              {/* Duration badge */}
              {duration > 0 && (
                <div className="absolute top-4 right-4 font-mono text-[10px] text-white/80 bg-black/50 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
                  {fmt(duration)}
                </div>
              )}

              {/* Center play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: hovered ? 1.12 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  {/* Pulse rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/20"
                    animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/15"
                    animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                  />

                  {/* Play circle */}
                  <div className="relative w-20 h-20 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl">
                    <Play size={32} className="text-white fill-white ml-1.5" />
                  </div>
                </motion.div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-display uppercase text-sm tracking-[0.2em] text-white/80">
                  Watch Our Story <span className="text-[#d62f22]">→</span>
                </p>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 border-[#d62f22]/60 rounded-tl-2xl" />
            <div className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 border-[#d62f22]/60 rounded-br-2xl" />
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          LIGHTBOX MODAL — portaled to <body> so `fixed` positions
          against the real viewport, not the page-transition wrapper
          (which applies a transform/filter and would otherwise turn
          it into the containing block for this element).
      ══════════════════════════════════════════════════════ */}
      {createPortal(
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[9990] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Video container */}
            <motion.div
              className="relative z-10 w-full max-w-5xl mx-4"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/10 bg-black">
                {/* Video */}
                <video
                  ref={videoRef}
                  src={videoSrc}
                  poster={poster}
                  className="w-full h-full object-contain bg-black"
                  playsInline
                  preload="auto"
                  onClick={togglePlay}
                />

                {/* Paused overlay */}
                <AnimatePresence>
                  {!playing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={togglePlay}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl"
                      >
                        <Play size={32} className="text-white fill-white ml-1.5" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pt-10 pb-4">
                  {/* Progress */}
                  <div
                    className="w-full h-1.5 bg-white/20 rounded-full mb-3 cursor-pointer group/bar"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-[#d62f22] rounded-full relative transition-all"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#d62f22] shadow opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Button row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button onClick={togglePlay} className="w-9 h-9 flex items-center justify-center text-white hover:text-white/70 transition-colors" aria-label={playing ? 'Pause' : 'Play'}>
                        {playing ? <Pause size={20} /> : <Play size={20} className="fill-white" />}
                      </button>
                      <button onClick={toggleMute} className="w-9 h-9 flex items-center justify-center text-white hover:text-white/70 transition-colors" aria-label={muted ? 'Unmute' : 'Mute'}>
                        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>
                      <span className="font-mono text-[11px] text-white/50 tabular-nums ml-1">
                        {fmt(currentTime)} / {fmt(duration)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={requestFullscreen} className="w-9 h-9 flex items-center justify-center text-white hover:text-white/70 transition-colors" aria-label="Fullscreen">
                        <Maximize2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close button above the player */}
              <div className="flex justify-between items-center mt-3 px-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                  JAH · Factory Visit · 2026
                </span>
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex items-center gap-1.5 py-2 px-3 -my-2 -mr-3 font-mono text-[10px] uppercase tracking-wider text-white/50 hover:text-white transition-colors"
                  aria-label="Close video"
                >
                  <X size={14} /> Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  )
}
