import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket, disconnectSocket } from '../socket/socket';
import { initSocketListeners, removeSocketListeners } from '../socket/socketListeners';

export default function SocketProvider({ children }) {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            disconnectSocket();
            return;
        }

        const socket = connectSocket();
        initSocketListeners(socket, dispatch);

        return () => {
            removeSocketListeners(socket);
            disconnectSocket();
        };
    }, [isAuthenticated, dispatch]);

    return children;
}
