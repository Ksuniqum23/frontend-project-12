import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connectSocket, disconnectSocket } from './socket.js'
import { initSocketListeners, removeSocketListeners } from './socketListeners.js'

export default function SocketProvider({ children }) {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    if (!user || !token) {
      disconnectSocket()
      return
    }

    const socket = connectSocket()
    initSocketListeners(socket, dispatch)

    return () => {
      removeSocketListeners(socket)
      disconnectSocket()
    }
  }, [user, token, dispatch])

  return children
}
