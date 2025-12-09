# WebSocket в проекте Hexlet Chat

## Обзор архитектуры

Проект использует **Socket.IO** для real-time обновлений. Реализация построена на паттерне **Provider** и интегрирована с Redux.

```
┌─────────────────────────────────────────────────────────────┐
│                         Сервер                              │
│  (отправляет события: newMessage, newChannel, и т.д.)       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    socket/socket.js                         │
│  • Создаёт единственный экземпляр socket-клиента           │
│  • connectSocket() — подключение                            │
│  • disconnectSocket() — отключение                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                socket/socketListeners.js                    │
│  • Подписывается на события сервера                         │
│  • Вызывает dispatch(action) при получении данных           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              components/SocketProvider.jsx                  │
│  • React-компонент провайдер                                │
│  • Управляет lifecycle подключения                          │
│  • Реагирует на isAuthenticated                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Redux Store                            │
│  channelsSlice: addChannelFromSocket, removeChannel...      │
│  messagesSlice: addMessageFromSocket                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    React Components                         │
│  (автоматически перерисовываются при изменении store)       │
└─────────────────────────────────────────────────────────────┘
```

---

## Структура файлов

```
src/
├── socket/
│   ├── socket.js           # Socket-клиент
│   └── socketListeners.js  # Подписки на события
├── components/
│   └── SocketProvider.jsx  # React-провайдер
└── store/
    ├── channelsSlice.js    # Actions для каналов
    └── messagesSlice.js    # Actions для сообщений
```

---

## Детальное описание файлов

### 1. `socket/socket.js`

**Назначение:** Управление socket-соединением.

```javascript
// Хранит единственный экземпляр socket
let socket = null;

// Получить текущий socket
getSocket()

// Подключиться к серверу
connectSocket()
  - Проверяет, не подключен ли уже
  - Получает токен из tokenService
  - Создаёт соединение: io('/', { auth: { token } })
  - Логирует connect/disconnect/error

// Отключиться
disconnectSocket()
  - Вызывает socket.disconnect()
  - Обнуляет переменную socket
```

**Почему один экземпляр?**
- Избегаем множественных подключений
- Экономим ресурсы сервера
- Предотвращаем дублирование событий

---

### 2. `socket/socketListeners.js`

**Назначение:** Подписка на события сервера.

| Событие сервера | Action в Redux | Payload |
|-----------------|----------------|---------|
| `newMessage` | `addMessageFromSocket` | `{ body, channelId, id, username }` |
| `newChannel` | `addChannelFromSocket` | `{ id, name, removable }` |
| `removeChannel` | `removeChannelFromSocket` | `{ id }` |
| `renameChannel` | `renameChannelFromSocket` | `{ id, name, removable }` |

```javascript
// Подписаться на все события
initSocketListeners(socket, dispatch)

// Отписаться (cleanup)
removeSocketListeners(socket)
```

**Важно:** `removeSocketListeners` вызывается при:
- Logout пользователя
- Unmount компонента SocketProvider

---

### 3. `components/SocketProvider.jsx`

**Назначение:** React-интеграция socket-клиента.

```jsx
function SocketProvider({ children }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    
    useEffect(() => {
        if (!isAuthenticated) {
            disconnectSocket();
            return;
        }
        
        const socket = connectSocket();
        initSocketListeners(socket, dispatch);
        
        return () => {
            removeSocketListeners(socket);
            disconnectSocket();
        };
    }, [isAuthenticated, dispatch]);
    
    return children;
}
```

**Логика:**

| isAuthenticated | Действие |
|-----------------|----------|
| `true` | Подключаемся, подписываемся на события |
| `false` | Отключаемся, отписываемся |
| Переход `true → false` | Cleanup: отписка + disconnect |

---

### 4. Redux Actions

#### channelsSlice.js

```javascript
reducers: {
    addChannelFromSocket: (state, action) => {
        channelsAdapter.addOne(state, action.payload);
    },
    removeChannelFromSocket: (state, action) => {
        const { id } = action.payload;
        channelsAdapter.removeOne(state, id);
        // Если удалён активный канал — переключаемся
        if (state.activeChannelId === id) {
            state.activeChannelId = state.ids[0] || null;
        }
    },
    renameChannelFromSocket: (state, action) => {
        const { id, name } = action.payload;
        channelsAdapter.updateOne(state, { id, changes: { name } });
    },
}
```

#### messagesSlice.js

```javascript
reducers: {
    addMessageFromSocket: (state, action) => {
        messagesAdapter.addOne(state, action.payload);
    },
}
```

---

## Поток данных (Flow)

### Получение нового сообщения от другого пользователя:

```
1. Пользователь B отправляет сообщение
   └── POST /api/messages → сервер

2. Сервер сохраняет и рассылает всем подписчикам
   └── socket.emit('newMessage', payload)

3. Клиент A получает событие
   └── socket.on('newMessage', handler)

4. Handler вызывает dispatch
   └── dispatch(addMessageFromSocket(payload))

5. Redux обновляет store
   └── messagesAdapter.addOne(state, payload)

6. React перерисовывает MessagesList
   └── useSelector(selectAllMessages) → новый массив → re-render
```

---

## Подключение в приложении

```jsx
// main.jsx
<Provider store={store}>
    <BrowserRouter>
        <SocketProvider>
            <App />
        </SocketProvider>
    </BrowserRouter>
</Provider>
```

**Почему внутри Provider и BrowserRouter?**
- `SocketProvider` использует `useSelector` — нужен Redux Provider
- `SocketProvider` не использует роутер, но должен быть внутри для консистентности

---

## Отладка

### Консольные логи

При работе socket выводит:
```
Socket connected: <socket.id>
Socket: newMessage { body: "...", ... }
Socket: newChannel { id: 6, name: "...", ... }
Socket disconnected: <reason>
```

### Проверка подключения

В DevTools браузера:
1. Network → WS (WebSocket)
2. Должен быть активный websocket connection

### Частые проблемы

| Проблема | Причина | Решение |
|----------|---------|---------|
| Socket не подключается | Нет токена | Проверить `tokenService.get()` |
| Дублирование событий | Множественные подписки | Проверить cleanup в useEffect |
| События не приходят | Неверный путь | Проверить URL в `io()` |

---

## Расширение

### Добавить новое событие:

1. В `socketListeners.js`:
```javascript
socket.on('newEvent', (payload) => {
    dispatch(newEventAction(payload));
});
```

2. В `removeSocketListeners`:
```javascript
socket.off('newEvent');
```

3. В соответствующем slice:
```javascript
reducers: {
    newEventAction: (state, action) => { ... }
}
```

4. Экспортировать action.
