import { YOU, conversationTitle } from '../data'
import type { Conversation, DmGroup } from '../types'
import { Avatar } from './Avatar'

type SidebarProps = {
  groups: DmGroup[]
  conversations: Conversation[]
  activeId: string | null
  friendsActive: boolean
  search: string
  renameId: string | null
  onSearch: (value: string) => void
  onOpenFriends: () => void
  onOpenConversation: (id: string) => void
  onToggleGroup: (id: string) => void
  onCreateGroup: () => void
  onMove: (conversationId: string, groupId: string | null) => void
  onContext: (id: string, x: number, y: number) => void
  onRename: (id: string, name: string) => void
  onStartRename: (id: string | null) => void
  onDeleteGroup: (id: string) => void
}

function ConversationRow({
  conversation,
  active,
  onOpen,
  onContext,
}: {
  conversation: Conversation
  active: boolean
  onOpen: () => void
  onContext: (x: number, y: number) => void
}) {
  return (
    <button
      className={`dm-row ${active ? 'active' : ''}`}
      onClick={onOpen}
      onContextMenu={(event) => {
        event.preventDefault()
        onContext(event.clientX, event.clientY)
      }}
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData('text/cove-conversation', conversation.id)
        event.dataTransfer.effectAllowed = 'move'
      }}
    >
      <Avatar conversation={conversation} />
      <span className="dm-meta">
        <span className="dm-name">
          {conversationTitle(conversation)}
          {conversation.unread > 0 && <b className="unread">{conversation.unread}</b>}
        </span>
        <span className="dm-preview">{conversation.lastMessage}</span>
      </span>
      <span className="dm-time">{conversation.lastTime}</span>
    </button>
  )
}

export function Sidebar({
  groups,
  conversations,
  activeId,
  friendsActive,
  search,
  renameId,
  onSearch,
  onOpenFriends,
  onOpenConversation,
  onToggleGroup,
  onCreateGroup,
  onMove,
  onContext,
  onRename,
  onStartRename,
  onDeleteGroup,
}: SidebarProps) {
  const ungrouped = conversations.filter((item) => !item.groupId)

  return (
    <aside className="sidebar">
      <div className="sidebar-search">
        <input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Find a conversation"
          aria-label="Find a conversation"
        />
      </div>

      <button className={`friends-btn ${friendsActive ? 'active' : ''}`} onClick={onOpenFriends}>
        <span className="friends-icon">◎</span>
        Friends
      </button>

      <div className="sidebar-head">
        <div>
          <p className="eyebrow">Direct messages</p>
          <h2>Grouped the way servers are</h2>
        </div>
        <button className="icon-btn" onClick={onCreateGroup} title="New DM group" aria-label="New DM group">
          +
        </button>
      </div>

      <div className="dm-scroll">
        {groups.map((group) => {
          const items = conversations.filter((item) => item.groupId === group.id)
          return (
            <section
              key={group.id}
              className="dm-group"
              onDragOver={(event) => {
                event.preventDefault()
                event.currentTarget.classList.add('drop')
              }}
              onDragLeave={(event) => event.currentTarget.classList.remove('drop')}
              onDrop={(event) => {
                event.preventDefault()
                event.currentTarget.classList.remove('drop')
                const id = event.dataTransfer.getData('text/cove-conversation')
                if (id) onMove(id, group.id)
              }}
            >
              <div className="group-head">
                <button className="group-toggle" onClick={() => onToggleGroup(group.id)}>
                  <span className={`chevron ${group.collapsed ? 'closed' : ''}`}>▾</span>
                  <i className="swatch" style={{ background: group.color }} />
                  {renameId !== group.id && <span className="group-name">{group.name}</span>}
                  <span className="group-count">{items.length}</span>
                </button>
                {renameId === group.id && (
                  <input
                    className="rename-input"
                    defaultValue={group.name}
                    autoFocus
                    onBlur={(event) => onRename(group.id, event.target.value.trim() || group.name)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        onRename(group.id, event.currentTarget.value.trim() || group.name)
                      }
                    }}
                  />
                )}
                <div className="group-actions">
                  <button type="button" onClick={() => onStartRename(group.id)} title="Rename group">
                    ✎
                  </button>
                  <button type="button" onClick={() => onDeleteGroup(group.id)} title="Remove group">
                    ×
                  </button>
                </div>
              </div>
              {!group.collapsed && (
                <div className="group-body">
                  {items.length === 0 && <p className="empty-hint">Drag a DM here</p>}
                  {items.map((item) => (
                    <ConversationRow
                      key={item.id}
                      conversation={item}
                      active={item.id === activeId}
                      onOpen={() => onOpenConversation(item.id)}
                      onContext={(x, y) => onContext(item.id, x, y)}
                    />
                  ))}
                </div>
              )}
            </section>
          )
        })}

        <section
          className="dm-group loose"
          onDragOver={(event) => {
            event.preventDefault()
            event.currentTarget.classList.add('drop')
          }}
          onDragLeave={(event) => event.currentTarget.classList.remove('drop')}
          onDrop={(event) => {
            event.preventDefault()
            event.currentTarget.classList.remove('drop')
            const id = event.dataTransfer.getData('text/cove-conversation')
            if (id) onMove(id, null)
          }}
        >
          <div className="group-head">
            <span className="group-toggle static">
              <span className="group-name muted-label">Ungrouped</span>
              <span className="group-count">{ungrouped.length}</span>
            </span>
          </div>
          <div className="group-body">
            {ungrouped.map((item) => (
              <ConversationRow
                key={item.id}
                conversation={item}
                active={item.id === activeId}
                onOpen={() => onOpenConversation(item.id)}
                onContext={(x, y) => onContext(item.id, x, y)}
              />
            ))}
          </div>
        </section>
      </div>

      <footer className="me-bar">
        <Avatar user={YOU} />
        <div>
          <strong>{YOU.name}</strong>
          <span>{YOU.status}</span>
        </div>
      </footer>
    </aside>
  )
}
