import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {tokenService} from "../services/tokenService.js";
import {loginUserApi} from "../api/auth.js";

export const loginUser = createAsyncThunk(
   'auth/login',
   async ({username, password}, { rejectWithValue}) => {
       try {
           return await loginUserApi(username, password);
       } catch (error) {
           return rejectWithValue(error.message);
       }
   }
)
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
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = null;
            tokenService.remove(); // очищаем токен из localStorage
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.username;
                state.loading = false;
                tokenService.set(action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.loading = false;
                state.error = action.payload || "Ошибка авторизации";
                tokenService.remove();
            })
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
