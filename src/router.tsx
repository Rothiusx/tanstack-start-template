import { LoadingScreen } from '@/components/layout/loading-screen'
import { routeTree } from '@/routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import '@/styles.css'

export const queryClient = new QueryClient()

// Create a new router instance
export function createRouter() {
  const router = createTanstackRouter({
    routeTree,
    scrollRestoration: true,
    context: {
      queryClient,
      session: null,
    },
    defaultPreload: 'intent',
    defaultStaleTime: 0,
    defaultPendingComponent: () => <LoadingScreen />,
    defaultErrorComponent: ({ error }) => <div>{error.message}</div>,
  })
  return router
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
