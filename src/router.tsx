import { routeTree } from '@/routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { DefaultErrorBoundary } from './components/layout/default-error-boundary'
import { LoadingScreen } from './components/layout/loading-screen'
import { NotFound } from './components/layout/not-found'
import '@/styles.css'

// Create a new query client
// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60,
//     },
//   },
// })

// Create a new router instance
export function createRouter() {
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
      defaultPendingComponent: () => <LoadingScreen />,
      defaultErrorComponent: (props) => <DefaultErrorBoundary {...props} />,
      defaultNotFoundComponent: (props) => <NotFound {...props} />,
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
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
