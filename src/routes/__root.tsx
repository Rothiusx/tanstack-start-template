import type { getUser } from '@/server/auth'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultErrorBoundary } from '@/components/layout/default-error-boundary'
import { LoadingScreen } from '@/components/layout/loading-screen'
import { NavBar } from '@/components/layout/nav-bar'
import { NotFound } from '@/components/layout/not-found'
import { getUserOptions } from '@/server/auth'
import styles from '@/styles.css?url'
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
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" /> */}
      </head>
      <body
        className="bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        <ScriptOnce>
          {`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
        </ScriptOnce>

        <header>
          <NavBar />
        </header>

        <main className="flex flex-col p-8">{children}</main>

        <Toaster richColors />

        <ReactQueryDevtools />
        <TanStackRouterDevtools />

        <Scripts />
      </body>
    </html>
  )
}
