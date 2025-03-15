import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/todo')({
  head: () => ({
    meta: [
      {
        title: 'Todos',
      },
    ],
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
