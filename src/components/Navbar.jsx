import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User } from 'lucide-react'
import { BRAND, NAV_LINKS } from '../utils/constants'
import ThemeToggle from './ThemeToggle.jsx'
import AuthModal from './AuthModal.jsx'
import { useTheme } from '../hooks/useTheme.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'}`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-[0.25em]">
              MOTO<span className="text-accent">VERA</span>
            </span>
            <span className="mt-1 text-[9px] tracking-[0.3em] text-silver">{BRAND.developer}</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) =>
              link.to.includes('#') ? (
                <Link key={link.label} to={link.to}
                  className="text-[12px] tracking-[0.25em] text-silver transition-colors hover:text-accent">
                  {link.label}
                </Link>
              ) : (
                <NavLink key={link.label} to={link.to} end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative text-[12px] tracking-[0.25em] transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-silver'}`}>
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span layoutId="nav-underline"
                          className="absolute -bottom-2 left-0 h-[2px] w-full bg-accent"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                      )}
                    </>
                  )}
                </NavLink>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={toggle} />
            <button onClick={() => setAuthOpen(true)} aria-label="Account"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-silver transition-colors hover:border-accent hover:text-accent">
              <User size={16} />
            </button>
            <Link to="/contact#test-ride"
              className="btn-primary hidden !px-5 !py-2.5 !text-[11px] md:inline-flex">
              BOOK TEST RIDE
            </Link>
            <button onClick={() => setOpen(!open)} aria-label="Menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ivory lg:hidden">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}>
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-sm flex-col justify-center gap-2 border-l border-white/10 bg-carbon/95 px-10 backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}>
              <p className="section-label mb-6">Navigation</p>
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.label}
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1 }}>
                  <NavLink to={link.to} end={link.to === '/'}
                    className={({ isActive }) =>
                      `block py-3 font-display text-3xl font-semibold transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-ivory'}`}>
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-8">
                <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary w-full">BOOK TEST RIDE</Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}