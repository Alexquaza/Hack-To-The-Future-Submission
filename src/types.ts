export type Presence = 'online' | 'idle' | 'dnd' | 'offline'

export type User = {
  id: string
  name: string
  handle: string
  color: string
  initials: string
  presence: Presence
  status?: string
}

export type Message = {
  id: string
  authorId: string
  text: string
  time: string
}

export type Conversation = {
  id: string
  participantIds: string[]
  name?: string
  lastMessage: string
  lastTime: string
  unread: number
  groupId: string | null
}

export type DmGroup = {
  id: string
  name: string
  color: string
  collapsed: boolean
}

export type View = 'friends' | 'dm'
