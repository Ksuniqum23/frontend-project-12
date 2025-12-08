import {useSelector} from "react-redux";
import {selectChannelById} from "../store/channelsSlice.js";
import {selectMessagesByChannel} from "../store/messagesSlice.js";

export default function ChatHeader() {
    const activeChannelId = useSelector((state) => state.channels.activeChannelId);
    const activeChannel = useSelector((state) =>
        selectChannelById(state, activeChannelId)
    );
    const messages = useSelector(selectMessagesByChannel(activeChannelId));

    return (
        <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0"><b>{activeChannel ? `# ${activeChannel.name}` : '# —'}</b></p>
            <span className="text-muted">{messages.length} сообщений</span>
        </div>
    )
}
