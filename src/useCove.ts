import { useMemo, useState } from 'react'
import {
  CONVERSATIONS,
  GROUPS,
  MESSAGES,
  USERS,
  conversationTitle,
  userById,
} from './data'
import type { Conversation, DmGroup, Message, View } from './types'

const STORAGE_KEY = 'cove-dm-groups'

type PersistShape = {
  groups: DmGroup[]
  placements: Record<string, string | null>
}

function loadPersist(): PersistShape | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as PersistShape) : null
  } catch {
    return null
  }
}

function persist(groups: DmGroup[], conversations: Conversation[]) {
  const payload: PersistShape = {
    groups,
    placements: Object.fromEntries(conversations.map((item) => [item.id, item.groupId])),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

function seedConversations(): Conversation[] {
  const saved = loadPersist()
  return CONVERSATIONS.map((item) => ({
    ...item,
    groupId: saved?.placements[item.id] !== undefined ? saved.placements[item.id] : item.groupId,
  }))
}

function seedGroups(): DmGroup[] {
  return loadPersist()?.groups ?? GROUPS.map((item) => ({ ...item }))
}

function formatNow() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export function useCove() {
  const [groups, setGroups] = useState<DmGroup[]>(seedGroups)
  const [conversations, setConversations] = useState<Conversation[]>(seedConversations)
  const [messages, setMessages] = useState<Record<string, Message[]>>(() =>
    Object.fromEntries(Object.entries(MESSAGES).map(([id, list]) => [id, [...list]])),
  )
  const [view, setView] = useState<View>('friends')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [draft, setDraft] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [menu, setMenu] = useState<{ id: string; x: number; y: number } | null>(null)
  const [renameId, setRenameId] = useState<string | null>(null)

  const active = conversations.find((item) => item.id === activeId) ?? null
  const query = search.trim().toLowerCase()

  const visibleConversations = useMemo(() => {
    if (!query) return conversations
    return conversations.filter((item) => conversationTitle(item).toLowerCase().includes(query))
  }, [conversations, query])

  const showToast = (text: string) => {
    setToast(text)
    window.setTimeout(() => setToast(null), 2600)
  }

  const commit = (nextGroups: DmGroup[], nextConversations: Conversation[]) => {
    setGroups(nextGroups)
    setConversations(nextConversations)
    persist(nextGroups, nextConversations)
  }

  const openFriends = () => {
    setView('friends')
    setActiveId(null)
    setMenu(null)
  }

  const openConversation = (id: string) => {
    setView('dm')
    setActiveId(id)
    setMenu(null)
    setDraft('')
    setConversations((current) => {
      const next = current.map((item) => (item.id === id ? { ...item, unread: 0 } : item))
      persist(groups, next)
      return next
    })
  }

  const moveConversation = (conversationId: string, groupId: string | null) => {
    const next = conversations.map((item) =>
      item.id === conversationId ? { ...item, groupId } : item,
    )
    commit(groups, next)
    setMenu(null)
    const label = groupId ? groups.find((group) => group.id === groupId)?.name : 'Ungrouped'
    showToast(`Moved to ${label}`)
  }

  const toggleGroup = (groupId: string) => {
    const next = groups.map((group) =>
      group.id === groupId ? { ...group, collapsed: !group.collapsed } : group,
    )
    commit(next, conversations)
  }

  const createGroup = (name: string, color: string, conversationIds: string[]) => {
    const group: DmGroup = {
      id: `g-${Date.now()}`,
      name,
      color,
      collapsed: false,
    }
    const nextGroups = [...groups, group]
    const nextConversations = conversations.map((item) =>
      conversationIds.includes(item.id) ? { ...item, groupId: group.id } : item,
    )
    commit(nextGroups, nextConversations)
    setModalOpen(false)
    showToast(`${name} is ready — ${conversationIds.length} conversation${conversationIds.length === 1 ? '' : 's'}`)
  }

  const renameGroup = (groupId: string, name: string) => {
    const next = groups.map((group) => (group.id === groupId ? { ...group, name } : group))
    commit(next, conversations)
    setRenameId(null)
  }

  const deleteGroup = (groupId: string) => {
    const nextGroups = groups.filter((group) => group.id !== groupId)
    const nextConversations = conversations.map((item) =>
      item.groupId === groupId ? { ...item, groupId: null } : item,
    )
    commit(nextGroups, nextConversations)
    setMenu(null)
    showToast('Group removed. Conversations are ungrouped.')
  }

  const openOrCreateDm = (userId: string) => {
    const existing = conversations.find(
      (item) => item.participantIds.length === 1 && item.participantIds[0] === userId,
    )
    if (existing) {
      openConversation(existing.id)
      return
    }
    const user = userById(userId)
    const conversation: Conversation = {
      id: `c-${userId}-${Date.now()}`,
      participantIds: [userId],
      lastMessage: `Message ${user.name}`,
      lastTime: formatNow(),
      unread: 0,
      groupId: null,
    }
    const next = [conversation, ...conversations]
    commit(groups, next)
    setMessages((current) => ({ ...current, [conversation.id]: [] }))
    setView('dm')
    setActiveId(conversation.id)
  }

  const sendMessage = () => {
    const text = draft.trim()
    if (!text || !active) return
    const message: Message = {
      id: `msg-${Date.now()}`,
      authorId: 'you',
      text,
      time: `Today at ${formatNow()}`,
    }
    setMessages((current) => ({
      ...current,
      [active.id]: [...(current[active.id] ?? []), message],
    }))
    const next = conversations.map((item) =>
      item.id === active.id
        ? { ...item, lastMessage: text, lastTime: formatNow(), unread: 0 }
        : item,
    )
    commit(groups, next)
    setDraft('')
  }

  const friends = useMemo(() => {
    if (!query) return USERS
    return USERS.filter(
      (user) =>
        user.name.toLowerCase().includes(query) || user.handle.toLowerCase().includes(query),
    )
  }, [query])

  return {
    groups,
    conversations: visibleConversations,
    allConversations: conversations,
    messages,
    view,
    active,
    search,
    draft,
    modalOpen,
    toast,
    menu,
    renameId,
    friends,
    setSearch,
    setDraft,
    setModalOpen,
    setMenu,
    setRenameId,
    openFriends,
    openConversation,
    moveConversation,
    toggleGroup,
    createGroup,
    renameGroup,
    deleteGroup,
    openOrCreateDm,
    sendMessage,
    showToast,
  }
}
