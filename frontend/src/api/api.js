import axios from "axios";
import { tokenService } from "../services/tokenService.js";

// Axios внутри создаёт объект конфигурации для этого запроса (config)
const api = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Интерсептор получает конфиг, добавляет токен
api.interceptors.request.use((config) => {
    const token = tokenService.get();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Анализ и обработка ошибок
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // const { response } = error;
        // if (response && response.status === 401) {
        //     tokenService.remove();
        // }
        return Promise.reject(error);
    },
);

export default api;
