import { getUserOptions } from '@/server/auth'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'

/**
 * Hook to get the user from the root context
 * @returns The user object
 */
export function useContextUser() {
  const user = useRouteContext({
    from: '__root__',
    select: ({ user }) => user,
  })
  return user
}

/**
 * Hook to get the user from from the query client
 * @returns The user object
 */
export function useUser() {
  const user = useContextUser()

  const { data } = useSuspenseQuery({
    ...getUserOptions(),
    initialData: user,
  })

  return data
}
