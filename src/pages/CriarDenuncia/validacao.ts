import type { NovaDenuncia } from '../../actions/denuncia'
import { linkSeguro } from '../../utils/link'

/** Regras espelhando `CriarDenunciaSchema` do backend, mais a restrição de esquema do link. */

export type CampoDenuncia = keyof NovaDenuncia

export type FormularioDenuncia = Record<CampoDenuncia, string>

export type ErrosDenuncia = Partial<Record<CampoDenuncia, string>>

export const FORMULARIO_VAZIO: FormularioDenuncia = {
  titulo: '',
  descricao: '',
  categoria_id: '',
  rede_social_id: '',
  link: '',
}

export function paraEnvio(formulario: FormularioDenuncia): NovaDenuncia {
  return {
    titulo: formulario.titulo.trim(),
    descricao: formulario.descricao.trim(),
    categoria_id: formulario.categoria_id,
    rede_social_id: formulario.rede_social_id,
    link: formulario.link.trim(),
  }
}

export function validarDenuncia(formulario: FormularioDenuncia): ErrosDenuncia {
  const { titulo, descricao, categoria_id, rede_social_id, link } = paraEnvio(formulario)
  const erros: ErrosDenuncia = {}

  if (!titulo) erros.titulo = 'Resuma o caso em uma frase'
  else if (titulo.length > 120) erros.titulo = 'No máximo 120 caracteres'

  if (!descricao) erros.descricao = 'Conte o que aconteceu'
  else if (descricao.length > 2000) erros.descricao = 'No máximo 2000 caracteres'

  if (!categoria_id) erros.categoria_id = 'Escolha uma categoria'

  if (!rede_social_id) erros.rede_social_id = 'Escolha a plataforma'

  if (!link) erros.link = 'Informe o link do conteúdo'
  else if (!linkSeguro(link)) erros.link = 'Informe um endereço completo, começando com https://'

  return erros
}

/** Rede de segurança para o 422, já que as mensagens do Zod chegam em inglês. */
const MENSAGENS_DO_BACKEND: Record<string, string> = {
  titulo: 'Informe um título com até 120 caracteres',
  descricao: 'Informe uma descrição com até 2000 caracteres',
  categoria_id: 'Escolha uma categoria válida',
  rede_social_id: 'Escolha uma plataforma válida',
  link: 'Informe um endereço completo, começando com https://',
}

export function errosDoBackend(errosPorCampo: Record<string, string>): ErrosDenuncia {
  const erros: ErrosDenuncia = {}

  for (const campo of Object.keys(errosPorCampo)) {
    const mensagem = MENSAGENS_DO_BACKEND[campo]

    if (mensagem) erros[campo as CampoDenuncia] = mensagem
  }

  return erros
}
