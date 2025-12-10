import { useEffect, useRef, useState } from "react";
import { addMessage } from "../store/messagesSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function MessageForm() {
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const activeChannelId = useSelector((state) => state.channels.activeChannelId);
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeChannelId]);

    const newMessage = {
        body: message,
        channelId: activeChannelId,
        username: user,
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!message.trim() || !activeChannelId || sending) return;
        setSending(true);
        try {
            await dispatch(addMessage(newMessage));
            setMessage('');
        } finally {
            setSending(false);
            inputRef.current?.focus();
        }
    }
    return (
        <div className="mt-auto px-5 py-3">
            <form
                onSubmit={onSubmit}
                className="py-1 border rounded-2"
            >
                <div className="input-group has-validation">
                    <input
                        ref={inputRef}
                        name="body"
                        aria-label="Новое сообщение"
                        placeholder={activeChannelId ? 'Введите сообщение...' : 'Выберите канал'}
                        className="border-0 p-0 ps-2 form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={!activeChannelId || sending}
                    />
                    <button
                        type="submit"
                        disabled={!message.trim() || sending || !activeChannelId}
                        className="btn btn-group-vertical"
                    >
                        {sending ? 'Отправка...' : 'Отправить'}
                    </button>
                </div>
            </form>
        </div>
    )
}
