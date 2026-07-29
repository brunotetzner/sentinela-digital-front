export const theme = {
  colors: {
    primary: '#1e40af',
    background: '#0f172a',
    text: '#f8fafc',
  },
  spacing: (n: number) => `${n * 4}px`,
} as const

export type Theme = typeof theme
