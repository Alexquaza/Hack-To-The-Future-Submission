import { YOU, userById } from '../data'
import type { Conversation, Presence, User } from '../types'

const sizeMap = { sm: 32, md: 40, lg: 72 }

type AvatarProps = {
  user?: User
  conversation?: Conversation
  size?: keyof typeof sizeMap
}

function PresenceDot({ presence, size }: { presence: Presence; size: number }) {
  return (
    <span
      className={`presence-dot ${presence}`}
      style={{ width: Math.max(8, size * 0.28), height: Math.max(8, size * 0.28) }}
    />
  )
}

export function Avatar({ user, conversation, size = 'sm' }: AvatarProps) {
  const px = sizeMap[size]

  if (conversation && conversation.participantIds.length > 1) {
    const faces = conversation.participantIds.slice(0, 3).map((id) => userById(id))
    return (
      <div className="avatar-stack" style={{ width: px, height: px }}>
        {faces.map((face, index) => (
          <span
            key={face.id}
            className="avatar-face"
            style={{
              background: face.color,
              zIndex: faces.length - index,
              width: px * 0.62,
              height: px * 0.62,
              fontSize: px * 0.22,
            }}
          >
            {face.initials}
          </span>
        ))}
      </div>
    )
  }

  const person = user ?? (conversation ? userById(conversation.participantIds[0]) : YOU)
  return (
    <div className="avatar" style={{ width: px, height: px, background: person.color, fontSize: px * 0.34 }}>
      {person.initials}
      <PresenceDot presence={person.presence} size={px} />
    </div>
  )
}
