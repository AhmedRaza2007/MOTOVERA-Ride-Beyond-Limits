import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Heart } from 'lucide-react'
import { BRAND } from '../utils/constants'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: '3D Experience', to: '/experience' },
  { label: 'Technology', to: '/technology#technology' },
  { label: 'Gallery', to: '/technology#gallery' },
  { label: 'Test Ride', to: '/contact#test-ride' },
  { label: 'Contact', to: '/contact#contact' },
  { label: 'Privacy', to: '/contact#faq' },
  { label: 'Terms', to: '/contact#faq' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-graphite/60">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <h3 className="font-display text-3xl font-bold tracking-[0.2em]">
            MOTO<span className="text-accent">VERA</span>
          </h3>
          <p className="mt-2 font-display text-sm tracking-[0.3em] text-silver">{BRAND.tagline}</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-silver">
            Where precision meets performance. A new generation of motorcycle design, technology and immersive digital experience.
          </p>
          <div className="mt-8 flex gap-3">
            {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-silver transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_20px_-4px_rgba(225,6,0,0.6)]">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="section-label mb-6">Explore</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-silver transition-colors hover:text-accent">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-label mb-6">Created & Developed by</p>
          <p className="font-display text-xl font-semibold tracking-wider text-ivory">{BRAND.developer}</p>
          <p className="mt-1 text-sm text-silver">{BRAND.role}</p>
          <div className="mt-6 flex items-center gap-2 text-xs text-silver">
            Crafted with <Heart size={12} className="text-accent" /> in Pakistan — © 2026 Motovera
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-t border-white/10 py-4">
        <div className="animate-marquee flex whitespace-nowrap font-display text-sm tracking-[0.4em] text-silver/40">
          {Array(6).fill('RIDE BEYOND LIMITS — MOTOVERA — ').map((t, i) => <span key={i} className="mx-4">{t}</span>)}
        </div>
      </div>
    </footer>
  )
}