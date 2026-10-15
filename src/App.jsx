import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { ApplyProvider } from './lib/applyContext'
import { scrollToId, scrollTop, startSmoothScroll } from './lib/scroll'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileCTA from './components/MobileCTA'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'
import Home from './pages/Home'
import ApplicationReceived from './pages/ApplicationReceived'
import { Privacy, Terms } from './pages/Policies'
import NotFound from './pages/NotFound'

function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // wait for the page to render before scrolling to a section
      const t = setTimeout(() => scrollToId(id, { immediate: true }), 60)
      return () => clearTimeout(t)
    }
    scrollTop()
  }, [pathname, hash])
  return null
}

export default function App() {
  useEffect(() => startSmoothScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <ApplyProvider>
        <RouteEffects />
        <Preloader />
        <Cursor />
        <ScrollProgress />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/application-received" element={<ApplicationReceived />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <MobileCTA />
      </ApplyProvider>
    </MotionConfig>
  )
}
