/** Situação de uma denúncia dentro da plataforma */
export type StatusDenuncia = 'recebida' | 'emAnalise' | 'resolvida' | 'arquivada'

export type Denuncia = {
  /** Protocolo mostrado ao denunciante */
  id: string
  /** Data do registro, já formatada em dd/mm/aaaa */
  data: string
  autor: string
  categoria: string
  descricao: string
  /** Rede social onde o conteúdo foi encontrado */
  rede: string
  status: StatusDenuncia
}
