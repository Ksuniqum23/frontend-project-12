import {
  addChannelFromSocket,
  removeChannelFromSocket,
  renameChannelFromSocket,
} from '../store/channelsSlice'
import { addMessageFromSocket } from '../store/messagesSlice'

export const initSocketListeners = (socket, dispatch) => {
  socket.on('newMessage', (payload) => {
    console.log('Socket: newMessage', payload)
    dispatch(addMessageFromSocket(payload))
  })

  socket.on('newChannel', (payload) => {
    console.log('Socket: newChannel', payload)
    dispatch(addChannelFromSocket(payload))
  })

  socket.on('removeChannel', (payload) => {
    console.log('Socket: removeChannel', payload)
    dispatch(removeChannelFromSocket(payload))
  })

  socket.on('renameChannel', (payload) => {
    console.log('Socket: renameChannel', payload)
    dispatch(renameChannelFromSocket(payload))
  })
}

export const removeSocketListeners = (socket) => {
  if (!socket) return

  socket.off('newMessage')
  socket.off('newChannel')
  socket.off('removeChannel')
  socket.off('renameChannel')
}
