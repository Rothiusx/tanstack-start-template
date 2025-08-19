import { DefaultErrorBoundary } from '@/components/common/default-error-boundary'
import { LoadingScreen } from '@/components/common/loading-screen'
import { NavBar } from '@/components/common/nav-bar'
import { NotFound } from '@/components/common/not-found'
import { TooltipProvider } from '@/components/ui/tooltip'
import { env } from '@/env'
import {
  ReactQueryDevtoolsPanel,
  TanStackRouterDevtoolsPanel,
} from '@/lib/dev-tools'
import type { getUser } from '@/server/auth'
import { getUserOptions } from '@/server/auth'
import styles from '@/styles.css?url'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { ThemeProvider } from 'next-themes'
import { Suspense } from 'react'
import { Toaster } from 'sonner'

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
        title: env.VITE_APP_TITLE,
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
  shellComponent: RootDocument,
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
            <TanStackDevtools
              config={{
                position: 'bottom-left',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
                {
                  name: 'Tanstack Query',
                  render: <ReactQueryDevtoolsPanel />,
                },
              ]}
            />
          </Suspense>
        )}

        <Scripts />
      </body>
    </html>
  )
}
