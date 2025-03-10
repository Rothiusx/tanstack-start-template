import { useRouteContext } from '@tanstack/react-router'

export function useSession() {
  const session = useRouteContext({
    from: '__root__',
    select: ({ session }) => session,
  })
  return session
}
