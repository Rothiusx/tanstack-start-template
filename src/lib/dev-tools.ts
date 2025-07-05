import { lazy } from 'react'

// Import development tools
export function importDevTools() {
  if (import.meta.env.DEV) {
    import('react-scan').then(({ scan }) => scan({ enabled: true }))
  }
}

// Lazy load router devtools in development
export const TanStackRouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )
  : () => null

// Lazy load query devtools in development
export const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((res) => ({
        default: res.ReactQueryDevtools,
      })),
    )
  : () => null
