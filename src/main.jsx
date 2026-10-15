import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/barlow-condensed/500.css'
import '@fontsource/barlow-condensed/600.css'
import '@fontsource/barlow-condensed/700.css'
import '@fontsource/manrope/300.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import './styles/index.css'
import App from './App.jsx'
import { IS_PREVIEW } from './lib/env'

// Keep test deployments out of search results
if (IS_PREVIEW && !import.meta.env.DEV) {
  const meta = document.createElement('meta')
  meta.name = 'robots'
  meta.content = 'noindex, nofollow'
  document.head.appendChild(meta)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
