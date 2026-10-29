import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Gauge, PenTool, Cpu, Wrench, ArrowDown, ChevronRight } from 'lucide-react'
import MotorcycleViewer from '../components/MotorcycleViewer.jsx'
import Button from '../components/Button.jsx'
import StatItem from '../components/StatItem.jsx'
import { STATS } from '../data/motorcycleData.js'
import { TECHNOLOGIES } from '../data/features.js'
import { useState } from 'react'

const WHY = [
  { icon: Gauge, title: 'PERFORMANCE', text: 'Built around responsive power and control.' },
  { icon: PenTool, title: 'DESIGN', text: 'Every surface shaped with purpose.' },
  { icon: Cpu, title: 'TECHNOLOGY', text: 'Modern rider-focused systems.' },
  { icon: Wrench, title: 'CRAFTSMANSHIP', text: 'Precision throughout every detail.' },
]

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

function RevealHeading({ children }) {
  return (
    <div className="overflow-hidden">
      <motion.h2
        initial={{ y: '110%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-4xl font-bold tracking-tight md:text-6xl">
        {children}
      </motion.h2>
    </div>
  )
}

export default function Home() {
  const [activePanel, setActivePanel] = useState(0)

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
        {/* floating particles */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-accent/50"
            style={{ left: `${(i * 67) % 100}%`, top: `${(i * 37) % 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 lg:grid-cols-2 lg:px-10">
          {/* Left */}
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="section-label">
              EST. 2026 — NEXT GENERATION PERFORMANCE
            </motion.p>

            <h1 className="mt-6 font-display font-bold leading-[0.95]">
              {['RIDE', 'BEYOND', 'LIMITS.'].map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    className={`block text-6xl md:text-8xl ${i === 2 ? 'text-accent' : ''}`}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.65 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}>
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25 }}
              className="mt-6 max-w-md text-silver">
              Experience a new generation of motorcycle design, technology and performance through an immersive 3D experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45 }}
              className="mt-10 flex flex-wrap gap-4">
              <Button to="/experience">EXPLORE 3D EXPERIENCE</Button>
              <Button to="/experience#customize" variant="ghost">BUILD YOUR MOTOVERA</Button>
            </motion.div>
          </div>

          {/* Right — 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[420px] md:h-[560px]"
          >
            <MotorcycleViewer showControls={false} className="h-full w-full" />

            {/* floating badges */}
            {[
              { top: '12%', left: '4%', big: '998 CC', small: 'ENGINE' },
              { top: '42%', right: '0%', big: '200 HP', small: 'POWER' },
              { bottom: '18%', left: '8%', big: '299 KM/H', small: 'TOP SPEED' },
            ].map((b, i) => (
              <motion.div
                key={b.big}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + i * 0.2, type: 'spring', stiffness: 200 }}
                className="animate-floaty absolute z-10 cursor-default rounded-xl glass px-4 py-3 text-center transition-shadow duration-300 hover:shadow-[0_0_35px_-5px_rgba(225,6,0,0.7)]"
                style={{ ...b, animationDelay: `${i * 1.2}s` }}>
                <p className="font-display text-lg font-bold text-ivory">{b.big}</p>
                <p className="text-[9px] tracking-[0.3em] text-accent">{b.small}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <div className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
            <span className="animate-scroll-dot h-2 w-1 rounded-full bg-accent" />
          </div>
          <ArrowDown size={14} className="text-silver" />
        </motion.div>
      </section>

      {/* ============ PERFORMANCE STRIP ============ */}
      <section className="border-y border-white/10 bg-graphite/40 py-14">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-5 md:grid-cols-4 lg:px-10">
          {STATS.map((s, i) => (
            <StatItem key={s.label} {...s} index={i} />
          ))}
        </div>
      </section>

      {/* ============ WHY MOTOVERA ============ */}
      <section className="mx-auto max-w-[1440px] px-5 py-28 lg:px-10">
        <motion.p {...fadeUp} transition={{ duration: 0.6 }} className="section-label">Why Motovera</motion.p>
        <div className="mt-4"><RevealHeading>BEYOND ORDINARY</RevealHeading></div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-sweep glass group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_-20px_rgba(225,6,0,0.35)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <item.icon size={22} />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold tracking-[0.15em]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-silver">{item.text}</p>
              <span className="mt-5 block h-[2px] w-8 bg-accent transition-all duration-500 group-hover:w-16" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ TECHNOLOGY PREVIEW ============ */}
      <section className="border-y border-white/10 bg-graphite/40 py-28">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <motion.p {...fadeUp} className="section-label">Technology</motion.p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <RevealHeading>THE MACHINE</RevealHeading>
            <Link to="/technology#technology" className="group flex items-center gap-2 text-[12px] tracking-[0.25em] text-silver transition-colors hover:text-accent">
              VIEW ALL TECHNOLOGY <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-14 space-y-3">
            {TECHNOLOGIES.map((t, i) => {
              const isActive = activePanel === i
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  onMouseEnter={() => setActivePanel(i)}
                  onClick={() => setActivePanel(i)}
                  className={`glass cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ${isActive ? 'border-accent/40' : ''}`}>
                  <div className="flex items-center gap-6 px-6 py-5 md:px-10">
                    <span className="font-display text-sm text-accent">{t.id}</span>
                    <h3 className="flex-1 font-display text-2xl font-semibold tracking-[0.15em] md:text-4xl">{t.title}</h3>
                    <motion.span animate={{ rotate: isActive ? 90 : 0 }} className="text-silver"><ChevronRight size={20} /></motion.span>
                  </div>
                  <motion.div
                    animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden">
                    <div className="px-6 pb-7 md:px-10 md:pl-[88px]">
                      <p className="max-w-xl text-sm leading-relaxed text-silver">{t.description}</p>
                      <div className="mt-5 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-accent"
                          animate={{ width: isActive ? `${t.progress}%` : '0%' }}
                          transition={{ duration: 1, delay: 0.2 }} />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{ background: 'radial-gradient(ellipse at center, rgba(225,6,0,0.35) 0%, transparent 60%)' }} />
        <motion.div {...fadeUp} className="relative z-10 px-5 text-center">
          <p className="section-label">Ready when you are</p>
          <h2 className="mt-4 font-display text-5xl font-bold leading-tight md:text-7xl">
            READY TO EXPERIENCE<br /><span className="text-accent">MOTOVERA?</span>
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button to="/experience">BUILD YOUR RIDE</Button>
            <Button to="/contact#test-ride" variant="ghost">BOOK A TEST RIDE</Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}