import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'
import { auth } from '@/lib/auth'
import { sleep } from '@/lib/utils'
import { authMiddleware } from '@/middleware/auth'
import { userUpdateSchema } from '@/validation/auth'

/**
 * ! Server function to get user session
 */
export const getUser = createServerFn({ method: 'GET' }).handler(async () => {
  const { headers } = getWebRequest()
  const session = await auth.api.getSession({ headers })

  // const language = headers.get('accept-language')?.split(',')[0] ?? 'en-US'
  return session?.user ?? null
})

export function getUserOptions() {
  return queryOptions({
    queryKey: ['user'],
    queryFn: ({ signal }) => getUser({ signal }),
  })
}

/**
 * ! Update public information of current user
 */
export const updateUser = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(userUpdateSchema)
  .handler(async ({ data, context }) => {
    const { headers } = getWebRequest()
    const { email, ...user } = data
    try {
      if (email !== context.session.user.email) {
        await auth.api.changeEmail({ headers, body: { newEmail: email } })
      }
      await auth.api.updateUser({ headers, body: user })

      await sleep()

      return {
        data,
        message: 'Profile updated successfully',
      }
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to update profile',
      )
    }
  })
