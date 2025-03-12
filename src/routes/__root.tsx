import type { getSession } from '@/server/auth'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultErrorBoundary } from '@/components/layout/default-error-boundary'
import { NavBar } from '@/components/layout/nav-bar'
import { NotFound } from '@/components/layout/not-found'
import { queryClient } from '@/router'
import { getSessionOptions } from '@/server/auth'
import styles from '@/styles.css?url'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  ScriptOnce,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  session: Awaited<ReturnType<typeof getSession>>['session']
  locale: Awaited<ReturnType<typeof getSession>>['locale']
}>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TanStack Start Template with Better Auth' },
    ],
    links: [{ rel: 'stylesheet', href: styles }],
  }),

  beforeLoad: async ({ context }) => {
    // Get session and locale in root route and pass it to the context if session is not already set
    const { session, locale } =
      await context.queryClient.fetchQuery(getSessionOptions())
    return {
      session,
      locale,
    }
  },
  /**
   * ! Should not be needed for now, enable if encountering hydration errors
   */
  onEnter: ({ context }) => {
    // Remove all queries when opening the page to avoid hydration errors
    context.queryClient.removeQueries()
  },
  errorComponent: (props) => <DefaultErrorBoundary {...props} />,
  notFoundComponent: (props) => <NotFound {...props} />,
  component: () => (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        > */}
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
        {/* </ThemeProvider> */}
      </QueryClientProvider>
    </RootDocument>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ScriptOnce>
          {`
            const root = document.documentElement;
            const theme = localStorage.getItem('theme');
            root.classList.add('dark');
            if (theme === 'light') {
              root.classList.remove('dark');
            } else if (theme === 'system' || !theme) {
              if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
                root.classList.remove('dark');
              }
            }
          `}
        </ScriptOnce>
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
