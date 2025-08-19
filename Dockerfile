# ----------------------------
# 1. Dependencies
# ----------------------------
FROM oven/bun:alpine AS deps
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ----------------------------
# 2. Builder
# ----------------------------
FROM oven/bun:alpine AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --ci --frozen-lockfile

COPY . .
RUN bun run build --mode=production

# ----------------------------
# 3. Runtime
# ----------------------------
FROM oven/bun:alpine AS runtime
WORKDIR /app
ENV PORT=3000

# Copy ONLY the built output
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["bun", "run", ".output/server/index.mjs"]