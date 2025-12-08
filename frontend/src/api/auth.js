// import axios from "axios";
// import {tokenService} from "../services/tokenService.js";
import api from "./api.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUserApi = async (username, password) => {
    const response = await api.post('login', { username, password });
    console.log('userLoginResponsePost', response);
    return response.data;
}

export const signupUserApi = async (username, password) => {
    const response = await api.post('signup', { username, password });
    console.log('userSignupResponsePost', response);
    return response.data;
}

// export const logoutUser = () => {
//     tokenService.remove();
// }

// export const signupUser = async (username, password) => {
//     try {
//         const response = await api.post('/signup', { username, password });
//         const data = response.data;
//         console.log('data from server', data);
//         const token = data?.token;
//         if (!token) {
//             throw new Error('Токен не получен от сервера');
//         }
//
//         tokenService.set(token);
//         return data;
//     } catch (err) {
//         if (err.response) {
//             const msg = err.response.data?.message || `Ошибка сервера: ${err.response.status}`;
//             throw new Error(msg);
//         }
//         throw new Error(err.message || 'Неизвестная ошибка при регистрации');
//     }
// }

// export const getToken = () => {
//     return localStorage.getItem('authToken');
// };
//
// export const isAuthenticated = () => {
//     return !!getToken();
// };

// const data = response.data;
//
// const token = data?.token;
// if (!token) {
//     throw new Error('Токен не получен от сервера');
// }
//
// tokenService.set(token);
// // Можно вернуть всю полезную информацию (user, token и т.д.)
// return data;
// } catch (err) {
//     // Можно распарсить ошибку и вернуть читабельное сообщение
//     if (err.response) {
//         // Сервер вернул статус (например 400/401)
//         const msg = err.response.data?.message || `Ошибка сервера: ${err.response.status}`;
//         throw new Error(msg);
//     }
//     // Сетевая ошибка / таймаут
// //     throw new Error(err.message || 'Неизвестная ошибка при логине');
// }
