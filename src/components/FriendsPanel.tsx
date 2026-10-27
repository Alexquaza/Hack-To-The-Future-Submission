import { conversationTitle } from '../data'
import type { Conversation, DmGroup, User } from '../types'
import { Avatar } from './Avatar'

type FriendsPanelProps = {
  friends: User[]
  groups: DmGroup[]
  conversations: Conversation[]
  onMessage: (userId: string) => void
  onCreateGroup: () => void
  onOpenConversation: (id: string) => void
}

const presenceLabel: Record<User['presence'], string> = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Busy',
  offline: 'Offline',
}

export function FriendsPanel({
  friends,
  groups,
  conversations,
  onMessage,
  onCreateGroup,
  onOpenConversation,
}: FriendsPanelProps) {
  const online = friends.filter((user) => user.presence !== 'offline')
  const ungrouped = conversations.filter((item) => !item.groupId)

  return (
    <section className="friends">
      <header className="friends-top">
        <div>
          <p className="eyebrow">Direct messages</p>
          <h1>Your DM groups</h1>
        </div>
        <button className="primary" onClick={onCreateGroup}>
          New DM group
        </button>
      </header>

      <div className="group-board">
        {groups.map((group) => {
          const items = conversations.filter((item) => item.groupId === group.id)
          return (
            <article key={group.id} className="group-card" style={{ borderColor: group.color }}>
              <header>
                <span className="swatch" style={{ background: group.color }} />
                <h2>{group.name}</h2>
                <b>{items.length}</b>
              </header>
              {items.length === 0 ? (
                <p className="empty-hint">No DMs in this group yet. Drag one in from the left.</p>
              ) : (
                <ul>
                  {items.map((item) => (
                    <li key={item.id}>
                      <button type="button" onClick={() => onOpenConversation(item.id)}>
                        <Avatar conversation={item} />
                        <span>
                          <strong>{conversationTitle(item)}</strong>
                          <em>{item.lastMessage}</em>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          )
        })}

        <article className="group-card loose">
          <header>
            <h2>Ungrouped</h2>
            <b>{ungrouped.length}</b>
          </header>
          {ungrouped.length === 0 ? (
            <p className="empty-hint">Every DM is in a group.</p>
          ) : (
            <ul>
              {ungrouped.map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => onOpenConversation(item.id)}>
                    <Avatar conversation={item} />
                    <span>
                      <strong>{conversationTitle(item)}</strong>
                      <em>{item.lastMessage}</em>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>

      <div className="friends-online">
        <h3>Online · {online.length}</h3>
        <ul className="friend-list">
          {online.map((user) => (
            <li key={user.id}>
              <Avatar user={user} size="md" />
              <div className="friend-copy">
                <strong>{user.name}</strong>
                <span>
                  {presenceLabel[user.presence]}
                  {user.status ? ` · ${user.status}` : ''}
                </span>
              </div>
              <button type="button" onClick={() => onMessage(user.id)}>
                Message
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
