import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

function CountUp({ value, decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState((0).toFixed(decimals))

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, value, decimals])

  return <span ref={ref}>{display}</span>
}

export default function PerformanceCard({ value, unit, label, decimals = 0, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-sweep glass group rounded-2xl p-8 text-center transition-transform duration-300 hover:-translate-y-2"
    >
      <p className="font-display text-5xl font-bold text-ivory md:text-6xl">
        <CountUp value={value} decimals={decimals} />
        <span className="ml-1 text-xl text-accent">{unit}</span>
      </p>
      <p className="mt-3 text-[11px] tracking-[0.35em] text-silver">{label}</p>
      <span className="mx-auto mt-5 block h-[2px] w-10 bg-accent transition-all duration-500 group-hover:w-20" />
    </motion.div>
  )
}