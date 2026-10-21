import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

// The build writes per-page title/description/canonical/OG tags into each
// HTML file for crawlers and link previews. Helmet adds the same tags once the
// app renders, so remove the static copies to avoid duplicates.
document.querySelectorAll('head [data-prerender]').forEach((el) => el.remove())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
