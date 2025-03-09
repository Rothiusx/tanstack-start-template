import type { Session } from '@/auth'
import { DefaultErrorBoundary } from '@/components/layout/default-error-boundary'
import { NavBar } from '@/components/layout/nav-bar'
import { NotFound } from '@/components/layout/not-found'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { queryClient } from '@/router'
import { getSession } from '@/server/functions/auth'
import styles from '@/styles.css?url'
import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from 'sonner'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  session: Session | null
}>()({
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
        title: 'TanStack Start Template with Better Auth',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: styles,
      },
    ],
  }),

  beforeLoad: async ({ context }) => {
    // Get session in root route and pass it to the context if session is not already set
    if (!context.session) {
      const session = await getSession()
      return {
        session,
      }
    }
  },
  onEnter: async ({ context }) => {
    // Remove all queries when opening the page to avoid hydration errors
    context.queryClient.removeQueries()
  },
  errorComponent: (props) => <DefaultErrorBoundary {...props} />,
  notFoundComponent: (props) => <NotFound {...props} />,
  component: () => (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <NavBar />
          </header>
          <main className="flex flex-col p-8">
            <Outlet />
          </main>
          <Toaster richColors />
          {import.meta.env.DEV && (
            <>
              <TanStackRouterDevtools />
              <ReactQueryDevtools />
            </>
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </RootDocument>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" />
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
