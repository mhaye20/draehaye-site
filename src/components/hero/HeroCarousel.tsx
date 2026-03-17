import { useEffect, useRef, useState, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'
import { useHeroSlides } from '@/hooks/useSanity'
import { siteConfig } from '@/data/site'
import 'swiper/css'
import 'swiper/css/effect-creative'

export default function HeroCarousel() {
  const heroSlides = useHeroSlides()
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const titleRef = useRef<HTMLDivElement>(null)
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  const animateTitle = useCallback(() => {
    if (!titleRef.current) return
    const chars = titleRef.current.querySelectorAll('.hero-char')

    gsap.fromTo(
      chars,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.025,
        ease: 'power3.out',
      }
    )
  }, [])

  const startProgress = useCallback(() => {
    if (progressInterval.current) clearInterval(progressInterval.current)
    setProgress(0)
    const start = Date.now()
    const duration = 5000

    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(elapsed / duration, 1)
      setProgress(pct)
      if (pct >= 1 && progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }, 30)
  }, [])

  useEffect(() => {
    animateTitle()
    startProgress()
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current)
    }
  }, [animateTitle, startProgress])

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)
    startProgress()

    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.hero-char')
      gsap.fromTo(
        chars,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.02,
          ease: 'power3.out',
          delay: 0.2,
        }
      )
    }
  }

  return (
    <section className="relative w-full overflow-hidden noise-overlay" style={{ height: '100dvh' }}>
      {/* Top gradient — sits above Swiper for nav readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
      <Swiper
        modules={[EffectCreative, Autoplay]}
        effect="creative"
        creativeEffect={{
          prev: {
            translate: [0, 0, -400],
            opacity: 0,
            scale: 0.92,
          },
          next: {
            translate: ['100%', 0, 0],
            opacity: 1,
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1200}
        loop
        onSlideChange={handleSlideChange}
        className="hero-swiper"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full" style={{ height: '100dvh' }}>
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover scale-105"
                loading={slide.id === 'hero-1' ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 pb-20 md:pb-24 pointer-events-none">
        <div ref={titleRef} className="max-w-[1400px] mx-auto">
          <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-light leading-[0.95] text-white tracking-wide mb-4">
            {siteConfig.name.split('').map((char, i) => (
              <span key={i} className="hero-char inline-block" style={{ opacity: 0 }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          <div className="w-12 h-[1px] bg-accent mb-4 opacity-80" />
          <p className="font-body text-[11px] md:text-[13px] font-medium text-white/70 uppercase tracking-[0.25em]">
            {siteConfig.tagline}
          </p>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 right-6 md:right-10 z-10 flex flex-col items-end gap-3">
        <span className="font-body text-[11px] text-white/50 tracking-widest mb-2">
          {String(activeIndex + 1).padStart(2, '0')}{' '}
          <span className="text-white/30">/</span>{' '}
          {String(heroSlides.length).padStart(2, '0')}
        </span>
        {heroSlides.map((_, i) => (
          <div key={i} className="relative w-8 h-[2px] bg-white/20 overflow-hidden">
            {i === activeIndex && (
              <div
                className="absolute inset-y-0 left-0 bg-accent"
                style={{ width: `${progress * 100}%`, transition: 'width 0.03s linear' }}
              />
            )}
            {i < activeIndex && <div className="absolute inset-0 bg-white/40" />}
          </div>
        ))}
      </div>

      {/* Scroll Prompt — hidden on mobile */}
      <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 animate-bounce">
        <span className="font-body text-[9px] text-white/40 uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown size={14} className="text-white/40" />
      </div>
    </section>
  )
}
