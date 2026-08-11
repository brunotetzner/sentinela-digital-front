import type { DadosCadastro } from '../../actions/usuario'

/**
 * Regras de cadastro, espelhando os schemas Zod do backend (`src/usuario/Schemas.ts`).
 *
 * Validar aqui é sobre resposta imediata, não sobre confiança: o backend valida de novo e é
 * ele quem decide. Se as duas divergirem, o 422 aparece e `MENSAGENS_DO_BACKEND` cobre.
 */

/** Mesmo padrão que o `z.email()` do backend usa — copiado do 422 para não haver desvio. */
const EMAIL =
  /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/

const USERNAME = /^[a-z0-9_]+$/

/** Exibido abaixo do campo, e o texto do erro quando o formato não bate. */
export const REGRAS_USERNAME = '3 a 20 caracteres, apenas letras minúsculas, números e _'

export type CampoCadastro = 'nome' | 'username' | 'email' | 'senha' | 'confirmacao'

export type FormularioCadastro = Record<CampoCadastro, string>

export type ErrosCadastro = Partial<Record<CampoCadastro, string>>

export const FORMULARIO_VAZIO: FormularioCadastro = {
  nome: '',
  username: '',
  email: '',
  senha: '',
  confirmacao: '',
}

/** Espaços nas pontas são erro de digitação, não conteúdo. A senha nunca é tocada. */
export function paraEnvio(formulario: FormularioCadastro): DadosCadastro {
  return {
    nome: formulario.nome.trim(),
    username: formulario.username.trim(),
    email: formulario.email.trim(),
    senha: formulario.senha,
  }
}

export function validarCadastro(formulario: FormularioCadastro): ErrosCadastro {
  const { nome, username, email, senha } = paraEnvio(formulario)
  const erros: ErrosCadastro = {}

  if (!nome) erros.nome = 'Informe seu nome'
  else if (nome.length > 80) erros.nome = 'No máximo 80 caracteres'

  if (!username) erros.username = 'Escolha um nome de usuário'
  else if (username.length < 3 || username.length > 20 || !USERNAME.test(username))
    erros.username = REGRAS_USERNAME

  if (!email) erros.email = 'Informe seu e-mail'
  else if (!EMAIL.test(email)) erros.email = 'E-mail inválido'

  if (!senha) erros.senha = 'Crie uma senha'
  else if (senha.length < 6) erros.senha = 'Pelo menos 6 caracteres'
  else if (senha.length > 72) erros.senha = 'No máximo 72 caracteres'

  if (!formulario.confirmacao) erros.confirmacao = 'Repita a senha'
  else if (formulario.confirmacao !== senha) erros.confirmacao = 'As senhas não coincidem'

  return erros
}

/**
 * Rede de segurança para o 422: traduz o nome do campo vindo do backend numa mensagem
 * exibível, já que as do Zod chegam em inglês.
 *
 * Só entra em cena se as regras acima divergirem das do backend.
 */
const MENSAGENS_DO_BACKEND: Record<string, string> = {
  nome: 'Informe um nome com até 80 caracteres',
  username: REGRAS_USERNAME,
  email: 'E-mail inválido',
  senha: 'A senha precisa ter de 6 a 72 caracteres',
}

/** Converte o `errosPorCampo` de um `ApiError` em mensagens por campo do formulário. */
export function errosDoBackend(errosPorCampo: Record<string, string>): ErrosCadastro {
  const erros: ErrosCadastro = {}

  for (const campo of Object.keys(errosPorCampo)) {
    const mensagem = MENSAGENS_DO_BACKEND[campo]

    if (mensagem) erros[campo as CampoCadastro] = mensagem
  }

  return erros
}
