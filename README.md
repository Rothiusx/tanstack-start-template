# TanStack Start Template

[![TanStack](https://img.shields.io/badge/TanStack-Framework-blue)](https://tanstack.com/)

A starter template featuring:

- Implementation of TanStack Start and Router features
- Usage of TanStack query
- Basic implementation of TanStack Table
- Functional TODO application
- Better Auth authentication
- Shadcn UI components
- Drizzle ORM for database operations

## Setup

1. Create a `.env` file in the root directory and copy contents from `.env.example`
2. Set up authentication:
   - Generate an [OpenSSL key](https://www.better-auth.com/docs/installation)
   - Add the key as `BETTER_AUTH_SECRET` in your `.env` file
   - For Discord provider (optional), add `DISCORD_CLIENT_ID` and `DISCORD_CLIENT_SECRET`
3. Configure `VITE_BASE_URL` if needed
4. Update `DATABASE_URL` with your database credentials (or use the provided Docker compose file)

## Quick Start

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

Start the development server:

```bash
npm run db:push
# or
yarn db:push
# or
pnpm db:push
# or
bun db:push
```
