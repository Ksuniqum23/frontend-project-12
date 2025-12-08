import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import {fetchInitialData, setActiveChannel} from "../../store/chatSlice.js";
// import {tokenService} from "../services/tokenService.js";
import { logout } from "../store/authSlice.js";
import { useNavigate } from "react-router-dom";
import {
    addChannel,
    deleteChannel, editChannel,
    fetchChannels,
    selectAllChannels,
    setActiveChannel
} from "../store/channelsSlice.js";
import AddChannelModal from "../components/Modals/AddChannelModal.jsx";
import EditChannelModal from "../components/Modals/EditChannelModal.jsx";
import ChatHeader from "../components/ChatHeader.jsx";
import MessagesList from "../components/MessagesList.jsx";
import MessageForm from "../components/MessageForm.jsx";
import { fetchMessages } from "../store/messagesSlice.js";
import ChannelsList from "../components/ChannelsList.jsx";
// import {selectAllMessages} from "../store/messagesSlice.js";


export default function ChatPage() {

    // const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false);
    // const [isEditChannelModalOpen, setIsEditChannelModalOpen] = useState(false);
    // const [channelToEdit, setChannelToEdit] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     dispatch(fetchChannels());
    // }, [dispatch]);

    // useEffect(() => {
    //     dispatch(fetchMessages());
    // }, [dispatch]);

    // const channels = useSelector(selectAllChannels);
    //
    // const activeChannelId = useSelector(state => state.channels.activeChannelId);


    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };


    return (
        <div className="h-100">
            <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">

                    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container">
                            <a className="navbar-brand" href="/frontend/public">Hexlet Chat</a>
                            <button type="button" className="btn btn-primary" onClick={handleLogout}>Выйти</button>
                        </div>
                    </nav>

                    <div className="container h-100 my-4 overflow-hidden rounded shadow">
                        <div className="row h-100 bg-white flex-md-row">
                            <ChannelsList />
                            <div className="col p-0 h-100">
                                <div className="d-flex flex-column h-100">
                                    <ChatHeader />
                                    <MessagesList />
                                    <MessageForm />
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
