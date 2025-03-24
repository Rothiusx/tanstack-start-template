import { BetterAuthIcon } from '@/components/icons/better-auth'
import { DrizzleIcon } from '@/components/icons/drizzle'
import { ShadcnIcon } from '@/components/icons/shadcn'
import { TanStackIcon } from '@/components/icons/tanstack'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUser } from '@/hooks/use-user'
import { Link } from '@tanstack/react-router'
import { ClipboardList, Home, Loader2, Menu, ShieldUser } from 'lucide-react'
import { Fragment, Suspense } from 'react'
import { ThemeToggle } from './theme-toggle'
import { UserMenu } from './user-menu'

export function NavBar() {
  const user = useUser()

  const links = [
    {
      to: '/' as const,
      label: 'Home',
      icon: <Home className="size-6" />,
    },
    ...(user
      ? [
          {
            to: '/todo' as const,
            label: 'Todos',
            icon: <ClipboardList className="size-6" />,
          },
          ...(user.role === 'user'
            ? [
                {
                  to: '/users' as const,
                  label: 'Admin',
                  icon: <ShieldUser className="size-6" />,
                },
              ]
            : []),
        ]
      : []),
  ]

  return (
    <nav className="from-secondary to-secondary/90 border-secondary/20 m-2 mb-0 flex h-14 items-center justify-between rounded-lg border bg-gradient-to-r px-4 shadow-lg backdrop-blur-xs md:px-6">
      <div className="flex items-center">
        <div className="hidden md:flex md:items-center md:space-x-2">
          {links.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              activeProps={{
                className:
                  'bg-secondary-foreground/15 text-secondary-foreground',
              }}
              className="hover:bg-secondary-foreground/10 text-muted-foreground flex items-center gap-2 rounded-md px-3 py-1.5 text-xl font-medium transition-all"
            >
              {icon}
              {label}
            </Link>
          ))}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ml-2 md:hidden">
            <Menu className="size-8" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {links.map(({ to, label, icon }, index) => (
              <Fragment key={to}>
                {index > 0 && <DropdownMenuSeparator />}
                <DropdownMenuItem asChild>
                  <Link to={to} className="flex items-center gap-2">
                    {icon}
                    {label}
                  </Link>
                </DropdownMenuItem>
              </Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <TanStackIcon className="size-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {[
              {
                href: 'https://tanstack.com/',
                icon: <TanStackIcon className="size-4" />,
                label: 'TanStack',
              },
              {
                href: 'https://ui.shadcn.com/',
                icon: <ShadcnIcon className="size-4" />,
                label: 'Shadcn UI',
              },
              {
                href: 'https://better-auth.com/',
                icon: <BetterAuthIcon className="size-4" />,
                label: 'Better Auth',
              },
              {
                href: 'https://orm.drizzle.team/',
                icon: <DrizzleIcon className="size-4" />,
                label: 'Drizzle ORM',
              },
            ].map(({ href, icon, label }) => (
              <DropdownMenuItem key={href} asChild>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {icon}
                  <span>{label}</span>
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        <Suspense fallback={<Loader2 className="size-5 animate-spin" />}>
          <UserMenu />
        </Suspense>
      </div>
    </nav>
  )
}
