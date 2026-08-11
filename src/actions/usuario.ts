import { request } from '../services/apiClient'

/**
 * Cadastro como o backend espera. `senha` vai em texto claro no corpo — o hash é feito lá,
 * e o que protege isso em produção é HTTPS.
 */
export type DadosCadastro = {
  nome: string
  username: string
  email: string
  senha: string
}

/** O `id` é o uid do Firebase Auth. */
export type UsuarioCriado = {
  id: string
}

/**
 * `POST /usuario`. Devolve o uid em caso de sucesso.
 *
 * Lança `ApiError` no resto — `409` com código `email_em_uso` ou `username_em_uso`, `422`
 * com os campos inválidos em `errosPorCampo`, `500` com código `erro`.
 */
export function cadastrarUsuario(dados: DadosCadastro): Promise<UsuarioCriado> {
  return request<UsuarioCriado>('/usuario', { method: 'POST', body: dados })
}
