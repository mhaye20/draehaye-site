import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(false)
  const [label, setLabel] = useState('')
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()

    if (isTouch) return

    const cursor = cursorRef.current
    if (!cursor) return

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3' })

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const hoverable = target.closest('[data-cursor]')
      if (hoverable) {
        setHovering(true)
        setLabel(hoverable.getAttribute('data-cursor') || '')
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const hoverable = target.closest('[data-cursor]')
      if (hoverable) {
        setHovering(false)
        setLabel('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        width: hovering ? '90px' : '10px',
        height: hovering ? '90px' : '10px',
        borderRadius: '50%',
        backgroundColor: hovering ? 'rgba(0, 0, 0, 0.75)' : 'var(--color-charcoal)',
        backdropFilter: hovering ? 'blur(4px)' : 'none',
        mixBlendMode: hovering ? 'normal' : 'difference',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1), height 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, backdrop-filter 0.3s, mix-blend-mode 0.1s',
      }}
    >
      {hovering && label && (
        <span
          style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'white',
            opacity: hovering ? 1 : 0,
            transition: 'opacity 0.2s 0.15s',
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
