import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addChannelApi, fetchChannelsApi} from "../components/api/channels.js";
import {data} from "react-router-dom";

export const fetchChannels = createAsyncThunk(
    'channels/fetchChannels',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchChannelsApi();
        } catch (err) {
            return rejectWithValue(err.message); // попадёт в rejected экстраредьюсер
        }
    }
)

export const addChannel = createAsyncThunk(
    'channels/addChannel',
    async (name, { rejectWithValue}) => {
        try {
            return await addChannelApi(name);
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

const initialState = {
    entities: {}, // ключ = channel.id, значение = канал { id, name, removable }
    ids: [], // упорядоченный массив id каналов
    activeChannelId: null,
    status: 'idle', // общий статус загрузки 'idle', 'loading', 'success', 'failed'
    error: null
}

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setActiveChannel: (state, action) => {
            state.activeChannelId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchChannels
            .addCase(fetchChannels.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchChannels.fulfilled, (state, action) => {
                const channels = action.payload;
                channels.forEach((channel) => {
                    if (!state.entities[channel.id]) {
                        state.ids.push(channel.id);
                        state.entities[channel.id] = channel;
                    }
                })
                if (!state.activeChannelId && channels.length > 0) {
                    state.activeChannelId = channels[0].id;
                }
                state.status = 'success';
                state.error = null;
            })
            .addCase(fetchChannels.rejected, (state, action) => {
                state.error = action.payload || 'Ошибка при загрузке данных';
                state.status = 'failed';
            })

            // addChannel
            .addCase(addChannel.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addChannel.fulfilled, (state, action) => {
                const newChannel = action.payload;
                state.entities[newChannel.id] = newChannel;
                state.ids.push(newChannel.id);
                state.status = 'success';
                state.error = null;
            })
            .addCase(addChannel.rejected, (state, action) => {
                state.error = action.payload || 'Ошибка при загрузке данных';
                state.status = 'failed';
            })
    }
})

export const { setActiveChannel } = channelSlice.actions;
export default channelSlice.reducer;
