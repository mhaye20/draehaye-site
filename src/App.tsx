import { useState, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SmoothScroll from '@/components/layout/SmoothScroll'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/layout/PageTransition'
import CustomCursor from '@/components/ui/CustomCursor'
import Preloader from '@/components/ui/Preloader'

const Home = lazy(() => import('@/pages/Home'))
const Work = lazy(() => import('@/pages/Work'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const Terms = lazy(() => import('@/pages/Terms'))

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-6 h-6 border border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <SmoothScroll>
        <CustomCursor />
        <Navigation />

        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/work"
                element={
                  <PageTransition>
                    <Work />
                  </PageTransition>
                }
              />
              <Route
                path="/about"
                element={
                  <PageTransition>
                    <About />
                  </PageTransition>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageTransition>
                    <Contact />
                  </PageTransition>
                }
              />
              <Route
                path="/privacy"
                element={
                  <PageTransition>
                    <Privacy />
                  </PageTransition>
                }
              />
              <Route
                path="/terms"
                element={
                  <PageTransition>
                    <Terms />
                  </PageTransition>
                }
              />
            </Routes>
          </Suspense>
        </AnimatePresence>

        <Footer />
      </SmoothScroll>
    </>
  )
}
