# Builder stage
FROM node:20 as builder

ARG NODE_ENV
ARG BUILD_FLAG

WORKDIR /app/builder

COPY package*.json ./

ENV NX_SKIP_NATIVE_BUILD=true

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build:api

# --- Final runtime stage ---
FROM node:20 as runner

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production --legacy-peer-deps

COPY --from=builder /app/builder/dist/apps/api ./dist

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/main.js"]
