# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy lock files first so Docker can cache installs
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dependencies
RUN npm install
# RUN yarn install
# RUN corepack enable pnpm && pnpm install

# Copy full Strapi source
COPY . .

# Build Strapi admin panel (and TS -> JS if you're using TS)
RUN npm run build
# RUN yarn build
# RUN pnpm build


# ---------- Runtime stage ----------
FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=1337
EXPOSE 1337

# Copy runtime essentials from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Strapi build output (admin panel, compiled code)
COPY --from=builder /app/build ./build

# App source/config Strapi needs at runtime
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public

# Ensure uploads dir exists (we'll mount a volume onto it)
RUN mkdir -p /app/public/uploads

# Start Strapi in production mode
CMD ["npm", "run", "start"]
# CMD ["yarn", "start"]
# CMD ["pnpm", "start"]