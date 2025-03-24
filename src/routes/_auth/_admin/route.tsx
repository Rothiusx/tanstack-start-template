import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_admin')({
  beforeLoad: ({ context }) => {
    if (context.user?.role !== 'user') {
      throw redirect({ to: '/' })
    }
  },
})
