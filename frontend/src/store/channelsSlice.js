import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchChannelsApi} from "../components/api/channels.js";

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
    }
})

export const { setActiveChannel } = channelSlice.actions;
export default channelSlice.reducer;
