# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy lock files first for layer caching
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install deps (uncomment the one you actually use)
RUN npm install
# RUN yarn install
# RUN corepack enable pnpm && pnpm install

# Copy the rest of the app source
COPY . .

# Build production bundle
RUN npm run build
# RUN yarn build
# RUN pnpm build


# ---------- Runtime stage ----------
FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Copy only what's needed to run
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

# Start Next.js in production mode
CMD ["npm", "run", "start"]
# CMD ["yarn", "start"]
# CMD ["pnpm", "start"]