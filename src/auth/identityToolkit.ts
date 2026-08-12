import { ApiError } from '../services/ApiError'

/**
 * Conversa direta com o Identity Toolkit do Google.
 *
 * O `POST /usuario/login` da nossa API devolve um *custom token*, que o backend não aceita
 * como `Bearer`. Quem transforma isso num ID token é o Google — é o que o SDK web do Firebase
 * faria por baixo, e é o que os scripts do próprio backend (`scripts/fumaca.ts`) já fazem.
 *
 * A chave aqui é a web API key, feita para viver no cliente. Ela não autoriza nada sozinha.
 */

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY

const TROCA = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken'
const RENOVACAO = 'https://securetoken.googleapis.com/v1/token'

export type Tokens = {
  idToken: string
  refreshToken: string
  /** Epoch em milissegundos, como o resto da aplicação. */
  expiraEm: number
}

/** Claims que lemos do ID token. A verificação da assinatura é do backend, não nossa. */
export type ClaimsDoToken = {
  uid: string
  email: string
  ehAdmin: boolean
}

type RespostaDeErro = { error?: { message?: string } }

async function chamar(url: string, corpo: unknown): Promise<Record<string, unknown>> {
  let resposta: Response

  try {
    resposta = await fetch(`${url}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
    })
  } catch {
    throw new ApiError(0, null, {}, 'Não foi possível falar com o servidor de autenticação')
  }

  const dados = (await resposta.json().catch(() => null)) as Record<string, unknown> | null

  if (!resposta.ok) {
    // Mensagens do Google, em maiúsculas: INVALID_CUSTOM_TOKEN, TOKEN_EXPIRED, USER_DISABLED…
    const codigo = (dados as RespostaDeErro | null)?.error?.message ?? null

    throw new ApiError(resposta.status, codigo, {}, `Falha na autenticação: ${codigo ?? 'erro'}`)
  }

  return dados ?? {}
}

/** Segundos até expirar, como o Google devolve (string), virando um instante absoluto. */
function instanteDeExpiracao(expiresIn: unknown): number {
  const segundos = Number(expiresIn)

  return Date.now() + (Number.isFinite(segundos) ? segundos : 3600) * 1000
}

/** Custom token da nossa API → ID token que o backend aceita como `Bearer`. */
export async function trocarCustomToken(customToken: string): Promise<Tokens> {
  const dados = await chamar(TROCA, { token: customToken, returnSecureToken: true })

  return {
    idToken: String(dados.idToken),
    refreshToken: String(dados.refreshToken),
    expiraEm: instanteDeExpiracao(dados.expiresIn),
  }
}

/** O ID token vale 1 hora. Depois disso o refresh token gera outro sem pedir a senha. */
export async function renovarIdToken(refreshToken: string): Promise<Tokens> {
  const dados = await chamar(RENOVACAO, {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  })

  return {
    idToken: String(dados.id_token),
    refreshToken: String(dados.refresh_token),
    expiraEm: instanteDeExpiracao(dados.expires_in),
  }
}

/**
 * Lê as claims do ID token sem verificar a assinatura.
 *
 * Serve só para a interface: mostrar o e-mail e saber se mostra recursos de admin. Quem
 * decide o que pode de fato é o backend, que verifica a assinatura em toda requisição — um
 * token adulterado aqui não compra acesso a nada.
 */
export function lerClaims(idToken: string): ClaimsDoToken | null {
  const payload = idToken.split('.')[1]

  if (!payload) return null

  try {
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    const claims = JSON.parse(json) as Record<string, unknown>
    const uid = claims.user_id ?? claims.sub

    if (typeof uid !== 'string') return null

    return {
      uid,
      email: typeof claims.email === 'string' ? claims.email : '',
      ehAdmin: claims.admin === true,
    }
  } catch {
    return null
  }
}
