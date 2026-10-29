import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { TECHNOLOGIES, PREMIUM_FEATURES } from '../data/features.js'
import FeatureCard from '../components/FeatureCard.jsx'
import PerformanceCard from '../components/PerformanceCard.jsx'
import Gallery from '../components/Gallery.jsx'
import Button from '../components/Button.jsx'
import MotorcycleViewer from '../components/MotorcycleViewer.jsx'
import { BRAND } from '../utils/constants.js'

export default function TechnologyGallery() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])

  // Paint color selector state for 3D Viewer
  const [paint, setPaint] = useState('#E10600')
  const [viewMode, setViewMode] = useState('Studio')

  const paintOptions = [
    { name: 'Rosso Corsa', color: '#E10600' },
    { name: 'Stealth Black', color: '#111115' },
    { name: 'Liquid Silver', color: '#D0D0D5' },
    { name: 'Racing Yellow', color: '#F0B900' },
  ]

  return (
    <div className="pt-28">
      {/* ===== INTRO ===== */}
      <section
        ref={heroRef}
        className="relative flex min-h-[85vh] items-center overflow-hidden"
      >
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
        </motion.div>
        <motion.div
          style={{ y: textY }}
          className="relative z-10 mx-auto max-w-[1440px] px-5 text-center lg:px-10"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-label"
          >
            The Machine
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-8xl"
          >
            ENGINEERED FOR THE
            <br />
            <span className="text-stroke">EXTRAORDINARY</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-8 max-w-xl text-silver"
          >
            Where precision meets performance — every system, every surface,
            every millisecond considered.
          </motion.p>
        </motion.div>
      </section>

      {/* ===== 3D INTERACTIVE VIEWER SECTION ===== */}
      <section id="interactive-3d" className="scroll-mt-24 py-16">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <p className="section-label text-center">Interactive Experience</p>
          <h2 className="mt-4 text-center font-display text-4xl font-bold md:text-6xl">
            EXPLORE IN 3D
          </h2>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {/* Paint Customizer */}
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-graphite/60 p-1.5 backdrop-blur-md">
              <span className="px-3 text-xs font-semibold tracking-wider text-silver uppercase">
                Paint:
              </span>
              {paintOptions.map((opt) => (
                <button
                  key={opt.color}
                  onClick={() => setPaint(opt.color)}
                  title={opt.name}
                  className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                    paint === opt.color
                      ? 'border-accent scale-110'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: opt.color }}
                />
              ))}
            </div>

            {/* Camera View Selector */}
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-graphite/60 p-1 backdrop-blur-md">
              {['Studio', 'Performance', 'Detail'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all ${
                    viewMode === mode
                      ? 'bg-accent text-white'
                      : 'text-silver hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ FIX: className mein height di — isi ke bina canvas 0px tha */}
          <div className="mt-8">
            <MotorcycleViewer
              paint={paint}
              viewMode={viewMode}
              className="h-[440px] w-full md:h-[560px]"
            />
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGY ===== */}
      <section
        id="technology"
        className="scroll-mt-24 border-t border-white/10 bg-graphite/40 py-28"
      >
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <p className="section-label text-center">Technology</p>
          <h2 className="mt-4 text-center font-display text-4xl font-bold md:text-6xl">
            FOUR PILLARS
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {TECHNOLOGIES.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
                className="card-sweep glass group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 md:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl font-bold text-stroke">
                    {t.id}
                  </span>
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                    />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-[0.2em]">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-silver">
                  {t.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {t.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-xs tracking-wide text-silver"
                    >
                      <span className="h-1 w-3 bg-accent" /> {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PREMIUM FEATURES (8 cards) ===== */}
      <section id="features" className="scroll-mt-24 py-28">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <p className="section-label text-center">Premium Features</p>
          <h2 className="mt-4 text-center font-display text-4xl font-bold md:text-6xl">
            EQUIPPED TO EXCEL
          </h2>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PREMIUM_FEATURES.map((f, i) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                text={f.text}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CINEMATIC PERFORMANCE ===== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden border-y border-white/10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(225,6,0,0.14) 0%, #050505 70%)',
          }}
        />
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute font-display text-[16vw] font-bold text-stroke opacity-40 md:text-[12vw]"
        >
          PERFORMANCE
        </motion.h2>
        <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 gap-6 px-5 sm:grid-cols-3">
          <PerformanceCard
            value={2.9}
            unit="SEC"
            label="0–100 KM/H"
            decimals={1}
            index={0}
          />
          <PerformanceCard
            value={299}
            unit="KM/H"
            label="TOP SPEED"
            index={1}
          />
          <PerformanceCard value={112} unit="NM" label="TORQUE" index={2} />
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery" className="scroll-mt-24 py-28">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <p className="section-label text-center">Gallery</p>
          <h2 className="mt-4 text-center font-display text-4xl font-bold md:text-6xl">
            EVERY ANGLE
          </h2>
          <p className="mt-3 text-center text-xs tracking-[0.25em] text-silver">
            CLICK TO OPEN — ARROWS / SWIPE TO NAVIGATE
          </p>
          <div className="mt-14">
            <Gallery />
          </div>
        </div>
      </section>

      {/* ===== BRAND STORY ===== */}
      <section className="border-t border-white/10 bg-graphite/40 py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl px-5 text-center"
        >
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            DESIGNED WITHOUT<br />
            <span className="text-accent">COMPROMISE.</span>
          </h2>
          <p className="mt-8 leading-relaxed text-silver">
            Motovera brings together performance-driven engineering, modern
            technology and distinctive design in one immersive motorcycle
            experience.
          </p>
          <div className="mt-10">
            <p className="text-[11px] tracking-[0.35em] text-silver">
              CREATED & DEVELOPED BY
            </p>
            <p className="mt-2 font-display text-xl font-semibold tracking-[0.2em]">
              {BRAND.developer}
            </p>
          </div>
          <div className="mt-12">
            <Button to="/experience">EXPERIENCE IT IN 3D</Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}