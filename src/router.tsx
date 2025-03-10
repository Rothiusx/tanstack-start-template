import { LoadingScreen } from '@/components/layout/loading-screen'
import { routeTree } from '@/routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import '@/styles.css'

// Create a new query client
export const queryClient = new QueryClient()

// Register the default error for the query client
declare module '@tanstack/react-query' {
  interface Register {
    defaultError: {
      result: {
        message?: string
      }
      context: unknown
    }
  }
}

// Create a new router instance
export function createRouter() {
  return createTanstackRouter({
    routeTree,
    scrollRestoration: true,
    context: {
      queryClient,
    },
    defaultPreload: 'intent',
    defaultPendingMinMs: 0,
    defaultPendingComponent: () => <LoadingScreen />,
    defaultErrorComponent: ({ error }) => <div>{error.message}</div>,
  })
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
