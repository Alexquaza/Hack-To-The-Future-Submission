import { YOU, conversationTitle, userById } from '../data'
import type { Conversation, Message } from '../types'
import { Avatar } from './Avatar'

type ChatPanelProps = {
  conversation: Conversation
  messages: Message[]
  draft: string
  groupName?: string
  onDraft: (value: string) => void
  onSend: () => void
}

export function ChatPanel({
  conversation,
  messages,
  draft,
  groupName,
  onDraft,
  onSend,
}: ChatPanelProps) {
  const title = conversationTitle(conversation)
  const people = conversation.participantIds.map((id) => userById(id))

  return (
    <section className="chat">
      <header className="chat-bar">
        <Avatar conversation={conversation} />
        <div>
          <h2>{title}</h2>
          <p>
            {people.map((person) => person.name).join(', ')}
            {groupName ? ` · in ${groupName}` : ' · ungrouped'}
          </p>
        </div>
      </header>

      <div className="transcript">
        <div className="chat-intro">
          <Avatar conversation={conversation} size="lg" />
          <h3>{title}</h3>
          <p>
            {conversation.participantIds.length > 1
              ? 'This is a group DM. It still lives in your personal list — group it with related chats instead of making a server.'
              : `This is your private thread with ${title}. Drop it into a DM group when you want it out of the pile.`}
          </p>
        </div>
        {messages.map((message, index) => {
          const author = message.authorId === YOU.id ? YOU : userById(message.authorId)
          const previous = messages[index - 1]
          const stacked = previous?.authorId === message.authorId
          return (
            <div key={message.id} className={`bubble-row ${stacked ? 'stacked' : ''}`}>
              {stacked ? <span className="avatar-spacer" /> : <Avatar user={author} />}
              <div className="bubble">
                {!stacked && (
                  <div className="bubble-head">
                    <strong>{author.name}</strong>
                    <time>{message.time}</time>
                  </div>
                )}
                <p>{message.text}</p>
              </div>
            </div>
          )
        })}
      </div>

      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault()
          onSend()
        }}
      >
        <input
          value={draft}
          onChange={(event) => onDraft(event.target.value)}
          placeholder={`Message ${title}`}
          aria-label={`Message ${title}`}
        />
        <button type="submit" disabled={!draft.trim()}>
          Send
        </button>
      </form>
    </section>
  )
}
