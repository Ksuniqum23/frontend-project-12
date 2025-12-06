import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import {fetchInitialData, setActiveChannel} from "../../store/chatSlice.js";
// import {tokenService} from "../services/tokenService.js";
import { logout } from "../../store/authSlice.js";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth.js";
import {
    addChannel,
    deleteChannel, editChannel,
    fetchChannels,
    selectAllChannels,
    setActiveChannel
} from "../../store/channelsSlice.js";
import AddChannelModal from "../AddChannelModal.jsx";
import EditChannelModal from "../EditChannelModal.jsx";


export default function ChatPage() {
    const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false);
    const [isEditChannelModalOpen, setIsEditChannelModalOpen] = useState(false);
    const [channelToEdit, setChannelToEdit] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchChannels());
    }, [dispatch]);

    const channels = useSelector(selectAllChannels);
    const activeChannelId = useSelector(state => state.channels.activeChannelId);
    const activeChannel = channels.find((channel) => channel.id === activeChannelId);

    const loading = false;
    const error = false;

    const handleLogout = () => {
        logoutUser();
        dispatch(logout());
        navigate("/login");
    };

    const handleAddChannel = (name) => {
        dispatch(addChannel(name));
    }

    const handleOpenEditModal = (channel) => {
        setChannelToEdit(channel);
        setIsEditChannelModalOpen(true);
    }

    const handleEditChannel = (channelId, newName) => {
        dispatch(editChannel({ channelId, newName }));
    }

    return (
        <div className="h-100">
            <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">

                    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container">
                            <a className="navbar-brand" href="/">Hexlet Chat</a>
                            <button type="button" className="btn btn-primary" onClick={handleLogout}>Выйти</button>
                        </div>
                    </nav>

                    <div className="container h-100 my-4 overflow-hidden rounded shadow">
                        <div className="row h-100 bg-white flex-md-row">

                            {/* Каналы */}
                            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                                    <b>Каналы</b>
                                    <button
                                        type="button"
                                        className="p-0 text-primary btn btn-group-vertical"
                                        aria-label="Создать канал"
                                        onClick={() => setIsAddChannelModalOpen(true)}
                                    >
                                        +
                                    </button>
                                    <AddChannelModal
                                        isOpen={isAddChannelModalOpen}
                                        onClose={() => setIsAddChannelModalOpen(false)}
                                        onSubmit={handleAddChannel}
                                    />
                                    <EditChannelModal
                                        isOpen={isEditChannelModalOpen}
                                        onClose={() => setIsEditChannelModalOpen(false)}
                                        onSubmit={handleEditChannel}
                                        channel={channelToEdit}
                                    />
                                </div>

                                <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                                    {channels.map((channel) => (
                                        <li className="nav-item w-100 d-flex align-items-center" key={channel.id}>
                                            <button
                                                type="button"
                                                className={`flex-grow-1 rounded-0 text-start btn ${channel.id === activeChannelId ? 'btn-secondary' : 'btn-light'
                                                    }`}
                                                onClick={() => dispatch(setActiveChannel(channel.id))}
                                            >
                                                <span className="me-1">#</span>
                                                {channel.name}
                                            </button>

                                            {channel.removable && (
                                                <div className="dropdown ms-1">
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm dropdown-toggle"
                                                        type="button"
                                                        id={`dropdown-${channel.id}`}
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                    </button>

                                                    <ul className="dropdown-menu" aria-labelledby={`dropdown-${channel.id}`}>
                                                        <li>
                                                            <button
                                                                className="dropdown-item"
                                                                onClick={() => handleOpenEditModal(channel)}
                                                            >
                                                                Переименовать
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className="dropdown-item text-danger"
                                                                onClick={() => dispatch(deleteChannel(channel.id))}
                                                            >
                                                                Удалить
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    ))
                                    }
                                </ul>
                            </div>

                            {/* Сообщения */}
                            <div className="col p-0 h-100">
                                <div className="d-flex flex-column h-100">

                                    <div className="bg-light mb-4 p-3 shadow-sm small">
                                        <p className="m-0"><b>{activeChannel ? `# ${activeChannel.name}` : '# —'}</b></p>
                                        {/*<span className="text-muted">{messages.filter((m) => m.channelId === activeChannelId).length} сообщений</span>*/}
                                    </div>

                                    <div id="messages-box" className="chat-messages overflow-auto px-5"
                                        // ref={messagesBoxRef}
                                        style={{ minHeight: 200 }}>
                                        {loading ? (
                                            <div>Загрузка сообщений...</div>
                                        ) : error ? (
                                            <div className="text-danger">{'какая-то ошибка'}</div>
                                        )
                                            : (
                                                // messages
                                                //     .filter((m) => m.channelId === activeChannelId)
                                                //     .map((m) => (
                                                //         <div className="my-2" key={m.id}>
                                                //             <div className="fw-bold small">{m.username} <small className="text-muted">{formatDate(m.createdAt)}</small></div>
                                                //             <div>{m.body}</div>
                                                //         </div>
                                                //     )
                                                <p>Тут окно сообщений</p>
                                            )}
                                    </div>

                                    <div className="mt-auto px-5 py-3">
                                        <form
                                            // onSubmit={handleSend}
                                            className="py-1 border rounded-2"
                                        >
                                            <div className="input-group has-validation">
                                                <input
                                                    name="body"
                                                    aria-label="Новое сообщение"
                                                    placeholder={activeChannel ? 'Введите сообщение...' : 'Выберите канал'}
                                                    className="border-0 p-0 ps-2 form-control"
                                                // value={body}
                                                // onChange={(e) => setBody(e.target.value)}
                                                // disabled={!activeChannel || sending}
                                                />
                                                <button type="submit"
                                                    // disabled={!body.trim() || sending || !activeChannel}
                                                    className="btn btn-group-vertical">
                                                    Отправить
                                                </button>
                                            </div>
                                        </form>
                                    </div>

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
