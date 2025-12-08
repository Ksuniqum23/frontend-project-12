import {useEffect, useRef, useState} from "react";

export default function MessageForm({ handleSendMessage, activeChannel }) {
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [activeChannel]);

    const onSubmit = (event) => {
        event.preventDefault();
        handleSendMessage(message);
        setMessage('');
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
                        placeholder={activeChannel ? 'Введите сообщение...' : 'Выберите канал'}
                        className="border-0 p-0 ps-2 form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        // disabled={!activeChannel || sending}
                    />
                    <button
                        type="submit"
                        // disabled={!body.trim() || sending || !activeChannel}
                        className="btn btn-group-vertical"
                    >
                        Отправить
                    </button>
                </div>
            </form>
        </div>
    )
}
