/**
 * Guia de estilo do Sentinela Digital.
 *
 * Tudo que for cor, fonte, raio ou espaçamento sai daqui — os componentes
 * nunca escrevem valores literais. Consumir sempre via `({ theme }) => ...`
 * dentro do styled-components.
 */
export const theme = {
  colors: {
    /** Fundo da aplicação — marrom rosado dessaturado */
    background: '#5C4547',
    /** Cartões e blocos claros sobre o fundo */
    surface: '#F8EAE9',
    /** Campos de formulário dentro do cartão */
    surfaceAlt: '#FDF7F6',
    /** Ação principal (botões) */
    primary: '#3B1B1F',
    primaryHover: '#4E272C',
    /** Traços e bordas finas */
    border: '#7A5B5D',
    /** Texto sobre o fundo escuro */
    text: '#F5EAE9',
    /** Texto sobre superfícies claras */
    textOnSurface: '#3B1B1F',
    /** Texto de apoio, placeholders */
    textMuted: '#9B8082',
    /** Erros de validação */
    danger: '#B3261E',
  },
  fonts: {
    family: "'Quicksand', system-ui, -apple-system, sans-serif",
    sizes: {
      xs: '0.75rem', // 12px — legendas, links secundários
      sm: '0.875rem', // 14px — placeholders, textos de apoio
      md: '1rem', // 16px — corpo
      lg: '1.125rem', // 18px — subtítulos
      xl: '1.5rem', // 24px — rótulo de botão principal
      xxl: '2rem', // 32px — título de tela
    },
    weights: {
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
  },
  radii: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    pill: '999px',
  },
  spacing: (n: number) => `${n * 4}px`,
} as const

export type Theme = typeof theme
