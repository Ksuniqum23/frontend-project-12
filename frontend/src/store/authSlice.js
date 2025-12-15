import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { tokenService } from '../services/tokenService.js'
import { loginUserApi, signupUserApi } from '../api/auth.js'

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await loginUserApi(username, password) // => { token: ..., username: 'admin' }
    }
    catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const signupUser = createAsyncThunk(
  'auth/signup',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await signupUserApi(username, password)
    }
    catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

const initialState = {
  token: tokenService.get() || null,
  user: null,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.user = null
      tokenService.remove()
    },
  },
  extraReducers: (builder) => {
    builder
    // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.username
        state.loading = false
        tokenService.set(action.payload.token)
      })

    // signupUser
      .addCase(signupUser.pending, (state) => {
        state.loading = true
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = action.payload.username
        tokenService.set(action.payload.token)
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
