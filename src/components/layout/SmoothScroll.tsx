import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocation } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    lenis.scrollTo(0, { immediate: true })

    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
  }, [location.pathname])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
