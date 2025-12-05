import api from "./api.js";

export const fetchChannelsApi = async () => {
    const response = await api.get('channels');
    console.log('channelsResponse', response);
    return response.data;
}

// export const addChannelApi(data)
// export const removeChannelApi(id)
