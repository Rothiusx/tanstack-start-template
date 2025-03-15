import { routeTree } from '@/routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import '@/styles.css'

// Create a new router instance
export function createRouter() {
  // Create a new query client inside the router
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  })
  return routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      context: {
        queryClient,
        user: null,
      },
      scrollRestoration: true,
      defaultStructuralSharing: true,
      defaultPreload: 'intent',
      defaultPreloadStaleTime: 0,
    }),
    queryClient,
  )
}

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
  interface StaticDataRouteOption {
    data: {
      message?: string
    }
  }
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
