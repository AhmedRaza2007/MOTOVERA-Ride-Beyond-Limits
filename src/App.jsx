import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'sonner'
import Lenis from 'lenis'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import Home from './pages/Home.jsx'
import Experience from './pages/Experience.jsx'
import TechnologyGallery from './pages/TechnologyGallery.jsx'
import ContactTestRide from './pages/ContactTestRide.jsx'

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150)
    }
  }, [location])

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        exit={{ opacity: 0, filter: 'blur(8px)', y: -12 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/technology" element={<TechnologyGallery />} />
          <Route path="/contact" element={<ContactTestRide />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis, raf
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
      const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
      raf = requestAnimationFrame(loop)
    }
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => { clearTimeout(timer); if (lenis) lenis.destroy(); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="min-h-screen bg-carbon text-ivory">
      <Loader show={loading} />
      <CursorGlow />
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <Toaster theme="dark" position="bottom-right" richColors />
    </div>
  )
}