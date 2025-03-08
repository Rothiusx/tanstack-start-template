# TanStack Start Template App

This is a starter app for TanStack Start with basic TODO app and using Better Auth for authentication

## Getting Started

1. Create a `.env` file in the root directory and copy the contents from `.env.example`
2. Generate an OpenSSL key (or use https://www.better-auth.com/docs/installation to generate one)
3. Set the generated secret key as the `BETTER_AUTH_SECRET` environment variable in your `.env` file
4. If using Discord authentication, add your Discord Client ID and Secret to the `.env` file

Push the database schema:

```bash
npm run db:push
# or
yarn db:push
# or
pnpm db:push
# or
bun db:push
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
