import { io } from 'socket.io-client'
import { tokenService } from '../services/tokenService'

let socket = null // тут храним объект сокета

export const getSocket = () => socket // функция возвращает текущий объект сокета

export const connectSocket = () => {
  if (socket?.connected) {
    return socket
  }

  const token = tokenService.get()

  socket = io('/', { // создаем сокет
    auth: { token },
  })

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id)
  })

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason)
  })

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error)
  })

  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export default { getSocket, connectSocket, disconnectSocket }
