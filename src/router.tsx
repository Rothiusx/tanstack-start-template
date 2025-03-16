import { routeTree } from '@/routeTree.gen'
import {
  MutationCache,
  notifyManager,
  QueryClient,
} from '@tanstack/react-query'
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import { toast } from 'sonner'
import superjson from 'superjson'
import { DefaultErrorBoundary } from './components/common/default-error-boundary'
import { LoadingScreen } from './components/common/loading-screen'
import { NotFound } from './components/common/not-found'

// Function to create a new router instance
export function createRouter() {
  // Check if we're running in a browser environment
  if (typeof document !== 'undefined') {
    notifyManager.setScheduler(window.requestAnimationFrame)
  }

  // Create a new query client inside the router
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: {
        serializeData: superjson.serialize,
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
      queries: {
        staleTime: 1000 * 10,
      },
    },
    mutationCache: new MutationCache({
      onSettled: () => {
        if (!queryClient.isFetching() || !queryClient.isMutating()) {
          queryClient.invalidateQueries()
        }
      },
      onError: (error) => {
        if (error.result?.message) {
          toast.error(error.result.message)
        } else if (error.message) {
          toast.error(error.message)
        }
      },
    }),
  })

  // Return a router instance with the query client
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
      defaultPendingComponent: () => <LoadingScreen />,
      defaultNotFoundComponent: (props) => <NotFound {...props} />,
      defaultErrorComponent: (props) => <DefaultErrorBoundary {...props} />,
    }),
    queryClient,
  )
}

// Register the default error for the query client
declare module '@tanstack/react-query' {
  interface Register {
    defaultError: {
      message?: string
      result?: {
        message?: string
      }
      context?: unknown
    }
  }
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
