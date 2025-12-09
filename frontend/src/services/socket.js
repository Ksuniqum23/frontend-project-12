import {tokenService} from "./tokenService.js";
import {io} from "socket.io-client";


const url = 'http://localhost:5174';

const socket = io(url, {
    autoConnect: false,
    transports: ['websocket'],
});

// === Подключение / отключение ===
export const connectSocket = () => {
    const token = tokenService.get();
    if (!token) {
        console.warn('connectSocket: no token found, socket will not connect');
        return;
    }
    socket.auth = { token };
    socket.connect();
};

export const disconnectSocket = () => {
    if (socket && socket.connected) socket.disconnect();
};


// === Join / Leave комнат (channels) ===
export const joinChannel = (channelId) => {
    if (!socket.connected) return;
    socket.emit('join', { channelId });
};

export const leaveChannel = (channelId) => {
    if (!socket.connected) return;
    socket.emit('leave', { channelId });
};

// === Отправка сообщений ===
export const sendMessage = (payload) => {
    // payload: { body, channelId, ... }
    if (!socket.connected) {
        console.warn('sendMessage: socket is not connected');
        return;
    }
    socket.emit('newMessage', payload);
};

// === Утилиты для подписки на события ===
// use addListener/removeListener в коде, чтобы избежать дублей.
export const addListener = (event, handler) => {
    socket.on(event, handler);
};

export const removeListener = (event, handler) => {
    socket.off(event, handler);
};

export const removeAllListeners = (event) => {
    if (event) socket.removeAllListeners(event);
    else socket.removeAllListeners();
};

// Экспорт самого сокета на случай, если нужен доступ к низкоуровневым свойствам
export default socket;

