import { loggerMiddleware } from '@/middleware/logger'
import { registerGlobalMiddleware } from '@tanstack/react-start'

registerGlobalMiddleware({
  middleware: [loggerMiddleware],
})
