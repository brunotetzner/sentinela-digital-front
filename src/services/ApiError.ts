/**
 * Erro de qualquer chamada à API, com o que a interface precisa para decidir o que mostrar.
 *
 * Guarda o *código* devolvido pelo backend, não uma mensagem pronta: as mensagens de
 * validação do Zod vêm em inglês e servem para depurar, não para exibir. Traduzir é
 * responsabilidade de quem renderiza.
 */
export class ApiError extends Error {
  /** Status HTTP. `0` quando a requisição nem chegou ao servidor. */
  status: number
  /** O campo `erro` do corpo — `email_em_uso`, `username_em_uso`, `erro`. */
  codigo: string | null
  /** Código do Zod por campo que falhou: `{ email: 'invalid_format' }`. Vazio fora do 422. */
  errosPorCampo: Record<string, string>

  constructor(
    status: number,
    codigo: string | null,
    errosPorCampo: Record<string, string> = {},
    message = `Requisição falhou com status ${status}`,
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.codigo = codigo
    this.errosPorCampo = errosPorCampo
  }

  /** Servidor fora do ar, DNS, offline — a resposta nunca chegou. */
  get ehFalhaDeRede() {
    return this.status === 0
  }
}
