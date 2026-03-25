'use client'

interface ToggleSwitchProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  accent?: 'green' | 'amber' | 'blue'
}

export function ToggleSwitch({ label, checked, onChange, accent = 'green' }: ToggleSwitchProps) {
  const accentColor =
    accent === 'amber' ? 'var(--amber)' :
    accent === 'blue'  ? 'var(--blue)'  :
    'var(--green)'

  const accentGlow =
    accent === 'amber' ? 'rgba(255,184,0,0.07)' :
    accent === 'blue'  ? 'rgba(27,79,216,0.08)' :
    'rgba(0,214,143,0.07)'

  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all duration-150 select-none"
      style={{
        borderColor: checked ? accentColor : 'var(--border-col)',
        background: checked ? accentGlow : 'transparent',
      }}
    >
      {/* Track */}
      <div
        className="relative flex-shrink-0 rounded-full transition-colors duration-150"
        style={{
          width: 30,
          height: 16,
          background: checked ? accentColor : 'var(--border-col)',
        }}
      >
        {/* Thumb */}
        <div
          className="absolute top-[2px] w-3 h-3 bg-white rounded-full shadow transition-all duration-150"
          style={{ left: checked ? 14 : 2 }}
        />
      </div>
      <span
        className="text-xs font-medium transition-colors duration-150 whitespace-nowrap"
        style={{ color: checked ? accentColor : 'var(--text-muted)' }}
      >
        {label}
      </span>
    </button>
  )
}
