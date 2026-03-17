# Drae Haye Photography

A modern, animated photographer portfolio website for [Andrae "Drae" Haye](https://instagram.com/drae4k), a Brooklyn-based photographer specializing in portraiture, fashion, street, and lifestyle photography.

**Live site:** [draehaye.netlify.app](https://draehaye.netlify.app)
**CMS Studio:** [draehaye.sanity.studio](https://draehaye.sanity.studio)

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** — Utility-first styling
- **GSAP** + **ScrollTrigger** — Scroll animations, text reveals, image unveils
- **Framer Motion** — Page transitions, layout animations
- **Swiper.js** — Hero carousel with creative transitions
- **Lenis** — Smooth scrolling
- **Sanity.io** — Headless CMS for photo/content management
- **Netlify** — Hosting, serverless functions, form handling
- **Twilio** — SMS notifications on contact form submissions

## Features

- Full-screen hero carousel with parallax transitions
- Masonry portfolio grid with category filtering and lightbox
- Scroll-triggered image reveal animations (clip-path + scale)
- Custom cursor that morphs on interactive elements
- Preloader animation
- Responsive design (mobile-first)
- Contact form with email (Netlify Forms) + SMS notifications (Twilio)
- Honeypot spam protection
- CMS-managed content — photos, categories, carousel, about page

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── hero/          # Hero carousel
│   ├── layout/        # Navigation, Footer, SmoothScroll, PageTransition
│   ├── portfolio/     # PortfolioGrid, CategoryFilter, Lightbox
│   └── ui/            # CustomCursor, Preloader
├── data/              # Fallback data (used when Sanity is empty)
├── hooks/             # useSanity hooks for CMS data fetching
├── lib/               # Sanity client config
├── pages/             # Home, Work, About, Contact, Privacy, Terms
└── index.css          # Global styles, Tailwind config
netlify/
└── functions/         # SMS notification serverless function
```

## CMS (Sanity)

The Sanity Studio at [draehaye.sanity.studio](https://draehaye.sanity.studio) manages:

- **Hero Carousel Slides** — Add/remove/reorder home page carousel images
- **Photo Categories** — Create and manage portfolio categories
- **Photos** — Upload photos, assign categories, toggle "Featured" for home page
- **Site Settings** — About page photo, bio text, tagline

The studio project lives in a separate repo at `../draehaye-studio/`.

## Deployment

```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

## Environment Variables (Netlify)

- `TWILIO_ACCOUNT_SID` — Twilio account SID
- `TWILIO_AUTH_TOKEN` — Twilio auth token
- `TWILIO_PHONE_NUMBER` — Twilio sender number
- `NOTIFY_PHONE_NUMBER` — Drae's phone number for SMS alerts
