# frontend-project-12

[![Actions Status](https://github.com/Ksuniqum23/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Ksuniqum23/frontend-project-12/actions)


A training React application, a messenger (Slack-like) with authentication, channels, and real-time messaging. Created as part of the Hexlet educational program.

## 🚀 Demo

[Посмотреть приложение](https://frontend-project-12-latest.onrender.com)

## ✨ Features

- User registration and authentication (JWT)
- Channel system (create, rename, delete)
- Real-time messaging
- Responsive interface (React + Bootstrap)
- Form validation and error handling

## 🛠️ Technologies

- React + React Hooks
- Redux Toolkit (state management)
- React Router (routing)
- React Bootstrap (styling)
- Socket.IO (real-time)
- Axios (HTTP requests)
- Docker (containerization)

## 🐳 Running with Docker

### Docker Compose (recommended)

```bash
# Build and run
docker compose up -d --build

# View logs
docker compose logs -f

# Stop
docker compose down
```

### Docker (without Compose)

```bash
# Build the image
docker build -t frontend-project-12 .

# Run the container
docker run -d -p 5001:5001 frontend-project-12
```

After launching, the application is available at: http://localhost:5001
