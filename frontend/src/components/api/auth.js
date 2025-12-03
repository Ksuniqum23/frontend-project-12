import axios from "axios";
import {tokenService} from "../services/tokenService.js";
import api from "./api.js";

export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        const data = response.data;

        const token = data?.token;
        if (!token) {
            throw new Error('Токен не получен от сервера');
        }

        tokenService.set(token);
        // Можно вернуть всю полезную информацию (user, token и т.д.)
        return data;
    } catch (err) {
        // Можно распарсить ошибку и вернуть читабельное сообщение
        if (err.response) {
            // Сервер вернул статус (например 400/401)
            const msg = err.response.data?.message || `Ошибка сервера: ${err.response.status}`;
            throw new Error(msg);
        }
        // Сетевая ошибка / таймаут
        throw new Error(err.message || 'Неизвестная ошибка при логине');
    }
}

export const logoutUser = () => {
    tokenService.remove();
};

// export const getToken = () => {
//     return localStorage.getItem('authToken');
// };
//
// export const isAuthenticated = () => {
//     return !!getToken();
// };
