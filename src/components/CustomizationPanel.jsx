import { motion, AnimatePresence } from 'framer-motion'
import ColorSelector from './ColorSelector.jsx'
import Button from './Button.jsx'
import { BASE_PRICE } from '../data/motorcycleData.js'

function ConfigLine({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span className="tracking-[0.2em] text-silver">{label}</span>
      <span className="flex-1 border-b border-dotted border-white/15" />
      <AnimatePresence mode="wait">
        <motion.span key={value}
          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
          className="font-display text-ivory">
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default function CustomizationPanel({ config, setConfig, onSave, onReset }) {
  return (
    <div className="glass space-y-6 rounded-2xl p-6">
      {/* ColorSelector renders ALL sections (paint/wheels/seat/accent)
          internally — it only needs the whole config object + setter,
          not one call per field. */}
      <ColorSelector config={config} setConfig={setConfig} />

      <div className="border-t border-white/10 pt-5">
        <p className="section-label mb-4">Your Motovera</p>
        <div className="space-y-2.5">
          <ConfigLine label="PAINT" value={config.paint.name} />
          <ConfigLine label="WHEELS" value={config.wheels.name} />
          <ConfigLine label="SEAT" value={config.seat.name} />
          <ConfigLine label="ACCENT" value={config.accent.name} />
        </div>
        <div className="mt-5 flex items-end justify-between">
          <span className="text-[11px] tracking-[0.2em] text-silver">ESTIMATED PRICE</span>
          <AnimatePresence mode="wait">
            <motion.span key={config.paint.name + config.wheels.name}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="font-display text-2xl font-bold text-accent">
              PKR {BASE_PRICE.toLocaleString('en-PK')}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="grid gap-3">
        <Button onClick={onSave}>SAVE CONFIGURATION</Button>
        <div className="grid grid-cols-2 gap-3">
          <Button to="/contact#test-ride" variant="ghost">BOOK TEST RIDE</Button>
          <Button variant="ghost" onClick={onReset}>RESET</Button>
        </div>
      </div>
    </div>
  )
}