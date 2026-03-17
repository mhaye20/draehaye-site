import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete()
        },
      })

      // Letters fade in with stagger
      tl.to('.preloader-letter', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      })
        // Tagline fades in
        .to('.preloader-tagline', {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.2')
        // Hold for a moment
        .to({}, { duration: 0.5 })
        // Everything fades out
        .to(['.preloader-letter', '.preloader-tagline'], {
          opacity: 0,
          y: -15,
          duration: 0.35,
          stagger: 0.02,
          ease: 'power2.in',
        })
        // Preloader slides up
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.7,
          ease: 'power3.inOut',
        }, '-=0.15')
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div ref={containerRef} className="preloader">
      <div className="flex items-center gap-1">
        {'DRAE'.split('').map((letter, i) => (
          <span key={i} className="preloader-letter">
            {letter}
          </span>
        ))}
      </div>
      <p className="preloader-tagline">Photography</p>
    </div>
  )
}
