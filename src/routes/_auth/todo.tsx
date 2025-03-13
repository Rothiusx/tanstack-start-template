import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/todo')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' })
    }
  },
  head: () => ({
    meta: [{ title: 'Todo' }],
  }),
  component: Todo,
})

function Todo() {
  return (
    <section className="container mx-auto flex flex-col items-center gap-4">
      <Outlet />
    </section>
  )
}
