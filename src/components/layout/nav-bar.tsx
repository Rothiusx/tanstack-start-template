import { BetterAuthIcon } from '@/components/icons/better-auth'
import { DrizzleIcon } from '@/components/icons/drizzle'
import { ShadcnIcon } from '@/components/icons/shadcn'
import { TanStackIcon } from '@/components/icons/tanstack'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUser } from '@/hooks/use-user'
import { Link } from '@tanstack/react-router'
import { ClipboardList, Home, Loader2, Menu, ShieldUser } from 'lucide-react'
import { Suspense } from 'react'
import { ThemeToggle } from './theme-toggle'
import { UserMenu } from './user-menu'

export function NavBar() {
  const user = useUser()

  const links = user
    ? [
        {
          to: '/todo' as const,
          label: 'Todos',
          icon: <ClipboardList className="size-6" />,
        },
        ...(user.role === 'admin'
          ? [
              {
                to: '/admin',
                label: 'Admin',
                icon: <ShieldUser className="size-6" />,
              },
            ]
          : []),
      ]
    : []

  return (
    <nav className="bg-secondary text-secondary-foreground m-1 flex h-12 items-center rounded-sm border-b px-4 shadow-lg md:px-6">
      <ul className="flex items-center space-x-4 lg:space-x-6">
        <li>
          <Link to="/" className="mr-6 flex items-center">
            <Home className="size-8" />
          </Link>
        </li>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[
              {
                href: 'https://tanstack.com/',
                icon: <TanStackIcon className="size-5" />,
                label: 'TanStack',
              },
              {
                href: 'https://ui.shadcn.com/',
                icon: <ShadcnIcon className="size-5" />,
                label: 'Shadcn UI',
              },
              {
                href: 'https://better-auth.com/',
                icon: <BetterAuthIcon className="size-5" />,
                label: 'Better Auth',
              },
              {
                href: 'https://orm.drizzle.team/',
                icon: <DrizzleIcon className="size-5" />,
                label: 'Drizzle ORM',
              },
            ].map(({ href, icon, label }) => (
              <DropdownMenuItem key={href} asChild>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {icon}
                  {label}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {links.map(({ to, label, icon }) => (
          <li key={to}>
            <Link
              to={to}
              activeProps={{
                className: 'text-secondary-foreground',
              }}
              className="hover:text-secondary-foreground text-muted-foreground flex items-center gap-2 text-2xl font-medium transition-colors"
            >
              {icon}
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="ml-auto flex items-center space-x-4">
        <span className="mx-4">{user ? user.name : 'Guest'}</span>
        <ThemeToggle />
        <Suspense fallback={<Loader2 className="size-9 animate-spin" />}>
          <UserMenu />
        </Suspense>
      </div>
    </nav>
  )
}
