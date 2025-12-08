export default function MessagesList({ messages, loading, error }) {
    return (
        <div
            id="messages-box"
            className="chat-messages overflow-auto px-5"
            style={{ minHeight: 200 }}
        >
            {loading ? (
                <div>Загрузка сообщений...</div>
            ) : error ? (
                <div className="text-danger">какая-то ошибка</div>
            ) : (
                (messages ?? [])
                    .map((m) => (
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










