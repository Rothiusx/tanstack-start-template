import type { QueryClient } from '@tanstack/react-query'
import { NavBar } from '@/components/layout/nav-bar'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { queryClient } from '@/router'
import { getSession } from '@/server/functions/auth'
import styles from '@/styles.css?url'
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
  session: Awaited<ReturnType<typeof getSession>>
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
      {
        suppressHydrationWarning: true,
      },
    ],
  }),
  beforeLoad: async ({ context }) => {
    if (!context.session) {
      const session = await getSession()
      return {
        session,
      }
    }
  },
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
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </ThemeProvider>
      </QueryClientProvider>
    </RootDocument>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
