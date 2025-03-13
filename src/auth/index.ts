import { db } from '@/db'
import { user } from '@/db/schemas'
import env from '@/env'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, openAPI } from 'better-auth/plugins'
import { eq } from 'drizzle-orm'
import { ac, roles } from './permissions'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  plugins: [
    admin({
      ac,
      roles,
    }),
    openAPI(),
  ],
  // session: {
  //   cookieCache: {
  //     enabled: true,
  //     maxAge: 60, // 5 minutes
  //   },
  // },
  user: {
    changeEmail: {
      enabled: true,
    },
    additionalFields: {
      age: {
        type: 'number',
        required: false,
      },
      city: {
        type: 'string',
        required: false,
      },
      language: {
        type: ['en', 'cs'],
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    discord: {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    },
  },
  databaseHooks: {
    user: {
      update: {
        after: async (ctx) => {
          await db
            .update(user)
            .set({ updatedAt: new Date() })
            .where(eq(user.id, ctx.id))
        },
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session

export type User = typeof auth.$Infer.Session.user
