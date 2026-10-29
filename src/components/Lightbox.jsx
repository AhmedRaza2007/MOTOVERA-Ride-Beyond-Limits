import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ images = [], currentIndex, isOpen, onClose, onNavigate }) {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length)
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, currentIndex, images.length, onClose, onNavigate])

  // Mobile swipe handlers
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      onNavigate((currentIndex + 1) % images.length)
    } else if (isRightSwipe) {
      onNavigate((currentIndex - 1 + images.length) % images.length)
    }
  }

  if (!isOpen || !images.length) return null

  const currentImg = images[currentIndex]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-accent"
        >
          <X size={24} />
        </button>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate((currentIndex - 1 + images.length) % images.length)
          }}
          className="absolute left-6 z-50 hidden rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-accent md:block"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate((currentIndex + 1) % images.length)
          }}
          className="absolute right-6 z-50 hidden rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-accent md:block"
        >
          <ChevronRight size={28} />
        </button>

        {/* Main Image Container */}
        <div
          className="relative flex max-h-[85vh] max-w-[90vw] flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            src={currentImg?.src || currentImg}
            alt={currentImg?.alt || `Gallery Image ${currentIndex + 1}`}
            loading="lazy"
            className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl"
          />

          {/* Caption & Counter */}
          <div className="mt-4 text-center">
            <p className="text-sm font-medium tracking-wider text-ivory">
              {currentImg?.title || currentImg?.alt || ''}
            </p>
            <p className="mt-1 text-xs tracking-widest text-silver">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}