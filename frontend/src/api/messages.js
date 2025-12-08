import api from "./api.js";

export const fetchMessagesApi = async() => {
    const response = await api().get('messages');
    console.log('messagesResponse_GET', response);
    return response.data;
}
