import { useState } from 'react'
import { conversationTitle } from '../data'
import type { Conversation } from '../types'

const COLORS = ['#7c9cff', '#3dcea8', '#f0a36b', '#e25c6a', '#c084fc', '#5ec8e8']

type GroupModalProps = {
  conversations: Conversation[]
  onClose: () => void
  onCreate: (name: string, color: string, conversationIds: string[]) => void
}

export function GroupModal({ conversations, onClose, onCreate }: GroupModalProps) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <div className="modal-back" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-labelledby="group-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="eyebrow">New DM group</p>
        <h2 id="group-modal-title">Name a stack for your DMs</h2>
        <p className="lede">
          This is not a server. It is a folder for people you already message, so work and everything
          else stop living in one list.
        </p>

        <label className="field">
          <span>Group name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Work, Class, Roommates..."
            autoFocus
          />
        </label>

        <div className="field">
          <span>Color</span>
          <div className="swatches">
            {COLORS.map((value) => (
              <button
                key={value}
                type="button"
                className={value === color ? 'picked' : ''}
                style={{ background: value }}
                onClick={() => setColor(value)}
                aria-label={`Use ${value}`}
              />
            ))}
          </div>
        </div>

        <div className="field">
          <span>Add conversations</span>
          <ul className="pick-list">
            {conversations.map((item) => (
              <li key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() => toggle(item.id)}
                  />
                  <span>{conversationTitle(item)}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="modal-actions">
          <button type="button" className="ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="primary"
            disabled={!name.trim()}
            onClick={() => onCreate(name.trim(), color, selected)}
          >
            Create group
          </button>
        </div>
      </div>
    </div>
  )
}
