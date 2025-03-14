import type { auth } from '@/lib/auth'
import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BASE_URL,
  plugins: [inferAdditionalFields<typeof auth>(), adminClient()],
})

export const { signIn, signOut, signUp } = authClient
