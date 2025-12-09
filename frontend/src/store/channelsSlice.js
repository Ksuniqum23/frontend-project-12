import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { addChannelApi, deleteChannelApi, editChannelApi, fetchChannelsApi } from "../api/channels.js";

const channelsAdapter = createEntityAdapter();

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
    async (name, { rejectWithValue }) => {
        try {
            return await addChannelApi(name);
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const editChannel = createAsyncThunk(
    'channels/editChannel',
    async ({ channelId, newName }, { rejectWithValue }) => {
        try {
            return await editChannelApi(channelId, newName);
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const deleteChannel = createAsyncThunk(
    'channels/deleteChannel',
    async (channelId, { rejectWithValue }) => {
        try {
            return await deleteChannelApi(channelId);
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

const initialState = channelsAdapter.getInitialState({
    activeChannelId: null,
    status: 'idle', // общий статус загрузки 'idle', 'loading', 'success', 'failed'
    error: null
})

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setActiveChannel: (state, action) => {
            state.activeChannelId = action.payload;
        },
        // Socket events
        addChannelFromSocket: (state, action) => {
            channelsAdapter.addOne(state, action.payload);
        },
        removeChannelFromSocket: (state, action) => {
            const { id } = action.payload;
            channelsAdapter.removeOne(state, id);
            // Если удалён активный канал — переключаемся на первый
            if (state.activeChannelId === id) {
                const ids = state.ids;
                state.activeChannelId = ids.length > 0 ? ids[0] : null;
            }
        },
        renameChannelFromSocket: (state, action) => {
            const { id, name } = action.payload;
            channelsAdapter.updateOne(state, { id, changes: { name } });
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
                channelsAdapter.setAll(state, action.payload);
                if (!state.activeChannelId && action.payload.length > 0) {
                    state.activeChannelId = action.payload[0].id;
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
                channelsAdapter.addOne(state, action.payload);
                state.status = 'success';
                state.error = null;
            })
            .addCase(addChannel.rejected, (state, action) => {
                state.error = action.payload || 'Ошибка при загрузке данных';
                state.status = 'failed';
            })

            // editChannel
            .addCase(editChannel.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(editChannel.fulfilled, (state, action) => {
                channelsAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: action.payload,
                });
            })
            .addCase(editChannel.rejected, (state, action) => {
                state.error = action.payload || 'Ошибка при загрузке данных';
                state.status = 'failed';
            })

            // deleteChannel
            .addCase(deleteChannel.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteChannel.fulfilled, (state, action) => {
                channelsAdapter.removeOne(state, action.payload.id);
                state.status = 'success';
            })
            .addCase(deleteChannel.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Ошибка при удалении канала';
            })
    }
});

export const {
    selectAll: selectAllChannels,
    selectById: selectChannelById,
    selectIds: selectChannelIds
} = channelsAdapter.getSelectors((state) => state.channels);

export const {
    setActiveChannel,
    addChannelFromSocket,
    removeChannelFromSocket,
    renameChannelFromSocket
} = channelSlice.actions;
export default channelSlice.reducer;
