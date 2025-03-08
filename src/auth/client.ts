import type { auth } from '.'
import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>(), adminClient()],
})

export const { signIn, signOut, signUp } = authClient

export type ClientSession = typeof authClient.$Infer.Session
