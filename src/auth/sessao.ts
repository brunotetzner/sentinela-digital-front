import type { Tokens } from './identityToolkit'

/**
 * Sessão persistida entre recargas da página.
 *
 * Fica em `localStorage` porque o ID token dura 1 hora e o refresh token dura até ser
 * revogado — sem persistir, recarregar a página derruba a pessoa. Quem tiver XSS no site lê
 * isso, mas quem tem XSS também lê o token em memória; a defesa é não ter XSS.
 */

const CHAVE = 'sentinela.sessao'

export type Sessao = Tokens & {
  uid: string
  email: string
  ehAdmin: boolean
}

function ehSessao(valor: unknown): valor is Sessao {
  const s = valor as Partial<Sessao> | null

  return (
    typeof s?.idToken === 'string' &&
    typeof s.refreshToken === 'string' &&
    typeof s.expiraEm === 'number' &&
    typeof s.uid === 'string'
  )
}

/** `null` quando não há sessão, quando o storage está indisponível ou quando está corrompida. */
export function lerSessao(): Sessao | null {
  try {
    const bruto = localStorage.getItem(CHAVE)

    if (!bruto) return null

    const valor: unknown = JSON.parse(bruto)

    if (!ehSessao(valor)) {
      localStorage.removeItem(CHAVE)
      return null
    }

    return valor
  } catch {
    return null
  }
}

export function salvarSessao(sessao: Sessao) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(sessao))
  } catch {
    // Storage cheio ou bloqueado (navegação privada). A sessão segue valendo em memória.
  }
}

export function limparSessao() {
  try {
    localStorage.removeItem(CHAVE)
  } catch {
    // Nada a fazer: sem storage, não havia o que limpar.
  }
}
