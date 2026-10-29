import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQS } from '../data/faq.js'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {FAQS.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className="glass overflow-hidden rounded-xl">
            <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
              <span className="font-display font-medium text-ivory">{item.q}</span>
              <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}
                className={isOpen ? 'text-accent' : 'text-silver'}>
                <Plus size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-silver">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}