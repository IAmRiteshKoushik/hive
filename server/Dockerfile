# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yml ./

RUN pnpm install

COPY . .

RUN pnpm build

# Production stage
FROM node:20-alpine as production

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]
