import api from "./api.js";

export const fetchChannelsApi = async () => {
    const response = await api.get('channels');
    console.log('channelsResponse_GET', response);
    return response.data;
}

export const addChannelApi = async (name) => {
    const response = await api.post('channels', {name: name});
    console.log('channelsResponse_POST_add', response);
    return response.data;
}

export const editChannelApi = async (channelId, newName) => {
    const response = await api.patch(`channels/${channelId}`, {name: newName});
    console.log('channelsResponse_EDIT', response);
    return response.data;
}

export const deleteChannelApi = async (channelId) => {
    const response = await api.delete(`channels/${channelId}`);
    console.log('channelsResponse_DELETE', response);
    return response.data;
}

// export const removeChannelApi(id)
