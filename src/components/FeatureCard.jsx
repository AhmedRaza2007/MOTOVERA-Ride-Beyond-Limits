import { motion } from 'framer-motion'

export default function FeatureCard({ icon: Icon, title, text, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08 }}
      className="card-sweep glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_-20px_rgba(225,6,0,0.35)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
        <Icon size={22} />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold tracking-wide text-ivory">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-silver">{text}</p>
      <span className="mt-4 block h-[2px] w-8 bg-accent transition-all duration-500 group-hover:w-16" />
    </motion.div>
  )
}