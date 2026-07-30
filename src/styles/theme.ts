export const theme = {
  colors: {
    primary: '#1e40af',
    background: '#0f172a',
    surface: '#1e293b',
    border: '#334155',
    text: '#f8fafc',
    muted: '#94a3b8',
    danger: '#dc2626',
  },
  radius: '8px',
  spacing: (n: number) => `${n * 4}px`,
} as const

export type Theme = typeof theme
