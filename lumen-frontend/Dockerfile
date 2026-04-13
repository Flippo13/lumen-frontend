# Stage 1: Install dependencies
FROM node:20-alpine AS dependencies
WORKDIR /lumen-frontend
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build the app
FROM node:20-alpine AS builder
WORKDIR /lumen-frontend
COPY --from=dependencies /lumen-frontend/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm prune --omit=dev

# Stage 3: Run as non-root user
FROM node:20-alpine AS runner
WORKDIR /lumen-frontend
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 sveltekit && \
    adduser --system --uid 1001 sveltekit

# Copy build and node_modules
COPY --from=builder --chown=sveltekit:sveltekit /lumen-frontend/build ./build
COPY --from=builder --chown=sveltekit:sveltekit /lumen-frontend/node_modules ./node_modules

# Drop privileges
USER sveltekit
EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

# Serve the app
CMD ["node", "build/index.js"]