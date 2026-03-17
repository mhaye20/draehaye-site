import { useEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { PortfolioImage } from '@/data/portfolio'
import Lightbox from './Lightbox'

gsap.registerPlugin(ScrollTrigger)

interface PortfolioGridProps {
  images: PortfolioImage[]
  showAll?: boolean
}

function useColumns(breakpoints: { default: number; 1024: number; 640: number }) {
  const [cols, setCols] = useState(breakpoints.default)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setCols(breakpoints[640])
      else if (w < 1024) setCols(breakpoints[1024])
      else setCols(breakpoints.default)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [breakpoints])

  return cols
}

export default function PortfolioGrid({ images, showAll = true }: PortfolioGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const numCols = useColumns({ default: 3, 1024: 2, 640: 1 })

  const displayImages = showAll ? images : images.filter((img) => img.featured)

  // Split images into columns for masonry
  const columns = useMemo(() => {
    const cols: PortfolioImage[][] = Array.from({ length: numCols }, () => [])
    displayImages.forEach((img, i) => {
      cols[i % numCols].push(img)
    })
    return cols
  }, [displayImages, numCols])

  // Map from image id to its flat index for lightbox
  const idToIndex = useMemo(() => {
    const map = new Map<string, number>()
    displayImages.forEach((img, i) => map.set(img.id, i))
    return map
  }, [displayImages])

  useEffect(() => {
    if (!gridRef.current) return

    const items = gridRef.current.querySelectorAll('.portfolio-item')
    const triggers: ScrollTrigger[] = []

    items.forEach((item) => {
      const img = item.querySelector('img')

      gsap.set(item, { clipPath: 'inset(100% 0% 0% 0%)' })
      if (img) gsap.set(img, { scale: 1.2 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })

      tl.to(item, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.9,
        ease: 'power3.out',
      })

      if (img) {
        tl.to(img, {
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
        }, '<')
      }

      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
    })

    return () => {
      triggers.forEach((st) => st.kill())
    }
  }, [columns])

  return (
    <>
      <div ref={gridRef} className="flex gap-3 md:gap-4 w-full">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-3 md:gap-4">
            {col.map((image) => (
              <div
                key={image.id}
                className="portfolio-item group cursor-pointer overflow-hidden"
                onClick={() => setLightboxIndex(idToIndex.get(image.id) ?? 0)}
                data-cursor="VIEW"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full block transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 font-body text-[10px] font-medium text-white uppercase tracking-[0.25em]">
                      View
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={displayImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
