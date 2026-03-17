import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import HeroCarousel from '@/components/hero/HeroCarousel'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import { useFeaturedPhotos } from '@/hooks/useSanity'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const featuredPhotos = useFeaturedPhotos()
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
        },
      })

      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <main>
      <HeroCarousel />

      {/* Featured Work */}
      <section ref={sectionRef} className="page-container" style={{ paddingTop: 'clamp(3rem, 6vw, 6rem)', paddingBottom: 'clamp(3rem, 6vw, 6rem)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(2rem, 4vw, 4rem)' }}>
          <div>
            <h2
              ref={headingRef}
              className="font-display font-light text-charcoal"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
            >
              Selected Work
            </h2>
            <div className="bg-accent" style={{ width: '40px', height: '1px', marginTop: '1rem' }} />
          </div>
          <Link
            to="/work"
            className="hidden md:flex items-center gap-2 font-body font-medium uppercase text-muted hover:text-charcoal animated-underline transition-colors duration-300"
            style={{ fontSize: '12px', letterSpacing: '0.15em' }}
            data-cursor="EXPLORE"
          >
            View All
            <ArrowRight size={14} />
          </Link>
        </div>

        <PortfolioGrid images={featuredPhotos} showAll={true} />

        <div ref={ctaRef} style={{ marginTop: 'clamp(2.5rem, 5vw, 5rem)', textAlign: 'center' }}>
          <Link
            to="/work"
            className="inline-flex items-center gap-3 font-body font-medium uppercase text-charcoal group"
            style={{ fontSize: '13px', letterSpacing: '0.15em', minHeight: '44px' }}
            data-cursor="EXPLORE"
          >
            <span className="animated-underline">Explore All Work</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      {/* Statement */}
      <section className="bg-charcoal noise-overlay relative" style={{ padding: 'clamp(3rem, 7vw, 7rem) clamp(1.5rem, 4vw, 3.5rem)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <blockquote className="font-display font-light text-offwhite/90 italic" style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)', lineHeight: 1.6 }}>
            &ldquo;Capturing subjects in personal and intimate ways that retain and highlight their
            uniqueness and personalities.&rdquo;
          </blockquote>
          <div className="bg-accent mx-auto" style={{ width: '30px', height: '1px', marginTop: '2rem' }} />
          <p className="font-body font-medium uppercase text-offwhite/35" style={{ fontSize: '11px', letterSpacing: '0.25em', marginTop: '1.25rem' }}>
            Andrae Haye
          </p>
        </div>
      </section>
    </main>
  )
}
