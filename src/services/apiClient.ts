import { ApiError } from './ApiError'

/** Base da API. Sem barra no final — os caminhos passados a `request` começam com `/`. */
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

type Opcoes = {
  method?: 'GET' | 'POST' | 'PUT'
  /** Serializado como JSON. Ausente em GET. */
  body?: unknown
}

/** Formato do 422 do backend: um item por campo que falhou, com o caminho até ele. */
type ErroDeValidacao = {
  errors?: { code?: string; path?: unknown[] }[]
}

/**
 * Extrai `{ campo: código }` do corpo de um 422.
 *
 * O primeiro erro de cada campo vence: o Zod pode reportar mais de um para o mesmo campo
 * (`username: "AB"` falha em `too_small` e em `invalid_format`) e mostrar os dois não ajuda.
 */
function extrairErrosPorCampo(corpo: unknown): Record<string, string> {
  const errors = (corpo as ErroDeValidacao | null)?.errors

  if (!Array.isArray(errors)) return {}

  const porCampo: Record<string, string> = {}

  for (const erro of errors) {
    const campo = erro?.path?.[0]

    if (typeof campo === 'string' && erro.code && !porCampo[campo]) {
      porCampo[campo] = erro.code
    }
  }

  return porCampo
}

/**
 * Chama a API e devolve o corpo já tipado, ou lança `ApiError`.
 *
 * O corpo é lido como texto antes de virar JSON porque nem toda resposta é JSON — o 401 do
 * backend é o texto puro `Unauthorized`, e um `.json()` cego estouraria ali.
 */
export async function request<T>(path: string, { method = 'GET', body }: Opcoes = {}): Promise<T> {
  let resposta: Response

  try {
    resposta = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError(0, null, {}, 'Não foi possível falar com o servidor')
  }

  const texto = await resposta.text()

  let corpo: unknown = null

  try {
    corpo = texto ? JSON.parse(texto) : null
  } catch {
    // Resposta não-JSON (o `Unauthorized` do 401). O status já diz o que aconteceu.
  }

  if (!resposta.ok) {
    const codigo = (corpo as { erro?: string } | null)?.erro ?? null

    throw new ApiError(resposta.status, codigo, extrairErrosPorCampo(corpo))
  }

  return corpo as T
}
