FROM node:20-alpine as builder
ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder

# Copy package files first for better caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .
RUN npm run build:api

FROM node:20-alpine as runner
WORKDIR /app

# Copy only the necessary files from builder
COPY --from=builder /app/builder/dist/apps/api ./dist
COPY --from=builder /app/builder/node_modules ./node_modules
COPY --from=builder /app/builder/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080
CMD ["node", "dist/main.js"]