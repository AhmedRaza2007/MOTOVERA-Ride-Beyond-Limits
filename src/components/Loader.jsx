import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-carbon"
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-[0.3em]">
              MOTO<span className="text-accent">VERA</span>
            </h1>
            <p className="mt-3 text-[11px] tracking-[0.45em] text-silver">RIDE BEYOND LIMITS</p>
            <div className="mx-auto mt-8 h-[2px] w-56 overflow-hidden rounded bg-white/10">
              <motion.div
                className="h-full bg-accent"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}