import { createSlice } from '@reduxjs/toolkit';
import {tokenService} from "../services/tokenService.js";

const initialState = {
    isAuthenticated: Boolean(tokenService.get()),
    token: tokenService.get() || null,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user || action.payload.username;
            tokenService.set(action.payload.token);
        },
        loginFailure(state, action) {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.loading = false;
            state.error = action.payload;
            tokenService.remove();
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = null;
            tokenService.remove(); // очищаем токен из localStorage
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
