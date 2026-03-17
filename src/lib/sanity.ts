import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'dw7eigme',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Queries
export const HERO_SLIDES_QUERY = `*[_type == "heroSlide"] | order(order asc) {
  _id,
  title,
  image,
  order
}`

export const CATEGORIES_QUERY = `*[_type == "category"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  order
}`

export const PHOTOS_QUERY = `*[_type == "photo"] | order(order asc) {
  _id,
  title,
  image,
  "category": category->slug.current,
  "categoryTitle": category->title,
  featured,
  order
}`

export const FEATURED_PHOTOS_QUERY = `*[_type == "photo" && featured == true] | order(order asc) {
  _id,
  title,
  image,
  "category": category->slug.current,
  "categoryTitle": category->title,
  featured,
  order
}`

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  aboutPhoto,
  bio,
  bioSecond,
  bioThird,
  tagline
}`
