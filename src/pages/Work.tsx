import { useEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import CategoryFilter from '@/components/portfolio/CategoryFilter'
import { usePhotos, useCategories } from '@/hooks/useSanity'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
  const allPhotos = usePhotos()
  const categories = useCategories()
  const [activeFilter, setActiveFilter] = useState('all')
  const headerRef = useRef<HTMLDivElement>(null)

  const filteredImages = useMemo(() => {
    if (activeFilter === 'all') return allPhotos
    return allPhotos.filter((img) => img.category === activeFilter)
  }, [activeFilter, allPhotos])

  useEffect(() => {
    if (!headerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.work-title-char', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.03,
        ease: 'power3.out',
        delay: 0.15,
      })

      gsap.from('.work-accent-line', {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.4,
      })

      gsap.from('.work-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.5,
      })

      gsap.from('.work-filter', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.65,
      })
    }, headerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen pb-16 md:pb-24">
      <div className="nav-spacer" />

      <div ref={headerRef} className="page-container mb-10 md:mb-16">
        <h1 className="font-display font-light text-charcoal" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: 0.95, marginBottom: '0.75rem' }}>
          {'Work'.split('').map((char, i) => (
            <span key={i} className="work-title-char inline-block">
              {char}
            </span>
          ))}
        </h1>
        <div className="work-accent-line bg-accent" style={{ width: '40px', height: '1px', marginBottom: '1.25rem' }} />
        <p className="work-subtitle font-body text-muted" style={{ fontSize: 'clamp(13px, 2vw, 14px)', maxWidth: '32rem', marginBottom: '2rem' }}>
          A curated collection of portraiture, street photography, and culinary artistry.
        </p>
        <div className="work-filter">
          <CategoryFilter
            categories={categories}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </div>
      </div>

      <div className="page-container">
        <PortfolioGrid key={activeFilter} images={filteredImages} />
      </div>
    </main>
  )
}
