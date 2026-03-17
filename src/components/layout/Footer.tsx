import { Link } from 'react-router-dom'
import { Instagram, ArrowUp } from 'lucide-react'
import { siteConfig } from '@/data/site'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-light">
      <div className="page-container" style={{ paddingTop: 'clamp(2rem, 4vw, 3.5rem)', paddingBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
        <div className="footer-grid">
          {/* Left */}
          <div>
            <Link to="/" className="font-display font-light tracking-wider" style={{ fontSize: '1.25rem', color: 'var(--color-charcoal)' }}>
              {siteConfig.shortName}
            </Link>
            <p className="font-body text-muted" style={{ fontSize: '12px', marginTop: '0.25rem' }}>
              {siteConfig.location}
            </p>
          </div>

          {/* Center */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem' }}>
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-body font-medium uppercase text-muted hover:text-charcoal animated-underline transition-colors duration-300"
                style={{ fontSize: '11px', letterSpacing: '0.15em', minHeight: '44px', display: 'flex', alignItems: 'center' }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-charcoal transition-colors duration-300"
              aria-label="Instagram"
              style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Instagram size={16} strokeWidth={1.5} />
            </a>
            <button
              onClick={scrollToTop}
              className="group text-muted hover:text-charcoal transition-colors duration-300"
              data-cursor="TOP"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minHeight: '44px' }}
            >
              <span className="font-body font-medium uppercase" style={{ fontSize: '11px', letterSpacing: '0.15em' }}>Top</span>
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-light)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <p className="font-body" style={{ fontSize: '11px', color: 'var(--color-muted)', opacity: 0.6 }}>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/privacy" className="font-body" style={{ fontSize: '11px', color: 'var(--color-muted)', opacity: 0.5 }}>Privacy Policy</Link>
            <Link to="/terms" className="font-body" style={{ fontSize: '11px', color: 'var(--color-muted)', opacity: 0.5 }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
