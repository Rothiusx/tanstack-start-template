import { db } from '@/db'
import { userPermissionMiddleware } from '@/middleware/auth'
import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'

/**
 * ! Server function to get all users
 */
export const getUsers = createServerFn({ method: 'GET' })
  .middleware([userPermissionMiddleware])
  .handler(async () => {
    const users = await db.query.user.findMany()

    return users
  })

export function getUsersOptions() {
  return queryOptions({
    queryKey: ['users'],
    queryFn: ({ signal }) => getUsers({ signal }),
  })
}
