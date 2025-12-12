import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tokenService } from "../services/tokenService.js";
import { loginUserApi, signupUserApi } from "../api/auth.js";
import i18next from "i18next";

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            return await loginUserApi(username, password); // => { token: ..., username: 'admin' }
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 409) {
                // Получаем перевод из вне
                const { t } = await import('react-i18next');
                return rejectWithValue(t('errors.wrong_name_or_password'));
            }
            return rejectWithValue(error.message);
        }
    }
)

export const signupUser = createAsyncThunk(
    'auth/signup',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            return await signupUserApi(username, password);
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 409) {
                // Получаем перевод из вне
                const { t } = await import('react-i18next');
                return rejectWithValue(t('errors.duplicate_user'));
            }
            return rejectWithValue(error.message);
        }
    }
)

const initialState = {
    // isAuthenticated: Boolean(tokenService.get()),
    token: tokenService.get() || null,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            // state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = null;
            tokenService.remove(); // очищаем токен из localStorage
        }
    },
    extraReducers: (builder) => {
        builder
            // loginUser
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                // state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.username;
                state.loading = false;
                tokenService.set(action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                // state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.loading = false;
                state.error = action.payload || i18next.t('errors.auth_failed');
                tokenService.remove();
            })
            //signupUser
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                // state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.username;
                tokenService.set(action.payload.token);
            })
            .addCase(signupUser.rejected, (state, action) => {
                // state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.loading = false;
                state.error = action.payload || "Ошибка регистрации";
                tokenService.remove();
            })
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
