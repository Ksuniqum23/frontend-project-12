import axios from "axios";

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
    localStorage.setItem('authToken', token);
    return data;
}

export const logoutUser = () => {
    localStorage.removeItem('authToken');
};

export const getToken = () => {
    return localStorage.getItem('authToken');
};

export const isAuthenticated = () => {
    return !!getToken();
};
