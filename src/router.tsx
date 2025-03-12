import { LoadingScreen } from '@/components/layout/loading-screen'
import { routeTree } from '@/routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import '@/styles.css'

// Create a new query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
})

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
    defaultStructuralSharing: true,
    context: {
      queryClient,
      session: null,
      locale: undefined,
    },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultPendingMinMs: 0,
    defaultPendingComponent: () => <LoadingScreen />,
  })
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
