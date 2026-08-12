import { useEffect, useState } from 'react'
import { carregarCatalogos } from '../actions/catalogo'
import type { Catalogos } from '../actions/catalogo'
import type { ItemDeCatalogo } from '../types/denuncia'

const VAZIO: Catalogos = { categorias: [], redesSociais: [] }

/** `id → nome`, para traduzir o que a listagem devolve em algo legível. */
export type MapaDeNomes = (id: string) => string

function montarMapa(itens: ItemDeCatalogo[]): MapaDeNomes {
  const nomes = new Map(itens.map((item) => [item.id, item.nome]))

  // Id desconhecido cai de volta nele mesmo: melhor mostrar `GOLPE_FINANCEIRO` do que um
  // espaço em branco se o backend ganhar uma categoria que este front ainda não conhece.
  return (id: string) => nomes.get(id) ?? id
}

/**
 * Carrega categorias e redes sociais. O resultado é cacheado no módulo da action, então só a
 * primeira tela da sessão paga a requisição.
 */
export function useCatalogos() {
  const [catalogos, setCatalogos] = useState<Catalogos>(VAZIO)
  const [carregando, setCarregando] = useState(true)
  const [falhou, setFalhou] = useState(false)

  useEffect(() => {
    let cancelado = false

    carregarCatalogos()
      .then((resultado) => {
        if (!cancelado) setCatalogos(resultado)
      })
      .catch(() => {
        if (!cancelado) setFalhou(true)
      })
      .finally(() => {
        if (!cancelado) setCarregando(false)
      })

    return () => {
      cancelado = true
    }
  }, [])

  return {
    ...catalogos,
    carregando,
    falhou,
    nomeDaCategoria: montarMapa(catalogos.categorias),
    nomeDaRede: montarMapa(catalogos.redesSociais),
  }
}
