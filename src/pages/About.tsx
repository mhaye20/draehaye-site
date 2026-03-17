import { useEffect, useRef } from 'react'
import SEO from '@/components/SEO'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, Mail, MapPin } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { useSiteSettings } from '@/hooks/useSanity'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const settings = useSiteSettings()
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        const img = imageRef.current.querySelector('img')
        if (img) {
          gsap.to(img, {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        }

        gsap.from(imageRef.current, {
          clipPath: 'inset(100% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
          },
        })
      }

      gsap.from('.about-title-char', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: 'power3.out',
        delay: 0.2,
      })

      gsap.from('.about-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.6,
      })

      gsap.from('.about-bio-line', {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-bio',
          start: 'top 85%',
        },
      })

      gsap.from('.about-social', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-socials',
          start: 'top 92%',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen pb-16 md:pb-24">
      <SEO
        title="About"
        description="Meet Andrae Drae Haye — a Brooklyn, New York City based photographer specializing in portraiture, fashion, and lifestyle photography. Capturing subjects in personal and intimate ways."
        path="/about"
      />
      <div className="nav-spacer" />

      <div ref={containerRef} className="page-container">
        <div style={{ marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <h1 className="font-display font-light text-charcoal" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: 0.95, marginBottom: '1rem' }}>
            {'About'.split('').map((char, i) => (
              <span key={i} className="about-title-char inline-block">
                {char}
              </span>
            ))}
          </h1>
          <p className="about-subtitle font-body font-medium uppercase text-accent" style={{ fontSize: '11px', letterSpacing: '0.25em' }}>
            {settings.tagline}
          </p>
        </div>

        <div className="about-split-grid">
          <div>
            <div ref={imageRef} className="overflow-hidden">
              <img
                src={settings.aboutPhoto}
                alt="Andrae Haye — Photographer"
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', transform: 'scale(1.1)' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '0.5rem' }}>
            <div className="about-bio" style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <p className="about-bio-line font-body text-charcoal/75" style={{ fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                {settings.bio}
              </p>
              <p className="about-bio-line font-body text-charcoal/75" style={{ fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Based in Brooklyn, Andrae draws inspiration from the rhythm and energy of New York
                City — its people, its textures, its light. Every frame tells a story of authenticity
                and connection.
              </p>
              <p className="about-bio-line font-body text-charcoal/75" style={{ fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.8 }}>
                Available for editorial, commercial, and personal projects worldwide.
              </p>
            </div>

            <div className="bg-accent/30" style={{ width: '60px', height: '1px', marginBottom: '2rem' }} />

            <div className="about-socials" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <a href={`mailto:${siteConfig.email}`} className="about-social font-body text-charcoal/60 hover:text-charcoal transition-colors duration-300" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'clamp(14px, 2vw, 15px)', minHeight: '44px' }}>
                <Mail size={17} strokeWidth={1.5} className="text-accent" />
                <span className="animated-underline">{siteConfig.email}</span>
              </a>
              <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className="about-social font-body text-charcoal/60 hover:text-charcoal transition-colors duration-300" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'clamp(14px, 2vw, 15px)', minHeight: '44px' }}>
                <Instagram size={17} strokeWidth={1.5} className="text-accent" />
                <span className="animated-underline">{siteConfig.instagram.handle}</span>
              </a>
              <div className="about-social font-body text-charcoal/40" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'clamp(14px, 2vw, 15px)' }}>
                <MapPin size={17} strokeWidth={1.5} className="text-accent/50" />
                {siteConfig.location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
