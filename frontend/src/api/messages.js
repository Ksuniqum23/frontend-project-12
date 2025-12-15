import api from './api.js'

export const fetchMessagesApi = async () => {
  const response = await api.get('messages')
  console.log('messagesResponse_GET', response)
  return response.data
}

export const addMessageApi = async (newMessage) => {
  const response = await api.post('messages', newMessage)
  console.log('messagesResponse_POST_add', response)
  return response.data
}
