import axios from "axios";
import {tokenService} from "../services/tokenService.js";

export const loginUser = async (username, password) => {
    const response = await axios.post('/api/v1/login', {
        username: username,
        password: password
    })
    const data = response.data;
    const token = data.token;
    if (!token) {
        throw new Error('Токен не получен от сервера');
    }
    tokenService.set(token);
    return data;
}

// export const logoutUser = () => {
//     tokenService.remove();
// };

// export const getToken = () => {
//     return localStorage.getItem('authToken');
// };
//
// export const isAuthenticated = () => {
//     return !!getToken();
// };
