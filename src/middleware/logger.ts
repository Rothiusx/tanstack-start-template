import { createMiddleware } from '@tanstack/react-start'
import { getHeaders, getWebRequest } from '@tanstack/react-start/server'
import { pino } from 'pino'
import pretty from 'pino-pretty'

/**
 * Logger instance for the middleware
 */
const stream = pretty({
  colorize: true,
})
const logger = pino(stream)

/**
 * Middleware for request logging
 */
export const loggerMiddleware = createMiddleware({ type: 'function' }).server(
  ({ next }) => {
    const request = getWebRequest()
    const headers = getHeaders()

    logger.info({
      method: request?.method,
      url: request?.url,
      headers,
    })

    return next()
  },
)
