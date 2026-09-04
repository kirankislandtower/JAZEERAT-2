import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Maximize2, X, Volume2, VolumeX } from 'lucide-react'

/**
 * FloatingVideoWidget — Picture-in-Picture style floating video player
 *
 * Props:
 *  - src      : video file URL or path
 *  - poster   : thumbnail image shown before play (optional)
 *  - title    : label shown on the widget (default: 'Site Visit')
 */
export default function FloatingVideoWidget({
  src = '/assets/site-visit.mp4',   // ← replace with your actual video URL
  poster = '/assets/assetsJazeerat/mild-steel-fabrication-works.webp',
  title = 'Our Factory Visit',
}) {
  const [expanded, setExpanded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  // ── play/pause toggle
  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  // ── mute toggle
  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  // ── progress tracking
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0)
    const onEnd = () => { setPlaying(false); setProgress(0) }
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('ended', onEnd)
    return () => { v.removeEventListener('timeupdate', onTime); v.removeEventListener('ended', onEnd) }
  }, [expanded])

  // ── fullscreen
  const toggleFullscreen = () => {
    const el = containerRef.current
    if (!document.fullscreenElement) {
      el?.requestFullscreen?.()
      setFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setFullscreen(false)
    }
  }

  useEffect(() => {
    const onFsChange = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  // ── pause when collapsed
  useEffect(() => {
    if (!expanded && videoRef.current) {
      videoRef.current.pause()
      setPlaying(false)
    }
  }, [expanded])

  if (dismissed) return null

  return (
    <div className="fixed bottom-28 right-5 z-[990] flex flex-col items-end gap-2">

      {/* ── Collapsed pill / thumbnail ── */}
      <AnimatePresence>
        {!expanded && (
          <motion.button
            initial={{ opacity: 0, x: 60, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            onClick={() => setExpanded(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative w-[190px] rounded-xl overflow-hidden border border-white/15 shadow-2xl cursor-pointer"
            aria-label="Open site visit video"
          >
            {/* Thumbnail */}
            <img
              src={poster}
              alt="Site visit preview"
              className="w-full h-[107px] object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

            {/* Play button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: hovered ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                <Play size={18} className="text-white fill-white ml-0.5" />
              </div>
            </motion.div>

            {/* Label bar */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d62f22] animate-pulse shrink-0" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/90 truncate">{title}</span>
            </div>

            {/* Dismiss X */}
            <button
              onClick={(e) => { e.stopPropagation(); setDismissed(true) }}
              className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
              aria-label="Dismiss"
            >
              <X size={10} className="text-white" />
            </button>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Expanded video player ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="relative w-[320px] sm:w-[360px] rounded-2xl overflow-hidden border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.7)] bg-black"
          >
            {/* Video */}
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              className="w-full aspect-video object-cover"
              playsInline
              preload="metadata"
            />

            {/* Click-to-play overlay (when paused) */}
            <AnimatePresence>
              {!playing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                  onClick={togglePlay}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl"
                  >
                    <Play size={28} className="text-white fill-white ml-1" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-3 pt-6 pb-3">
              {/* Progress bar */}
              <div
                className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer"
                onClick={(e) => {
                  const v = videoRef.current
                  if (!v) return
                  const rect = e.currentTarget.getBoundingClientRect()
                  const ratio = (e.clientX - rect.left) / rect.width
                  v.currentTime = ratio * v.duration
                }}
              >
                <motion.div
                  className="h-full bg-[#d62f22] rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Buttons row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label={playing ? 'Pause' : 'Play'}
                  >
                    {playing
                      ? <Pause size={14} className="text-white" />
                      : <Play size={14} className="text-white fill-white ml-0.5" />
                    }
                  </button>

                  {/* Mute */}
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label={muted ? 'Unmute' : 'Mute'}
                  >
                    {muted
                      ? <VolumeX size={14} className="text-white" />
                      : <Volume2 size={14} className="text-white" />
                    }
                  </button>

                  {/* Label */}
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 ml-1">{title}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 size={13} className="text-white" />
                  </button>

                  {/* Collapse */}
                  <button
                    onClick={() => setExpanded(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Collapse"
                  >
                    <X size={13} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
