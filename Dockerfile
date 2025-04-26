FROM node:20-alpine as builder

# Pass environment variables
ARG NODE_ENV
ARG BUILD_FLAG

WORKDIR /app/builder

# Copy package files first for better caching
COPY package*.json ./

# 🔥 Add this to fix NX crashing inside Docker build
ENV NX_SKIP_NATIVE_BUILD=true

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the API
RUN npm run build:api

# --- Final lightweight image ---
FROM node:20-alpine as runner

WORKDIR /app

# Only copy necessary built files and deps
COPY --from=builder /app/builder/dist/apps/api ./dist
COPY --from=builder /app/builder/node_modules ./node_modules
COPY --from=builder /app/builder/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/main.js"]
