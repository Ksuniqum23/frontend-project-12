import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { addMessageApi, fetchMessagesApi } from "../api/messages.js";

const messagesAdapter = createEntityAdapter();

export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchMessagesApi()
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const addMessage = createAsyncThunk(
    'messages/addMessage',
    async (newMessage, { rejectWithValue }) => {
        try {
            return await addMessageApi(newMessage);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const initialState = messagesAdapter.getInitialState({
    status: 'idle',
    error: null,
});

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        removeMessagesByChannel(state, action) {
            const channelId = action.payload;
            const idsToRemove = Object.values(state.entities)
                .filter((m) => m && m.channelId === channelId)
                .map((m) => m.id);
            messagesAdapter.removeMany(state, idsToRemove);
        },
        // Socket events
        addMessageFromSocket: (state, action) => {
            messagesAdapter.addOne(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            //fetchMessages
            .addCase(fetchMessages.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                messagesAdapter.setAll(state, action.payload);
                state.status = 'success';
                state.error = null;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.error = action.payload || 'Ошибка при загрузке данных';
                state.status = 'failed';
            })
            //addMessages
            .addCase(addMessage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addMessage.fulfilled, (state, action) => {
                messagesAdapter.addOne(state, action.payload);
                state.status = 'success';
                state.error = null;
            })
            .addCase(addMessage.rejected, (state, action) => {
                state.error = action.payload || 'Ошибка при загрузке данных';
                state.status = 'failed';
            })
    }
});

export const {
    selectAll: selectAllMessages,
} = messagesAdapter.getSelectors((state) => state.messages);

export const selectMessagesByChannel = (activeIdChannel) => (state) =>
    selectAllMessages(state).filter((m) => m.channelId === activeIdChannel);

export const { addMessageFromSocket, removeMessagesByChannel } = messageSlice.actions;
export default messageSlice.reducer;
