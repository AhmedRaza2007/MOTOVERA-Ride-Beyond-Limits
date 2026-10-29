import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button onClick={onToggle} aria-label="Toggle theme"
      className="relative flex h-9 w-[68px] items-center rounded-full border border-white/15 bg-white/5 px-1 transition-colors hover:border-accent/60">
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className={`flex h-7 w-7 items-center justify-center rounded-full ${isDark ? 'ml-auto bg-accent' : 'bg-carbon'}`}>
        {isDark ? <Moon size={14} className="text-white" /> : <Sun size={14} className="text-ivory" />}
      </motion.span>
    </button>
  )
}