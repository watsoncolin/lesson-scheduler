FROM node:lts-alpine3.10 as builder
ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
RUN npm i
RUN npm run build api

FROM node:lts-alpine3.10 as runner
WORKDIR /app
COPY --from=builder /app/builder/dist/apps/api ./dist
COPY --from=builder /app/builder/node_modules ./node_modules
COPY --from=builder /app/builder/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080
CMD ["node", "dist/main.js"]