import { useState, useEffect } from 'react'
import { client, urlFor, HERO_SLIDES_QUERY, CATEGORIES_QUERY, PHOTOS_QUERY, FEATURED_PHOTOS_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity'
import { heroSlides as fallbackHeroSlides, portfolioImages as fallbackPhotos, categories as fallbackCategories } from '@/data/portfolio'
import { siteConfig } from '@/data/site'
import type { PortfolioImage, PortfolioCategory } from '@/data/portfolio'

interface SanityHeroSlide {
  _id: string
  title: string
  image: any
  order: number
}

interface SanityPhoto {
  _id: string
  title: string
  image: any
  category: string
  categoryTitle: string
  featured: boolean
  order: number
}

interface SanityCategory {
  _id: string
  title: string
  slug: string
  description: string
  order: number
}

interface SanitySettings {
  aboutPhoto: any
  bio: string
  bioSecond: string
  bioThird: string
  tagline: string
}

function useSanityQuery<T>(query: string, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(query)
      .then((result) => {
        if (result && (Array.isArray(result) ? result.length > 0 : true)) {
          setData(result)
        }
      })
      .catch(() => {
        // Use fallback on error
      })
      .finally(() => setLoading(false))
  }, [query])

  return { data, loading }
}

export function useHeroSlides() {
  const { data, loading } = useSanityQuery<SanityHeroSlide[]>(HERO_SLIDES_QUERY, [])

  if (loading || data.length === 0) {
    return fallbackHeroSlides.map((s) => ({ id: s.id, src: s.src, alt: s.alt }))
  }

  return data.map((slide) => ({
    id: slide._id,
    src: urlFor(slide.image).width(1920).quality(85).url(),
    alt: slide.title,
  }))
}

export function useCategories(): PortfolioCategory[] {
  const { data, loading } = useSanityQuery<SanityCategory[]>(CATEGORIES_QUERY, [])

  if (loading || data.length === 0) {
    return fallbackCategories
  }

  return data.map((cat) => ({
    slug: cat.slug,
    title: cat.title,
    description: cat.description || '',
  }))
}

export function usePhotos(): PortfolioImage[] {
  const { data, loading } = useSanityQuery<SanityPhoto[]>(PHOTOS_QUERY, [])

  if (loading || data.length === 0) {
    return fallbackPhotos
  }

  return data.map((photo) => ({
    id: photo._id,
    src: urlFor(photo.image).width(800).quality(80).url(),
    alt: photo.title || photo.categoryTitle || 'Photo',
    category: photo.category as PortfolioImage['category'],
    width: 800,
    height: 1000,
    featured: photo.featured,
  }))
}

export function useFeaturedPhotos(): PortfolioImage[] {
  const { data, loading } = useSanityQuery<SanityPhoto[]>(FEATURED_PHOTOS_QUERY, [])

  if (loading || data.length === 0) {
    return fallbackPhotos.filter((p) => p.featured)
  }

  return data.map((photo) => ({
    id: photo._id,
    src: urlFor(photo.image).width(800).quality(80).url(),
    alt: photo.title || photo.categoryTitle || 'Photo',
    category: photo.category as PortfolioImage['category'],
    width: 800,
    height: 1000,
    featured: true,
  }))
}

export function useSiteSettings() {
  const { data, loading } = useSanityQuery<SanitySettings | null>(SITE_SETTINGS_QUERY, null)

  if (loading || !data) {
    return {
      aboutPhoto: siteConfig.aboutImage,
      bio: siteConfig.bio,
      bioSecond: 'Based in Brooklyn, Andrae draws inspiration from the rhythm and energy of New York City — its people, its textures, its light. Every frame tells a story of authenticity and connection.',
      bioThird: 'Available for editorial, commercial, and personal projects worldwide.',
      tagline: siteConfig.tagline,
    }
  }

  return {
    aboutPhoto: data.aboutPhoto ? urlFor(data.aboutPhoto).width(900).quality(85).url() : siteConfig.aboutImage,
    bio: data.bio || siteConfig.bio,
    bioSecond: data.bioSecond || 'Based in Brooklyn, Andrae draws inspiration from the rhythm and energy of New York City — its people, its textures, its light. Every frame tells a story of authenticity and connection.',
    bioThird: data.bioThird || 'Available for editorial, commercial, and personal projects worldwide.',
    tagline: data.tagline || siteConfig.tagline,
  }
}
