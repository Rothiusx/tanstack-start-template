import { StartClient } from '@tanstack/react-start'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import reportWebVitals from '@/report-web-vitals'
import { createRouter } from '@/router'

// Import development tools
if (import.meta.env.DEV) {
  import('react-scan').then(({ scan }) => scan({ enabled: true }))
}

const router = createRouter()

hydrateRoot(
  document,
  <StrictMode>
    <StartClient router={router} />
  </StrictMode>,
)

reportWebVitals(console.log)
