import api from "./api.js";

export const loginUserApi = async (username, password) => {
    const response = await api.post('login', { username, password });
    return response.data;
}

export const signupUserApi = async (username, password) => {
    const response = await api.post('signup', { username, password });
    return response.data;
}
