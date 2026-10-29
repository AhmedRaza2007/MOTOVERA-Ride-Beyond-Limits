import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { toast as sonner } from 'sonner'
import MotorcycleViewer from '../components/MotorcycleViewer.jsx'
import CustomizationPanel from '../components/CustomizationPanel.jsx'
import PerformanceCard from '../components/PerformanceCard.jsx'
import SpecTabs from '../components/SpecTabs.jsx'
import { PAINTS, WHEELS, SEATS, ACCENTS, PERFORMANCE } from '../data/motorcycleData.js'

const VIEW_MODES = ['Studio', 'Performance', 'Detail']

const DEFAULT_CONFIG = {
  paint: PAINTS[1],      // Racing Red
  wheels: WHEELS[0],     // Stealth Black
  seat: SEATS[0],        // Black
  accent: ACCENTS[1],    // Silver
}

export default function Experience() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [viewMode, setViewMode] = useState('Studio')

  const handleSave = () => {
    localStorage.setItem('motovera-config', JSON.stringify(config))
    sonner.success('Configuration saved!', {
      description: `${config.paint.name} • ${config.wheels.name} wheels • ${config.seat.name} seat • ${config.accent.name} accent`,
    })
  }

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG)
    sonner.info('Configuration reset to defaults')
  }

  return (
    <div className="pt-28">
      {/* ===== Heading ===== */}
      <section id="customize" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 text-center lg:px-10">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label">3D Configurator</motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-4 font-display text-5xl font-bold md:text-7xl">
          BUILD YOUR <span className="text-accent">MOTOVERA</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-4 text-silver">
          Configure every detail. Experience it in real time.
        </motion.p>
      </section>

      {/* ===== Configurator ===== */}
      <section className="mx-auto mt-14 grid max-w-[1440px] items-start gap-8 px-5 lg:grid-cols-[1.6fr_1fr] lg:px-10">
        <div>
          {/* view mode switch */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] tracking-[0.3em] text-silver">VIEW MODE</p>
            <div className="flex gap-2">
              {VIEW_MODES.map((m) => (
                <button key={m} onClick={() => setViewMode(m)}
                  className={`rounded-full px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase transition-all ${
                    viewMode === m ? 'bg-accent text-white' : 'glass text-silver hover:text-ivory'}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass overflow-hidden rounded-2xl"
          >
            <MotorcycleViewer
              paint={config.paint.hex}
              wheelColor={config.wheels.hex}
              seatColor={config.seat.hex}
              accent={config.accent.hex}
              viewMode={viewMode}
              className="h-[440px] md:h-[560px]"
            />
          </motion.div>

          {/* sound toggle label */}
          <p className="mt-4 flex items-center gap-2 text-[11px] tracking-[0.25em] text-silver">
            🔊 EXPERIENCE SOUND — speaker icon se engine sound on/off karein
          </p>
        </div>

        <CustomizationPanel config={config} setConfig={setConfig} onSave={handleSave} onReset={handleReset} />
      </section>

      {/* ===== Performance ===== */}
      <section id="performance" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-28 lg:px-10">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="section-label text-center">Performance</motion.p>
        <h2 className="mt-4 text-center font-display text-4xl font-bold md:text-6xl">RAW NUMBERS</h2>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PERFORMANCE.map((p, i) => (
            <PerformanceCard key={p.label} {...p} index={i} />
          ))}
        </div>
      </section>

      {/* ===== Specifications ===== */}
      <section id="specifications" className="scroll-mt-24 border-t border-white/10 bg-graphite/40 py-28">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <p className="section-label text-center">Full Specifications</p>
          <h2 className="mt-4 text-center font-display text-4xl font-bold md:text-6xl">EVERY DETAIL</h2>
          <div className="mt-14">
            <SpecTabs />
          </div>
        </div>
      </section>
    </div>
  )
}