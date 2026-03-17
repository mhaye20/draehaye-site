import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Instagram } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import { siteConfig } from '@/data/site'

gsap.registerPlugin(ScrollTrigger)

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScroll = useRef(0)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setScrolled(current > 80)
      setHidden(current > 300 && current > lastScroll.current)
      lastScroll.current = current
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const hasDarkHero = location.pathname === '/' || location.pathname === '/contact'
  const useWhiteText = hasDarkHero && !scrolled && !menuOpen
  const navTextColor = useWhiteText ? 'text-white' : 'text-charcoal'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        } ${scrolled ? 'bg-offwhite/80 backdrop-blur-lg' : hasDarkHero ? 'bg-transparent' : 'bg-offwhite/60 backdrop-blur-md'}`}
      >
        <nav className="flex items-center justify-between px-6 md:px-10 py-5">
          <Link
            to="/"
            className="font-display text-2xl font-light tracking-wider transition-colors duration-300"
            style={{ color: useWhiteText ? '#ffffff' : 'var(--color-charcoal)' }}
          >
            {siteConfig.shortName}
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-body text-[13px] font-medium uppercase tracking-[0.15em] animated-underline transition-colors duration-300"
                style={{ color: useWhiteText ? '#ffffff' : 'var(--color-charcoal)' }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300"
              style={{ color: useWhiteText ? '#ffffff' : 'var(--color-charcoal)' }}
              aria-label="Instagram"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
          </div>

          <button
            className="md:hidden relative z-50 flex flex-col items-center justify-center gap-1.5"
            style={{ width: '44px', height: '44px' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1.5px] transition-all duration-400 ${
                menuOpen ? 'rotate-45 translate-y-[4px]' : ''
              }`}
              style={{ backgroundColor: menuOpen || useWhiteText ? '#ffffff' : 'var(--color-charcoal)' }}
            />
            <span
              className={`block w-6 h-[1.5px] transition-all duration-400 ${
                menuOpen ? '-rotate-45 -translate-y-[2.5px]' : ''
              }`}
              style={{ backgroundColor: menuOpen || useWhiteText ? '#ffffff' : 'var(--color-charcoal)' }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 40,
              backgroundColor: 'var(--color-charcoal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
              {siteConfig.navigation.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.08,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="font-display font-light tracking-wider transition-colors duration-300"
                    style={{ color: '#f5f5f5', fontSize: 'clamp(2rem, 8vw, 2.5rem)' }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ marginTop: '1.5rem' }}
              >
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(245,245,245,0.6)' }}
                >
                  <Instagram size={22} strokeWidth={1.5} />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
