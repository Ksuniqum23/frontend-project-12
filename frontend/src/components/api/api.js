import axios from "axios";
import { tokenService } from "../services/tokenService.js";


const api = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = tokenService.get();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response, config } = error;
        // Не перенаправляем на /login если запрос уже идёт на /login (неверные данные авторизации)
        const isLoginRequest = config?.url?.includes('/login');
        if (response && response.status === 401 && !isLoginRequest) {
            // при 401 — удаляем токен и направляем на логин (кроме самого логина)
            tokenService.remove();
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);

export default api;
