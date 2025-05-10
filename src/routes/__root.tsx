import type { getUser } from '@/server/auth'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultErrorBoundary } from '@/components/common/default-error-boundary'
import { LoadingScreen } from '@/components/common/loading-screen'
import { NavBar } from '@/components/common/nav-bar'
import { NotFound } from '@/components/common/not-found'
import { TooltipProvider } from '@/components/ui/tooltip'
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

// Lazy load router devtools in development
const TanStackRouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )
  : () => null

// Lazy load query devtools in development
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
    const user = await context.queryClient.ensureQueryData(getUserOptions())
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
        title: import.meta.env.VITE_APP_TITLE,
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/30 text-foreground antialiased">
        <ThemeProvider attribute="class" enableColorScheme enableSystem>
          <TooltipProvider>
            <header className="sticky top-0 z-50">
              <NavBar />
            </header>

            <main className="flex flex-col p-8">{children}</main>

            <Toaster richColors />
          </TooltipProvider>
        </ThemeProvider>

        {import.meta.env.DEV && (
          <Suspense>
            <ReactQueryDevtools />
            <TanStackRouterDevtools />
          </Suspense>
        )}

        <Scripts />
      </body>
    </html>
  )
}
