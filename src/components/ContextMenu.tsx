import type { DmGroup } from '../types'

type ContextMenuProps = {
  x: number
  y: number
  groups: DmGroup[]
  onMove: (groupId: string | null) => void
  onClose: () => void
}

export function ContextMenu({ x, y, groups, onMove, onClose }: ContextMenuProps) {
  return (
    <div className="menu-layer" onClick={onClose} role="presentation">
      <div className="context-menu" style={{ left: x, top: y }} role="menu">
        <p>Move to group</p>
        {groups.map((group) => (
          <button key={group.id} type="button" onClick={() => onMove(group.id)}>
            <i className="swatch" style={{ background: group.color }} />
            {group.name}
          </button>
        ))}
        <button type="button" onClick={() => onMove(null)}>
          Ungrouped
        </button>
      </div>
    </div>
  )
}
