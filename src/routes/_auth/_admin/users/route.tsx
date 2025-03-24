import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_admin/users')({
  component: UsersLayout,
})

function UsersLayout() {
  return (
    <section className="container mx-auto flex flex-col items-center gap-4">
      <Outlet />
    </section>
  )
}
