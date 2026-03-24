import { useEffect, useRef, useState } from 'react'
import SEO from '@/components/SEO'
import gsap from 'gsap'
import { Instagram, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { heroSlides } from '@/data/portfolio'

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [botField, setBotField] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.contact-hero-text > *', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      })

      gsap.from('.contact-field', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.5,
      })

      gsap.from('.contact-info-item', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.8,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Bot detected — silently "succeed" without doing anything
    if (botField) {
      setSubmitted(true)
      return
    }

    // Submit to Netlify Forms
    const netlifyBody = new URLSearchParams({
      'form-name': 'contact',
      'bot-field': botField,
      ...formData,
    })

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: netlifyBody.toString(),
      })
    } catch {
      // Netlify form submission failed silently — SMS will still try
    }

    // Send SMS notification (only for real humans)
    try {
      await fetch('/.netlify/functions/notify-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
    } catch {
      // SMS failed silently — form was still captured by Netlify
    }

    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <main ref={containerRef} className="min-h-screen">
      <SEO
        title="Contact"
        description="Hire Andrae Drae Haye for your next photography project in Brooklyn or New York City. Available for portraits, fashion, editorial, commercial, and lifestyle shoots. Get in touch today."
        path="/contact"
      />
      {/* Hero Banner */}
      <section className="relative w-full noise-overlay overflow-hidden" style={{ height: '55vh', minHeight: '350px' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '180px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
        <img
          src={heroSlides[1].src}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.3)',
          }}
        />
        <div
          className="contact-hero-text relative z-10 page-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '100%',
            paddingBottom: 'clamp(2rem, 5vw, 4rem)',
          }}
        >
          <p className="font-body font-medium uppercase text-accent" style={{ fontSize: '11px', letterSpacing: '0.3em', marginBottom: '1rem' }}>
            Get in Touch
          </p>
          <h1 className="font-display font-light text-offwhite" style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)', lineHeight: 1.05 }}>
            Let&apos;s Create<br />
            <span className="italic text-accent">Something</span> Together
          </h1>
        </div>
      </section>

      {/* Form Section */}
      <section className="page-container" style={{ paddingTop: 'clamp(2.5rem, 5vw, 5rem)', paddingBottom: 'clamp(2.5rem, 5vw, 5rem)' }}>
        {!submitted ? (
          <div className="contact-split-grid">
            <div>
              <p className="font-body text-charcoal/60" style={{ fontSize: 'clamp(14px, 2vw, 15px)', lineHeight: 1.8, marginBottom: '2rem' }}>
                Have a project in mind? Whether it&apos;s editorial, commercial, or personal — I&apos;d
                love to hear from you. Let&apos;s bring your vision to life.
              </p>

              <div style={{ width: '40px', height: '1px', marginBottom: '2rem' }} className="bg-accent/40" />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href={`mailto:${siteConfig.email}`} className="contact-info-item font-body text-charcoal/70 hover:text-charcoal transition-colors duration-300" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'clamp(13px, 2vw, 14px)', minHeight: '44px' }}>
                  <Mail size={16} strokeWidth={1.5} className="text-accent" />
                  <span className="animated-underline">{siteConfig.email}</span>
                </a>
                <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className="contact-info-item font-body text-charcoal/70 hover:text-charcoal transition-colors duration-300" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'clamp(13px, 2vw, 14px)', minHeight: '44px' }}>
                  <Instagram size={16} strokeWidth={1.5} className="text-accent" />
                  <span className="animated-underline">{siteConfig.instagram.handle}</span>
                </a>
                <div className="contact-info-item font-body text-charcoal/45" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'clamp(13px, 2vw, 14px)' }}>
                  <MapPin size={16} strokeWidth={1.5} className="text-accent/50" />
                  {siteConfig.location}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} name="contact" data-netlify="true" data-netlify-honeypot="bot-field">
              <input type="hidden" name="form-name" value="contact" />
              <p style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                <label>Don&apos;t fill this out: <input name="bot-field" value={botField} onChange={(e) => setBotField(e.target.value)} /></label>
              </p>
              <div className="contact-form-row" style={{ marginBottom: '1.5rem' }}>
                <div className="contact-field floating-field">
                  <input type="text" name="name" id="name" placeholder=" " required value={formData.name} onChange={handleChange} />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="contact-field floating-field">
                  <input type="email" name="email" id="email" placeholder=" " required value={formData.email} onChange={handleChange} />
                  <label htmlFor="email">Email</label>
                </div>
              </div>

              <div className="contact-field floating-field" style={{ marginBottom: '1.5rem' }}>
                <input type="text" name="subject" id="subject" placeholder=" " required value={formData.subject} onChange={handleChange} />
                <label htmlFor="subject">Subject</label>
              </div>

              <div className="contact-field floating-field" style={{ marginBottom: '2rem' }}>
                <textarea name="message" id="message" placeholder=" " required rows={4} value={formData.message} onChange={handleChange} />
                <label htmlFor="message">Message</label>
              </div>

              <label className="contact-field" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '2rem', cursor: 'pointer' }}>
                <input type="checkbox" required style={{ marginTop: '3px', accentColor: 'var(--color-accent)' }} />
                <span className="font-body" style={{ fontSize: '13px', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                  By submitting this form, I agree to the <a href="/privacy" target="_blank" style={{ color: 'var(--color-accent)' }}>Privacy Policy</a> and <a href="/terms" target="_blank" style={{ color: 'var(--color-accent)' }}>Terms & Conditions</a>. I consent to being contacted regarding my inquiry. I understand that submitting this form will trigger an SMS notification to the business owner to alert them of my inquiry. No SMS messages will be sent to me. Message and data rates may apply.
                </span>
              </label>

              <button
                type="submit"
                className="contact-field group font-body font-medium uppercase overflow-hidden submit-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2.5rem',
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  minHeight: '48px',
                  backgroundColor: 'var(--color-charcoal)',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span>Send Message</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <h3 className="font-display font-light text-charcoal" style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', marginBottom: '1rem' }}>
              Thank you.
            </h3>
            <p className="font-body text-muted" style={{ fontSize: '15px' }}>
              Your message has been received. I&apos;ll be in touch soon.
            </p>
            <div className="bg-accent mx-auto" style={{ width: '30px', height: '1px', marginTop: '2rem' }} />
          </div>
        )}
      </section>
    </main>
  )
}
