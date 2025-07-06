import { registerGlobalMiddleware } from '@tanstack/react-start'
import { loggerMiddleware } from '@/middleware/logger'

registerGlobalMiddleware({
  middleware: [loggerMiddleware],
})
