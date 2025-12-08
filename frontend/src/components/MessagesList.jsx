import { useSelector } from "react-redux";
import { selectAllMessages } from "../store/messagesSlice.js";
import { useMemo } from "react";

export default function MessagesList() {
    const activeIdChannel = useSelector((state) => state.channels.activeChannelId);
    const allMessages = useSelector(selectAllMessages);
    const error = useSelector((state) => state.messages.error);
    const loading = useSelector((state) => state.messages.status === 'loading');

    const channelMessages = useMemo(() =>
        allMessages.filter((m) => m.channelId === activeIdChannel),
        [allMessages, activeIdChannel]
    );

    return (
        <div
            id="messages-box"
            className="chat-messages overflow-auto px-5"
            style={{ minHeight: 200 }}
        >
            {loading ? (
                <div>Загрузка сообщений...</div>
            ) : error ? (
                <div className="text-danger">{error}</div>
            ) : (
                channelMessages.map((m) => (
                    <div className="my-2" key={m.id}>
                        <span className="fw-bold">
                            {m.username}: </span>
                        <span>{m.body}</span>
                    </div>
                ))
            )}
        </div>
    )
}










