import {useDispatch, useSelector} from "react-redux";
import {addChannel, deleteChannel, editChannel} from "../store/channelsSlice.js";
import {addMessage} from "../store/messagesSlice.js";
import {useCallback, useEffect} from "react";
import {connectSocket, disconnectSocket, removeAllListeners} from "../services/socket.js";
import {addListener, removeListener} from "@reduxjs/toolkit";

const SocketManager = () => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    // Стабильные обработчики (useCallback чтобы можно было off())
    const handleAddMessage = useCallback((payload) => {
        // payload: { body, channelId, id, username, ... }
        dispatch(addMessage(payload));
    }, [dispatch]);

    const handleAddChannel = useCallback((payload) => {
        dispatch(addChannel(payload));
    }, [dispatch]);

    const handleEditChannel = useCallback((payload) => {
        // payload: { id, name, ... }
        dispatch(editChannel(payload));
    }, [dispatch]);

    const handleDeleteChannel = useCallback((payload) => {
        // payload: { id: <channelId> }
        dispatch(deleteChannel(payload.id));
    }, [dispatch]);

    const handleConnect = useCallback(() => {
        // опционально: можно диспатчить экшен статуса соединения
        // dispatch(setSocketStatus('connected'));
        // console.log('socket connected');
    }, []);

    const handleDisconnect = useCallback(() => {
        // dispatch(setSocketStatus('disconnected'));
        // console.log('socket disconnected');
    }, []);

    const handleConnectError = useCallback((err) => {
        // Ошибка соединения / аутентификации — можно реакцию (форс-логаут) здесь реализовать
        console.error('Socket connect_error:', err);
        // например, если сервер вернул 401 в connect_error, можно диспатчить logout
    }, []);

    useEffect(() => {
        if (!token) {
            // если нет токена, то убеждаемся, что сокет отключён и слушатели сняты
            removeAllListeners('newMessage');
            removeAllListeners('newChannel');
            removeAllListeners('removeChannel');
            removeAllListeners('renameChannel');
            removeAllListeners('connect');
            removeAllListeners('disconnect');
            removeAllListeners('connect_error');
            disconnectSocket();
            return;
        }

        // есть токен — подключаем сокет и вешаем слушатели
        connectSocket();

        addListener('newMessage', handleAddMessage);
        addListener('newChannel', handleAddMessage);
        addListener('removeChannel', handleDeleteChannel);
        addListener('renameChannel', handleDeleteChannel);

        addListener('connect', handleConnect);
        addListener('disconnect', handleDisconnect);
        addListener('connect_error', handleConnectError);

        // cleanup — убрать только те слушатели, что добавили
        return () => {
            removeListener('newMessage', handleAddMessage);
            removeListener('newChannel', handleAddMessage);
            removeListener('removeChannel', handleDeleteChannel);
            removeListener('renameChannel', handleDeleteChannel);

            removeListener('connect', handleConnect);
            removeListener('disconnect', handleDisconnect);
            removeListener('connect_error', handleConnectError);

            disconnectSocket();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, handleAddMessage, handleAddChannel, handleDeleteChannel, handleEditChannel, handleConnect, handleDisconnect, handleConnectError]);

    return null; // ничего не рендерит — просто управляющий компонент
};


export default SocketManager;
