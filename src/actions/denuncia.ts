import { request } from '../services/apiClient'
import type { PaginaDeDenuncias, StatusDenuncia } from '../types/denuncia'

/** O que o `POST /denuncia` aceita. `status` e autor saem do token, não do payload. */
export type NovaDenuncia = {
  titulo: string
  descricao: string
  categoria_id: string
  rede_social_id: string
  link: string
}

export type FiltrosDeListagem = {
  rede_social_id?: string
  status?: StatusDenuncia
  /** O `proximo_cursor` da página anterior. Ausente = primeira página. */
  cursor?: string
}

function montarQuery(filtros: FiltrosDeListagem): string {
  const parametros = new URLSearchParams()

  // Filtro vazio significa "todos" e não pode ir na URL: o backend validaria `''` contra o
  // enum e devolveria 422.
  if (filtros.rede_social_id) parametros.set('rede_social_id', filtros.rede_social_id)
  if (filtros.status) parametros.set('status', filtros.status)
  if (filtros.cursor) parametros.set('cursor', filtros.cursor)

  const query = parametros.toString()

  return query ? `?${query}` : ''
}

/**
 * `GET /denuncia`. Página de 20, da mais recente para a mais antiga.
 *
 * Trocar de filtro invalida o cursor — recomece sem `cursor` sempre que os filtros mudarem.
 */
export function listarDenuncias(
  token: string,
  filtros: FiltrosDeListagem = {},
): Promise<PaginaDeDenuncias> {
  return request<PaginaDeDenuncias>(`/denuncia${montarQuery(filtros)}`, { token })
}

/** `POST /denuncia`. Devolve o id da denúncia criada — note que responde 200, não 201. */
export function criarDenuncia(token: string, dados: NovaDenuncia): Promise<{ id: string }> {
  return request<{ id: string }>('/denuncia', { method: 'POST', body: dados, token })
}
