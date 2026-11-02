import { lazy, Suspense, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppWidget from './components/WhatsAppWidget'
import PageTransition from './components/PageTransition'
import Preloader from './components/Preloader'

import { useLenis } from './hooks/useLenis'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Facilities = lazy(() => import('./pages/Facilities'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const DubaiSteelFabrication = lazy(() => import('./pages/DubaiSteelFabrication'))
// const Team = lazy(() => import('./pages/Team'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Blogs = lazy(() => import('./pages/Blogs'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const NotFound = lazy(() => import('./pages/NotFound'))

// The intro animation adds about 3 seconds before any content shows. Play it
// only when a visitor opens the home page, and only once per browser session,
// so people arriving on a blog or service page from Google or LinkedIn see the
// content straight away.
function shouldShowPreloader() {
  if (window.location.pathname !== '/') return false
  try {
    if (sessionStorage.getItem('jah-intro-seen')) return false
    sessionStorage.setItem('jah-intro-seen', '1')
  } catch {
    // storage blocked: still show it once on the home page
  }
  return true
}

// Decided once when the app loads (not inside the component, where React's
// strict mode would run it twice).
const SHOW_INTRO = shouldShowPreloader()

function App() {
  const location = useLocation()
  const [preloaderDone, setPreloaderDone] = useState(!SHOW_INTRO)

  // 🌊 Lenis smooth scroll — runs globally for all pages
  useLenis()

  return (
    <MotionConfig reducedMotion="user">
      {/* ── Preloader overlay (home page, once per session) */}
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader onDone={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-graphite text-steel-light font-body">
        <Navbar />
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Suspense fallback={null}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/services/:slug" element={<PageTransition><ServiceDetail /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/facilities" element={<PageTransition><Facilities /></PageTransition>} />
              <Route path="/steel-fabrication-dubai" element={<PageTransition><DubaiSteelFabrication /></PageTransition>} />
              <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
              <Route path="/projects/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
              {/* <Route path="/team" element={<PageTransition><Team /></PageTransition>} /> */}
              <Route path="/blogs" element={<PageTransition><Blogs /></PageTransition>} />
              <Route path="/blogs/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
        <WhatsAppWidget />
        <Footer />
      </div>
    </MotionConfig>
  )
}

export default App

