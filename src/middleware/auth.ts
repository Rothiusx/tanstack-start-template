import { auth } from '@/auth'
import { createMiddleware } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'
import { ERROR_CODES } from 'better-auth/plugins'
import { loggerMiddleware } from './logger'

// https://tanstack.com/start/latest/docs/framework/react/middleware
// This is a sample middleware that you can use in your server functions.

/**
 * Middleware to force authentication on a server function, and add the user to the context.
 */
export const authMiddleware = createMiddleware()
  .middleware([loggerMiddleware])
  .server(async ({ next }) => {
    const { headers } = getWebRequest()!

    const session = await auth.api.getSession({
      headers,
      query: {
        // ensure session is fresh
        // https://www.better-auth.com/docs/concepts/session-management#session-caching
        disableCookieCache: true,
      },
    })

    if (!session) {
      throw new Error(ERROR_CODES.UNAUTHORIZED_SESSION)
    }

    return next({ context: { session } })
  })
