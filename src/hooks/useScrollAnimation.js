import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px', ...options })
  return {
    ref,
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }
}