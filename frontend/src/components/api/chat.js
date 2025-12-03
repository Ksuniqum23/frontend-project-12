import api from "./api.js";

export const fetchInitialDataFromApi = async () => {
    const [chanelsResponse, messagesResponse] = await Promise.all([
        api.get('channels'),
        api.get('messages'),
    ]);
    return {
        channels: chanelsResponse.data,
        messages: messagesResponse.data,
    };
}
