/**
 * Espelho do que a API devolve. Os nomes dos campos são os do backend, em snake_case, de
 * propósito: traduzir na fronteira criaria um segundo vocabulário para a mesma coisa.
 */

/** Situação de uma denúncia. Quem define cada uma está no README do backend. */
export type StatusDenuncia = 'ATIVO' | 'ENCERRADO' | 'REMOVIDO'

/**
 * Item de `/categorias` e `/redes-sociais`: o `id` vai no payload, o `nome` vai na tela.
 *
 * Os ids não viram união de literais aqui porque a lista é da API — fixá-los no front seria
 * recriar o problema que esses endpoints existem para resolver.
 */
export type ItemDeCatalogo = {
  id: string
  nome: string
}

/** Quem registrou. `null` quando a conta foi apagada depois da denúncia. */
export type Autor = {
  nome: string
  username: string
} | null

export type Denuncia = {
  id: string
  titulo: string
  descricao: string
  categoria_id: string
  rede_social_id: string
  /** Endereço do conteúdo denunciado */
  link: string
  status: StatusDenuncia
  autor_da_reclamacao_id: string
  autor: Autor
  /** Epoch em milissegundos */
  criado_em: number
  /** Epoch em milissegundos. É por onde a listagem ordena e pagina. */
  atualizado_em: number
}

/** Uma página de `GET /denuncia`. `proximo_cursor` vem `null` quando acabou. */
export type PaginaDeDenuncias = {
  data: Denuncia[]
  proximo_cursor: string | null
}
