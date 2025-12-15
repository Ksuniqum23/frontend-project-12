import { useSelector } from 'react-redux'
import { selectAllMessages } from '../store/messagesSlice.js'
import { useMemo, useRef, useEffect } from 'react'

export default function MessagesList() {
  const activeIdChannel = useSelector(state => state.channels.activeChannelId)
  const allMessages = useSelector(selectAllMessages)
  const error = useSelector(state => state.messages.error)
  const loading = useSelector(state => state.messages.status === 'loading')
  const messagesEndRef = useRef(null)

  const channelMessages = useMemo(() =>
    allMessages.filter(m => m.channelId === activeIdChannel),
  [allMessages, activeIdChannel],
  )

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [channelMessages])

  return (
    <div
      id="messages-box"
      className="chat-messages overflow-auto px-5"
      style={{ minHeight: 200 }}
    >
      {loading
        ? (
            <div>Загрузка сообщений...</div>
          )
        : error
          ? (
              <div className="text-danger">{error}</div>
            )
          : (
              channelMessages.map(m => (
                <div className="my-2" key={m.id}>
                  <span className="fw-bold">
                    {m.username}
                    :
                    {' '}
                  </span>
                  <span>{m.body}</span>
                </div>
              ))
            )}
      <div ref={messagesEndRef} />
    </div>
  )
}
