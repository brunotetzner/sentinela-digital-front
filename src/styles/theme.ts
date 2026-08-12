/**
 * Guia de estilo do Sentinela Digital.
 *
 * Direção institucional cívica: azul-marinho e branco, alto contraste. A tela precisa
 * comprar a confiança de quem chega abalado para denunciar.
 *
 * Tudo que for cor, fonte, raio ou espaçamento sai daqui — os componentes nunca escrevem
 * valores literais. Consumir sempre via `({ theme }) => ...` dentro do styled-components.
 */
export const theme = {
  colors: {
    /** Fundo da aplicação */
    background: '#F4F7FA',
    /** Cartões, campos e superfícies claras */
    surface: '#FFFFFF',
    /** Painel de marca e ação principal */
    primary: '#0F2A47',
    primaryHover: '#173D63',
    /** Links e anel de foco */
    accent: '#1B6FB5',
    /** Marca sobre o fundo escuro — claro o bastante para contrastar com o navy */
    accentSoft: '#4FA3E3',
    /** Bordas de campo */
    border: '#C7D4E0',
    /** Texto sobre superfície clara — 15:1 sobre branco */
    text: '#10202E',
    /** Texto sobre o painel navy — 13:1 sobre primary */
    textOnPrimary: '#EAF1F8',
    /** Texto de apoio, placeholders */
    textMuted: '#5B7288',
    /** Erros de validação */
    danger: '#B3261E',
    /** Confirmações — 7:1 sobre o próprio fundo claro */
    success: '#0F5C41',
    successSoft: '#DCF2E8',
    /**
     * Situação de uma denúncia — fundo claro com texto escuro, todos acima de 6:1.
     * As chaves são os status que a API devolve.
     */
    status: {
      ATIVO: { background: '#E3EFF9', text: '#155189' },
      ENCERRADO: { background: '#DCF2E8', text: '#0F5C41' },
      REMOVIDO: { background: '#E9EEF3', text: '#4A5C6B' },
    },
  },
  fonts: {
    family: "'Inter', system-ui, -apple-system, sans-serif",
    sizes: {
      xs: '0.75rem', // 12px — legendas
      sm: '0.875rem', // 14px — rótulos, textos de apoio
      md: '1rem', // 16px — corpo e campos (abaixo disso o iOS dá zoom)
      lg: '1.125rem', // 18px — subtítulos
      xl: '1.5rem', // 24px — título de tela
      xxl: '1.75rem', // 28px — chamada do painel de marca
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
