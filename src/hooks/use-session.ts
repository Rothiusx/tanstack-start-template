import { getSessionOptions } from '@/server/auth'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'

export function useContextSession() {
  const session = useRouteContext({
    from: '__root__',
    select: ({ session }) => session,
  })
  return session
}

export function useSession() {
  const context = useRouteContext({
    from: '__root__',
    select: ({ session, locale }) => ({ session, locale }),
  })

  const {
    data: { session },
  } = useSuspenseQuery({
    ...getSessionOptions(),
    initialData: context,
  })

  return session
}
