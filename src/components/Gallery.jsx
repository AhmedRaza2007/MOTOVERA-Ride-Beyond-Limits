import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GALLERY_IMAGES } from '../data/gallery.js'

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null) // index | null
  const [direction, setDirection] = useState(0)

  const next = useCallback(() => {
    setDirection(1)
    setLightbox((i) => (i + 1) % GALLERY_IMAGES.length)
  }, [])
  const prev = useCallback(() => {
    setDirection(-1)
    setLightbox((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
  }, [])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, next, prev])

  // mobile swipe
  const touchStart = useRefX()
  function useRefX() { const [v, setV] = useState(null); return [v, setV] }

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {GALLERY_IMAGES.map((img, i) => (
          <motion.button
            key={img.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            onClick={() => setLightbox(i)}
            className="group relative mb-4 block w-full overflow-hidden rounded-xl"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${img.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute bottom-4 left-4 translate-y-3 text-xs tracking-[0.2em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {img.alt.toUpperCase()}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:text-accent md:left-8"
              aria-label="Previous">
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:text-accent md:right-8"
              aria-label="Next">
              <ChevronRight size={22} />
            </button>
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:text-accent md:right-8 md:top-8"
              aria-label="Close">
              <X size={22} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.94, x: direction * 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="max-h-[85vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => touchStart[1](e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchStart[0] === null) return
                const dx = e.changedTouches[0].clientX - touchStart[0]
                if (Math.abs(dx) > 50) (dx < 0 ? next : prev)()
                touchStart[1](null)
              }}
            >
              <img
                src={GALLERY_IMAGES[lightbox].src}
                alt={GALLERY_IMAGES[lightbox].alt}
                className="max-h-[80vh] w-full rounded-xl object-contain"
              />
              <p className="mt-4 text-center text-xs tracking-[0.3em] text-silver">
                {lightbox + 1} / {GALLERY_IMAGES.length} — {GALLERY_IMAGES[lightbox].alt.toUpperCase()}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}