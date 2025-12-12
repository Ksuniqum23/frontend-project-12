import ChatHeader from "../components/ChatHeader.jsx";
import MessagesList from "../components/MessagesList.jsx";
import MessageForm from "../components/MessageForm.jsx";
import ChannelsList from "../components/ChannelsList.jsx";
import Navbar from "../components/Navbar.jsx";
import { toast } from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import {fetchChannels} from "../store/channelsSlice.js";
import {fetchMessages} from "../store/messagesSlice.js";


export default function ChatPage() {
    const dispatch = useDispatch();
    const channelsError = useSelector((state) => state.channels.error);
    const messagesError = useSelector((state) => state.messages.error);

    useEffect(() => {
        if (channelsError) toast.error(channelsError);
        if (messagesError) toast.error(messagesError);
    }, [channelsError, messagesError]);

    useEffect(() => {
        dispatch(fetchChannels());
        dispatch(fetchMessages());
    }, [dispatch]);

    return (
        <div className="h-100">
            <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">
                    <Navbar />
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
        </div>
    );
}
