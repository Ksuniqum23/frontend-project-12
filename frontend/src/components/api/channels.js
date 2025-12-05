import api from "./api.js";

export const fetchChannelsApi = async () => {
    const response = await api.get('channels');
    console.log('channelsResponse_GET', response);
    return response.data;
}

export const addChannelApi = async (data) => {
    const response = await api.post('channels', {name: data});
    console.log('channelsResponse_POST_add', response);
    return response.data;
}
// export const removeChannelApi(id)
