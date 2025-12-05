import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import channelsReducer from './channelsSlice';
// import chatReducer from './chatSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        channels: channelsReducer,
    }
});
