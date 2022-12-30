# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV HUSKY=0
ENV CI=true

# Install dependencies based on the preferred package manager
COPY package.json .npmrc pnpm-lock.yaml* ./
RUN npm install -g pnpm
RUN if [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG API_BASE_URL
ARG API_DICTIONARY_URL
ARG API_KEY_GIPHY
ARG API_GIPHY_GIF
ARG API_GIPHY_STICKER
ARG API_GIPHY_GIF_TRENDING
ARG API_GIPHY_STICKER_TRENDING

ENV API_BASE_URL=$API_BASE_URL
ENV API_DICTIONARY_URL=$API_DICTIONARY_URL
ENV API_KEY_GIPHY=$API_KEY_GIPHY
ENV API_GIPHY_GIF=$API_GIPHY_GIF
ENV API_GIPHY_STICKER=$API_GIPHY_STICKER
ENV API_GIPHY_GIF_TRENDING=$API_GIPHY_GIF_TRENDING
ENV API_GIPHY_STICKER_TRENDING=$API_GIPHY_STICKER_TRENDING

ENV NEXT_TELEMETRY_DISABLED 1

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 1111

ENV PORT 1111

CMD ["pnpm", "dev"]

