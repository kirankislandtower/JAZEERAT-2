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
const Contact = lazy(() => import('./pages/Contact'))
// const Team = lazy(() => import('./pages/Team'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Blogs = lazy(() => import('./pages/Blogs'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const location = useLocation()
  const [preloaderDone, setPreloaderDone] = useState(false)

  // 🌊 Lenis smooth scroll — runs globally for all pages
  useLenis()

  return (
    <MotionConfig reducedMotion="user">
      {/* ── Preloader overlay (only on first visit) */}
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
              <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
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

