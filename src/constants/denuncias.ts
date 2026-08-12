import type { ItemDeCatalogo, StatusDenuncia } from '../types/denuncia'

/**
 * Categorias e redes sociais **não** estão aqui: vêm de `/categorias` e `/redes-sociais`,
 * porque o backend valida os ids contra um enum e uma cópia local sairia de sincronia.
 *
 * Os status ficam, porque não têm endpoint de catálogo — são parte do contrato e mudam junto
 * com o código dos dois lados.
 */

/** Texto de tela para cada status, no feminino de "denúncia". */
export const NOME_DO_STATUS: Record<StatusDenuncia, string> = {
  ATIVO: 'Ativa',
  ENCERRADO: 'Encerrada',
  REMOVIDO: 'Removida',
}

/** Mesma lista no formato que o `Select` consome. */
export const STATUS_DA_DENUNCIA: ItemDeCatalogo[] = (
  Object.keys(NOME_DO_STATUS) as StatusDenuncia[]
).map((id) => ({ id, nome: NOME_DO_STATUS[id] }))
