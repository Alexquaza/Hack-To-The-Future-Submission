import type { Conversation, DmGroup, Message, User } from './types'

export const YOU: User = {
  id: 'you',
  name: 'Alex',
  handle: 'alex',
  color: '#3dcea8',
  initials: 'A',
  presence: 'online',
  status: 'Building Cove',
}

export const USERS: User[] = [
  {
    id: 'maya',
    name: 'Maya Chen',
    handle: 'maya',
    color: '#7c9cff',
    initials: 'MC',
    presence: 'online',
    status: 'In Figma',
  },
  {
    id: 'jordan',
    name: 'Jordan Hale',
    handle: 'jordan',
    color: '#f0a36b',
    initials: 'JH',
    presence: 'idle',
    status: 'Back in 20',
  },
  {
    id: 'priya',
    name: 'Priya Nair',
    handle: 'priya',
    color: '#c084fc',
    initials: 'PN',
    presence: 'online',
    status: 'Office hours',
  },
  {
    id: 'sam',
    name: 'Sam Ortiz',
    handle: 'sam',
    color: '#5ec8e8',
    initials: 'SO',
    presence: 'offline',
  },
  {
    id: 'riley',
    name: 'Riley Cho',
    handle: 'riley',
    color: '#e25c6a',
    initials: 'RC',
    presence: 'dnd',
    status: 'Do not disturb',
  },
  {
    id: 'theo',
    name: 'Theo Brooks',
    handle: 'theo',
    color: '#8b95a5',
    initials: 'TB',
    presence: 'online',
    status: 'Grinding leetcode',
  },
  {
    id: 'nina',
    name: 'Nina Volk',
    handle: 'nina',
    color: '#f0a36b',
    initials: 'NV',
    presence: 'idle',
  },
  {
    id: 'casey',
    name: 'Casey Moon',
    handle: 'casey',
    color: '#3dcea8',
    initials: 'CM',
    presence: 'online',
    status: 'Hackathon mode',
  },
]

export const GROUPS: DmGroup[] = [
  { id: 'work', name: 'Work', color: '#7c9cff', collapsed: false },
  { id: 'class', name: 'Class', color: '#c084fc', collapsed: false },
  { id: 'family', name: 'Family', color: '#f0a36b', collapsed: false },
]

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c-maya',
    participantIds: ['maya'],
    lastMessage: 'Deck is in the shared folder — look at slide 8',
    lastTime: '4:12 PM',
    unread: 2,
    groupId: 'work',
  },
  {
    id: 'c-jordan',
    participantIds: ['jordan'],
    lastMessage: 'Can you jump on the 5pm review?',
    lastTime: '3:48 PM',
    unread: 0,
    groupId: 'work',
  },
  {
    id: 'c-priya',
    participantIds: ['priya'],
    lastMessage: 'Office hours moved to room 214',
    lastTime: 'Yesterday',
    unread: 1,
    groupId: 'class',
  },
  {
    id: 'c-squad',
    participantIds: ['maya', 'priya', 'casey'],
    name: 'Study Squad',
    lastMessage: 'Casey: I pushed the notes doc',
    lastTime: 'Yesterday',
    unread: 0,
    groupId: 'class',
  },
  {
    id: 'c-sam',
    participantIds: ['sam'],
    lastMessage: 'Dinner Sunday? I can host.',
    lastTime: 'Mon',
    unread: 0,
    groupId: 'family',
  },
  {
    id: 'c-nina',
    participantIds: ['nina'],
    lastMessage: 'Mom says bring the good chips this time',
    lastTime: 'Sun',
    unread: 0,
    groupId: 'family',
  },
  {
    id: 'c-riley',
    participantIds: ['riley'],
    lastMessage: 'That clip is unhinged, send the rest',
    lastTime: '2:04 PM',
    unread: 3,
    groupId: null,
  },
  {
    id: 'c-theo',
    participantIds: ['theo'],
    lastMessage: 'You still running this weekend?',
    lastTime: 'Fri',
    unread: 0,
    groupId: null,
  },
]

export const MESSAGES: Record<string, Message[]> = {
  'c-maya': [
    {
      id: 'm1',
      authorId: 'maya',
      text: 'Hey — I dropped the latest pitch deck in the shared folder.',
      time: 'Today at 3:58 PM',
    },
    {
      id: 'm2',
      authorId: 'maya',
      text: 'Look at slide 8. I think the grouping demo should lead, not the server list.',
      time: 'Today at 4:01 PM',
    },
    {
      id: 'm3',
      authorId: 'you',
      text: 'Agreed. People already know servers. DMs being a flat pile is the actual pain.',
      time: 'Today at 4:06 PM',
    },
    {
      id: 'm4',
      authorId: 'maya',
      text: 'Deck is in the shared folder — look at slide 8',
      time: 'Today at 4:12 PM',
    },
  ],
  'c-jordan': [
    {
      id: 'j1',
      authorId: 'jordan',
      text: 'Standup notes are in the thread. Design wants a tighter story.',
      time: 'Today at 1:20 PM',
    },
    {
      id: 'j2',
      authorId: 'you',
      text: 'I can walk the grouping flow live if we have five minutes.',
      time: 'Today at 1:31 PM',
    },
    {
      id: 'j3',
      authorId: 'jordan',
      text: 'Can you jump on the 5pm review?',
      time: 'Today at 3:48 PM',
    },
  ],
  'c-priya': [
    {
      id: 'p1',
      authorId: 'priya',
      text: 'Did you see the midterm review got moved?',
      time: 'Yesterday at 6:14 PM',
    },
    {
      id: 'p2',
      authorId: 'you',
      text: 'No — where are we meeting now?',
      time: 'Yesterday at 6:22 PM',
    },
    {
      id: 'p3',
      authorId: 'priya',
      text: 'Office hours moved to room 214',
      time: 'Yesterday at 6:23 PM',
    },
  ],
  'c-squad': [
    {
      id: 's1',
      authorId: 'casey',
      text: 'I made a doc for Thursday. Dump anything messy in there.',
      time: 'Yesterday at 8:02 PM',
    },
    {
      id: 's2',
      authorId: 'maya',
      text: 'Adding the practice set from lecture 6.',
      time: 'Yesterday at 8:11 PM',
    },
    {
      id: 's3',
      authorId: 'priya',
      text: 'If we split chapters we can finish tonight.',
      time: 'Yesterday at 8:14 PM',
    },
    {
      id: 's4',
      authorId: 'casey',
      text: 'I pushed the notes doc',
      time: 'Yesterday at 8:40 PM',
    },
  ],
  'c-sam': [
    {
      id: 'sa1',
      authorId: 'sam',
      text: 'Are you free Sunday? I was thinking tacos at my place.',
      time: 'Monday at 5:03 PM',
    },
    {
      id: 'sa2',
      authorId: 'you',
      text: 'Yes. I can bring drinks.',
      time: 'Monday at 5:10 PM',
    },
    {
      id: 'sa3',
      authorId: 'sam',
      text: 'Dinner Sunday? I can host.',
      time: 'Monday at 5:12 PM',
    },
  ],
  'c-nina': [
    {
      id: 'n1',
      authorId: 'nina',
      text: 'Just a heads up — family dinner is earlier this week.',
      time: 'Sunday at 11:02 AM',
    },
    {
      id: 'n2',
      authorId: 'nina',
      text: 'Mom says bring the good chips this time',
      time: 'Sunday at 11:04 AM',
    },
  ],
  'c-riley': [
    {
      id: 'r1',
      authorId: 'riley',
      text: 'I found the rest of that video.',
      time: 'Today at 1:51 PM',
    },
    {
      id: 'r2',
      authorId: 'you',
      text: 'Send it. I only saw the first 12 seconds.',
      time: 'Today at 1:58 PM',
    },
    {
      id: 'r3',
      authorId: 'riley',
      text: 'That clip is unhinged, send the rest',
      time: 'Today at 2:04 PM',
    },
  ],
  'c-theo': [
    {
      id: 't1',
      authorId: 'theo',
      text: 'Weather looks decent Saturday.',
      time: 'Friday at 7:41 PM',
    },
    {
      id: 't2',
      authorId: 'theo',
      text: 'You still running this weekend?',
      time: 'Friday at 7:42 PM',
    },
  ],
}

export function userById(id: string): User {
  if (id === YOU.id) return YOU
  const user = USERS.find((item) => item.id === id)
  if (!user) {
    throw new Error(`Unknown user: ${id}`)
  }
  return user
}

export function conversationTitle(conversation: Conversation): string {
  if (conversation.name) return conversation.name
  return conversation.participantIds.map((id) => userById(id).name).join(', ')
}
