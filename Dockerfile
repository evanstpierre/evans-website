# ----------------------
# Base (shared)
# ----------------------
FROM node:22-alpine AS base
WORKDIR /app
# don't set NODE_ENV here; each stage will override it

# ----------------------
# Dependencies (uses npm ci for reproducible installs)
# ----------------------
FROM base AS deps
# Install *all* deps here (dev + prod)
COPY package*.json ./
RUN npm ci

# ----------------------
# Dev image (hot reload)
# ----------------------
FROM deps AS dev
ENV NODE_ENV=development \
    CHOKIDAR_USEPOLLING=true \
    WATCHPACK_POLLING=true \
    HOSTNAME=0.0.0.0

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ----------------------
# Build (create optimized Next.js build)
# ----------------------
FROM deps AS build
ENV NODE_ENV=production

COPY . .
RUN npm run build

# ----------------------
# ✅ Improved Production runtime (slim)
# ----------------------
FROM node:22-alpine AS prod
WORKDIR /app

# Proper production env
ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000

# Reuse node_modules from deps (no double npm ci)
COPY --from=deps /app/node_modules ./node_modules

# Keep package.json for metadata / npm scripts
COPY package*.json ./

# Copy build output & public assets from build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["npm", "run", "start"]