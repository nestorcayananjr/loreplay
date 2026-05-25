FROM node:20-alpine AS base
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

FROM base AS development

ENV NODE_ENV=development

COPY package*.json ./
RUN npm ci

COPY --chown=nodejs:nodejs . .
RUN npx prisma generate

USER nodejs

EXPOSE 3000

CMD ["npm", "run", "dev:docker"]

FROM base AS production

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --chown=nodejs:nodejs . .

USER nodejs

EXPOSE 3000

CMD ["node", "index.js"]