export default function ChatHeader({ activeChannel, messageCount = 0 }) {
    return (
        <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0"><b>{activeChannel ? `# ${activeChannel.name}` : '# —'}</b></p>
            <span className="text-muted">{messageCount} сообщений</span>
        </div>
    )
}
