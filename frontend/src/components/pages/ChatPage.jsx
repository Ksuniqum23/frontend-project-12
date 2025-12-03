import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchInitialData, setActiveChannel} from "../../store/chatSlice.js";

export default function ChatPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchInitialData());
    }, [dispatch]);

    const channels = useSelector(state => state.chat.channels);
    const messages = useSelector(state => state.chat.messages);
    const activeChannelId = useSelector(state => state.chat.activeChannelId);
    const loading = useSelector(state => state.chat.loading);

    const activeChannel = channels.find(ch => ch.id === activeChannelId);

    return (
        <div className="h-100">
            <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">

                    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container">
                            <a className="navbar-brand" href="/">Hexlet Chat</a>
                            <button type="button" className="btn btn-primary">Выйти</button>
                        </div>
                    </nav>

                    <div className="container h-100 my-4 overflow-hidden rounded shadow">
                        <div className="row h-100 bg-white flex-md-row">

                            {/* Каналы */}
                            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                                    <b>Каналы</b>
                                    <button type="button" className="p-0 text-primary btn btn-group-vertical" aria-label="Создать канал">+
                                    </button>
                                </div>

                                <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                                    {loading ? (
                                        <li className="nav-item w-100">Загрузка...</li>
                                    ) : (
                                        channels.map((ch) => (
                                            <li className="nav-item w-100" key={ch.id}>
                                                <button
                                                    type="button"
                                                    className={`w-100 rounded-0 text-start btn ${ch.id === activeChannelId ? 'btn-secondary' : ''}`}
                                                    onClick={() => dispatch(setActiveChannel(ch.id))}
                                                >
                                                    <span className="me-1">#</span>
                                                    {ch.name}
                                                </button>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>

                            {/* Сообщения */}
                            <div className="col p-0 h-100">
                                <div className="d-flex flex-column h-100">

                                    <div className="bg-light mb-4 p-3 shadow-sm small">
                                        <p className="m-0"><b>{activeChannel ? `# ${activeChannel.name}` : '# —'}</b></p>
                                        <span className="text-muted">{messages.filter((m) => m.channelId === activeChannelId).length} сообщений</span>
                                    </div>

                                    {/*<div id="messages-box" className="chat-messages overflow-auto px-5" ref={messagesBoxRef} style={{ minHeight: 200 }}>*/}
                                    {/*    {loading ? (*/}
                                    {/*        <div>Загрузка сообщений...</div>*/}
                                    {/*    ) : error ? (*/}
                                    {/*        <div className="text-danger">{error}</div>*/}
                                    {/*    ) : (*/}
                                    {/*        messages*/}
                                    {/*            .filter((m) => m.channelId === activeChannelId)*/}
                                    {/*            .map((m) => (*/}
                                    {/*                <div className="my-2" key={m.id}>*/}
                                    {/*                    <div className="fw-bold small">{m.username} <small className="text-muted">{formatDate(m.createdAt)}</small></div>*/}
                                    {/*                    <div>{m.body}</div>*/}
                                    {/*                </div>*/}
                                    {/*            ))*/}
                                    {/*    )}*/}
                                    {/*</div>*/}

                                    {/*<div className="mt-auto px-5 py-3">*/}
                                    {/*    <form onSubmit={handleSend} className="py-1 border rounded-2">*/}
                                    {/*        <div className="input-group has-validation">*/}
                                    {/*            <input*/}
                                    {/*                name="body"*/}
                                    {/*                aria-label="Новое сообщение"*/}
                                    {/*                placeholder={activeChannel ? 'Введите сообщение...' : 'Выберите канал'}*/}
                                    {/*                className="border-0 p-0 ps-2 form-control"*/}
                                    {/*                value={body}*/}
                                    {/*                onChange={(e) => setBody(e.target.value)}*/}
                                    {/*                disabled={!activeChannel || sending}*/}
                                    {/*            />*/}
                                    {/*            <button type="submit" disabled={!body.trim() || sending || !activeChannel} className="btn btn-group-vertical">*/}
                                    {/*                Отправить*/}
                                    {/*            </button>*/}
                                    {/*        </div>*/}
                                    {/*    </form>*/}
                                    {/*</div>*/}

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div className="Toastify" />
        </div>
    );
}
