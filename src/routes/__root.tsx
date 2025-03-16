import type { getUser } from '@/server/auth'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultErrorBoundary } from '@/components/common/default-error-boundary'
import { LoadingScreen } from '@/components/common/loading-screen'
import { NavBar } from '@/components/common/nav-bar'
import { NotFound } from '@/components/common/not-found'
import { getUserOptions } from '@/server/auth'
import styles from '@/styles.css?url'
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import { ThemeProvider } from 'next-themes'
import { lazy, Suspense } from 'react'
import { Toaster } from 'sonner'

// Lazy load Router devtools in development mode
const TanStackRouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )
  : () => null

// Lazy load Query devtools in development mode
const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((res) => ({
        default: res.ReactQueryDevtools,
      })),
    )
  : () => null

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  user: Awaited<ReturnType<typeof getUser>>
}>()({
  beforeLoad: async ({ context }) => {
    // Get user in root route and pass it to the context
    const user = await context.queryClient.fetchQuery(getUserOptions())
    return { user }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Template',
      },
      {
        name: 'description',
        content:
          'TanStack Start Template with Better Auth, TypeScript, Tailwind CSS, Shadcn UI, and Drizzle ORM',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: styles,
      },
    ],
  }),
  /**
   * ! Should not be needed anymore since we're are creating the query client instance along with the router
   */
  // onEnter: ({ context }) => {
  //   // Remove all queries when opening the page to avoid hydration errors
  //   context.queryClient.removeQueries()
  // },
  pendingComponent: () => <LoadingScreen />,
  errorComponent: (props) => <DefaultErrorBoundary {...props} />,
  notFoundComponent: (props) => <NotFound {...props} />,
  component: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
        {import.meta.env.DEV && (
          <script src="https://unpkg.com/react-scan/dist/auto.global.js" />
        )}
      </head>
      <body
        className="text-foreground from-background to-muted/30 flex min-h-screen flex-col bg-gradient-to-b antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" enableColorScheme enableSystem>
          <header>
            <NavBar />
          </header>

          <main className="flex flex-col p-8">{children}</main>

          <Toaster richColors />
        </ThemeProvider>

        <Suspense>
          <ReactQueryDevtools />
          <TanStackRouterDevtools />
        </Suspense>

        <Scripts />
      </body>
    </html>
  )
}
