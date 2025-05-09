import type { FileRoutesById } from '@/routeTree.gen'
import { getUserOptions } from '@/server/auth'
import { useSuspenseQuery } from '@tanstack/react-query'
import { redirect, useRouteContext } from '@tanstack/react-router'

/**
 * Hook to get the user from the root context
 * @returns The user object
 */
export function useRootContextUser() {
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
export function useUser(route?: keyof FileRoutesById) {
  const user = useRouteContext({
    from: route ?? '__root__',
    select: ({ user }) => user,
  })

  const { data } = useSuspenseQuery({
    ...getUserOptions(),
    initialData: user,
  })

  if (!data && route) {
    throw redirect({ to: '/login' })
  }

  return data
}
