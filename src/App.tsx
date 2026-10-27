import { ChatPanel } from './components/ChatPanel'
import { ContextMenu } from './components/ContextMenu'
import { FriendsPanel } from './components/FriendsPanel'
import { GroupModal } from './components/GroupModal'
import { Rail } from './components/Rail'
import { Sidebar } from './components/Sidebar'
import { useCove } from './useCove'

export default function App() {
  const cove = useCove()
  const groupName = cove.active
    ? cove.groups.find((group) => group.id === cove.active?.groupId)?.name
    : undefined

  return (
    <div className="shell">
      <Rail
        onHome={cove.openFriends}
        onServerHint={() => cove.showToast('Servers stay on this rail. Groups are for DMs.')}
      />
      <Sidebar
        groups={cove.groups}
        conversations={cove.conversations}
        activeId={cove.active?.id ?? null}
        friendsActive={cove.view === 'friends'}
        search={cove.search}
        renameId={cove.renameId}
        onSearch={cove.setSearch}
        onOpenFriends={cove.openFriends}
        onOpenConversation={cove.openConversation}
        onToggleGroup={cove.toggleGroup}
        onCreateGroup={() => cove.setModalOpen(true)}
        onMove={cove.moveConversation}
        onContext={(id, x, y) => cove.setMenu({ id, x, y })}
        onRename={cove.renameGroup}
        onStartRename={cove.setRenameId}
        onDeleteGroup={cove.deleteGroup}
      />

      <main className="stage">
        {cove.view === 'friends' || !cove.active ? (
          <FriendsPanel
            friends={cove.friends}
            groups={cove.groups}
            conversations={cove.conversations}
            onMessage={cove.openOrCreateDm}
            onCreateGroup={() => cove.setModalOpen(true)}
            onOpenConversation={cove.openConversation}
          />
        ) : (
          <ChatPanel
            conversation={cove.active}
            messages={cove.messages[cove.active.id] ?? []}
            draft={cove.draft}
            groupName={groupName}
            onDraft={cove.setDraft}
            onSend={cove.sendMessage}
          />
        )}
      </main>

      {cove.modalOpen && (
        <GroupModal
          conversations={cove.allConversations}
          onClose={() => cove.setModalOpen(false)}
          onCreate={cove.createGroup}
        />
      )}

      {cove.menu && (
        <ContextMenu
          x={cove.menu.x}
          y={cove.menu.y}
          groups={cove.groups}
          onMove={(groupId) => cove.moveConversation(cove.menu!.id, groupId)}
          onClose={() => cove.setMenu(null)}
        />
      )}

      {cove.toast && (
        <div className="toast" role="status">
          {cove.toast}
        </div>
      )}
    </div>
  )
}
