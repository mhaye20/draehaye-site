import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://draehaye.netlify.app'
const OG_IMAGE = 'https://images.squarespace-cdn.com/content/v1/635972523daff54c9ff48d5e/a6c3d28b-9487-43c2-afde-3a81bb58a777/IMG_4585-Edit.jpg?format=1500w'

interface SEOProps {
  title?: string
  description?: string
  path?: string
  type?: string
}

export default function SEO({
  title,
  description = 'Andrae "Drae" Haye is a Brooklyn & New York City based photographer specializing in portraiture, fashion, street, and lifestyle photography. Available for editorial, commercial, and personal projects.',
  path = '',
  type = 'website',
}: SEOProps) {
  const fullTitle = title
    ? `${title} | Drae Haye — NYC Photographer`
    : 'Drae Haye — Brooklyn & NYC Photographer | Portraits, Fashion, Street Photography'
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1500" />
      <meta property="og:image:height" content="1000" />
      <meta property="og:site_name" content="Drae Haye Photography" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* Geo */}
      <meta name="geo.region" content="US-NY" />
      <meta name="geo.placename" content="Brooklyn, New York" />

      {/* Additional */}
      <meta name="author" content="Andrae Haye" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  )
}
