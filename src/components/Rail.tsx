type RailProps = {
  onHome: () => void
  onServerHint: () => void
}

const communities = [
  { id: 'atlas', label: 'Atlas Lab', color: '#7c9cff', letter: 'A' },
  { id: 'north', label: 'Northwind', color: '#f0a36b', letter: 'N' },
  { id: 'orbit', label: 'Orbit', color: '#c084fc', letter: 'O' },
]

export function Rail({ onHome, onServerHint }: RailProps) {
  return (
    <nav className="rail" aria-label="Communities">
      <button className="rail-btn active" onClick={onHome} title="Direct messages" aria-label="Direct messages">
        <span className="rail-mark">C</span>
      </button>
      <div className="rail-rule" />
      {communities.map((item) => (
        <button
          key={item.id}
          className="rail-btn muted"
          title={`${item.label} — servers stay here`}
          type="button"
          onClick={onServerHint}
        >
          <span className="rail-letter" style={{ background: item.color }}>
            {item.letter}
          </span>
        </button>
      ))}
      <button className="rail-btn add" title="Add a community" type="button">
        +
      </button>
    </nav>
  )
}
