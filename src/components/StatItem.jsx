import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

export default function StatItem({ value, suffix, label, index = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2, ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center">
      <p className="font-display text-4xl font-bold text-ivory md:text-5xl">
        <span className="tabular-nums">{display}</span>
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-2 text-[10px] tracking-[0.35em] text-silver">{label}</p>
    </motion.div>
  )
}