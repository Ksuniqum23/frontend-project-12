# ---- Stage 1: Build ----
FROM no

WORKDIR /app

# 1. Копируем корневые lock/package файлы и устанавливаем зависимости корня
COPY package.json package-lock.json ./
RUN npm install

# 2. Копируем lock/package файлы фронтенда и устанавливаем его зависимости
COPY frontend/package.json frontend/package-lock.json ./frontend/
RUN cd frontend && npm ci

# 3. Копируем исходники фронтенда и собираем
COPY frontend/ ./frontend/
RUN npm run build

# ---- Stage 2: Production ----
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Копируем корневые lock/package и ставим только production-зависимости
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Копируем собранную статику фронтенда
COPY --from=build /app/frontend/dist ./frontend/dist

EXPOSE 5001

CMD ["node_modules/.bin/start-server", "-s", "./frontend/dist"]
