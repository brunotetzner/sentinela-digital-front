import { request } from '../services/apiClient'
import type { ItemDeCatalogo } from '../types/denuncia'

/**
 * Categorias e redes sociais aceitas pela API.
 *
 * Vêm do backend em vez de estarem escritas aqui porque o `id` é validado por um enum Zod lá:
 * uma lista local sairia de sincronia sem aviso, e o sintoma seria um 422 na cara de quem
 * está denunciando.
 */

export type Catalogos = {
  categorias: ItemDeCatalogo[]
  redesSociais: ItemDeCatalogo[]
}

/**
 * Cache de processo: as duas listas são fixas e públicas, e três telas precisam delas.
 * Guardar a promessa (e não o resultado) faz chamadas simultâneas compartilharem uma
 * requisição só.
 */
let emCache: Promise<Catalogos> | null = null

export function carregarCatalogos(): Promise<Catalogos> {
  emCache ??= Promise.all([
    request<ItemDeCatalogo[]>('/categorias'),
    request<ItemDeCatalogo[]>('/redes-sociais'),
  ])
    .then(([categorias, redesSociais]) => ({ categorias, redesSociais }))
    .catch((erro: unknown) => {
      // Sem isto, uma falha de rede no primeiro acesso deixaria o cache com uma promessa
      // rejeitada para sempre, e nenhuma tela conseguiria se recuperar.
      emCache = null
      throw erro
    })

  return emCache
}
