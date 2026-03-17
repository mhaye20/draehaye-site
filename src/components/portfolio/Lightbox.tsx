import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { PortfolioImage } from '@/data/portfolio'

interface LightboxProps {
  images: PortfolioImage[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const current = images[currentIndex]

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length)
  }, [currentIndex, images.length, onNavigate])

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length)
  }, [currentIndex, images.length, onNavigate])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goNext, goPrev])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="lightbox-backdrop flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-white/60 hover:text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X size={24} strokeWidth={1.5} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 z-10">
        <span className="font-body text-[12px] text-white/40 tracking-widest">
          {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
      </div>

      {/* Navigation */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-8 z-10 text-white/40 hover:text-white transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft size={32} strokeWidth={1} />
      </button>

      <button
        onClick={goNext}
        className="absolute right-4 md:right-8 z-10 text-white/40 hover:text-white transition-colors"
        aria-label="Next image"
      >
        <ChevronRight size={32} strokeWidth={1} />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        >
          <img
            src={current.src.replace('format=750w', 'format=1500w')}
            alt={current.alt}
            className="max-w-full max-h-[85vh] object-contain"
          />
        </motion.div>
      </AnimatePresence>

      {/* Caption */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <p className="font-body text-[11px] text-white/30 uppercase tracking-[0.15em]">
          {current.alt}
        </p>
      </div>
    </motion.div>
  )
}
