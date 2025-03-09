import { Link, useRouteContext } from '@tanstack/react-router'
import { ClipboardList, Home, ShieldUser } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { UserMenu } from './user-menu'

export function NavBar() {
  const { session } = useRouteContext({ from: '__root__' })

  const links = session
    ? [
        {
          to: '/todo' as const,
          label: 'TODO',
          icon: <ClipboardList className="size-6" />,
        },
        ...(session.user.role === 'admin'
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
        <ModeToggle />
        <UserMenu user={session?.user} />
      </div>
    </nav>
  )
}
