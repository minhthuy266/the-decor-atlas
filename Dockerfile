# Sử dụng base image Node.js thu gọn
FROM node:20-alpine AS base

# Cài đặt libc6-compat (yêu cầu của một số lib C++ trên Alpine)
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Stage 1: Cài đặt dependencies (chỉ khi có thay đổi package.json)
FROM base AS deps
WORKDIR /app

# Copy lockfile và cài đặt
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build source code Next.js
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collect telemetry during build. Vô hiệu hoá.
ENV NEXT_TELEMETRY_DISABLED=1

# Cần GHOST_URL và GHOST_KEY tại lúc build nếu muốn static generation.
# Các ARG này có thể pass qua docker build --build-arg
ARG GHOST_URL
ARG GHOST_KEY
ENV GHOST_URL=$GHOST_URL
ENV GHOST_KEY=$GHOST_KEY

RUN npm run build

# Stage 3: Runner - Image chạy production (chỉ chứa file đã build)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Tự động copy thư mục public nếu có
COPY --from=builder /app/public ./public

# Setup quyền cho các file tĩnh cache của Next
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Tối ưu: Next.js 'standalone' chỉ copy file server gọn nhẹ
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js tự động được sinh ra bởi ouput: 'standalone'
CMD ["node", "server.js"]
