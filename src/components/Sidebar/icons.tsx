type IconProps = {
  size?: number
}

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2',
  strokeLinecap: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

export function MenuIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} {...base}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
