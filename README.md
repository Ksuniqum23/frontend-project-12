# frontend-project-12

[![Actions Status](https://github.com/Ksuniqum23/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Ksuniqum23/frontend-project-12/actions)


учебное React-приложение, мессенджер (аналог Slack) с авторизацией, каналами и обменом сообщениями в реальном времени. Проект создан в рамках обучения в Хекслете.

## 🚀 Демо

[Посмотреть приложение](https://frontend-project-12-latest.onrender.com)

## ✨ Возможности

- Регистрация и авторизация пользователей (JWT)
- Система каналов (создание, переименование, удаление)
- Обмен сообщениями в реальном времени
- Адаптивный интерфейс (React + Bootstrap)
- Валидация форм и обработка ошибок

## 🛠️ Технологии

- React + React Hooks
- Redux Toolkit (управление состоянием)
- React Router (маршрутизация)
- React Bootstrap (стилизация)
- Socket.IO (real-time)
- Axios (HTTP-запросы)
- Docker (контейнеризация)

## 🐳 Запуск через Docker

### Docker Compose (рекомендуется)

```bash
# Собрать и запустить
docker compose up -d --build

# Посмотреть логи
docker compose logs -f

# Остановить
docker compose down
```

### Docker (без Compose)

```bash
# Собрать образ
docker build -t frontend-project-12 .

# Запустить контейнер
docker run -d -p 5001:5001 frontend-project-12
```

После запуска приложение доступно по адресу: http://localhost:5001
