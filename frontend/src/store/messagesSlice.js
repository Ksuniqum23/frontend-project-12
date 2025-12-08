import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {addMessageApi, fetchMessagesApi} from "../api/messages.js";

const messagesAdapter = createEntityAdapter();

export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    async (_, { rejectWithValue}) => {
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

const initialState = {
    status: 'idle',
    error: null,
}

const messageSlice = createSlice({
    name: 'messages',
    initialState,
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
    }
});

export const {
    selectAll: selectAllMessages,
} = messagesAdapter.getSelectors((state) => state.messages);
