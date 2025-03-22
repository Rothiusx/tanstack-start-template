// src/global-middleware.ts
import {
  createMiddleware,
  registerGlobalMiddleware,
} from '@tanstack/react-start'

export const testMiddleware = createMiddleware().server(({ next }) => {
  console.log('test middleware')
  return next()
})

registerGlobalMiddleware({
  middleware: [testMiddleware],
})
