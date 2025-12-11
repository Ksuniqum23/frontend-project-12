import ChatHeader from "../components/ChatHeader.jsx";
import MessagesList from "../components/MessagesList.jsx";
import MessageForm from "../components/MessageForm.jsx";
import ChannelsList from "../components/ChannelsList.jsx";
import Navbar from "../components/Navbar.jsx";
import {ToastContainer} from "react-toastify";


export default function ChatPage() {

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

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
            />
            {/*<div className="Toastify" />*/}
        </div>
    );
}
