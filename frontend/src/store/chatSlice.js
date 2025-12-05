// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import {fetchInitialDataFromApi} from "../components/api/chat.js";
//
// // Thunk для загрузки каналов и сообщений
// export const fetchInitialData = createAsyncThunk(
//     'chat/fetchInitialData',
//     async (_, thunkAPI) => {
//         try {
//             const data = await fetchInitialDataFromApi();
//             return data; // { channels, messages }
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );
//
// const initialState = {
//     channels: [],
//     messages: [],
//     activeChannelId: null,
//     loading: false,
//     error: null,
// };
//
// const chatSlice = createSlice({
//     name: 'chat',
//     initialState,
//     reducers: {
//         setActiveChannel: (state, action) => {
//             state.activeChannelId = action.payload;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchInitialData.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchInitialData.fulfilled, (state, action) => {
//                 const {channels, messages} = action.payload;
//                 state.channels = channels;
//                 state.messages = messages;
//                 if (!state.activeChannelId && channels.length > 0) {
//                     state.activeChannelId = channels[0].id;
//                 }
//                 state.loading = false;
//             })
//             .addCase(fetchInitialData.rejected, (state, action) => {
//                 state.error = action.payload || 'Ошибка при загрузке данных';
//                 state.loading = false;
//             });
//     },
// });
//
// export const { setActiveChannel } = chatSlice.actions;
// export default chatSlice.reducer;
