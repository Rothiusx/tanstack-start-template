import { routeTree } from '@/routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
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
  return routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      scrollRestoration: true,
      defaultStructuralSharing: true,
      context: {
        queryClient,
        user: null,
      },
      defaultPreload: 'intent',
      defaultPreloadStaleTime: 0,
      defaultPendingMinMs: 0,
    }),
    queryClient,
  )
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
