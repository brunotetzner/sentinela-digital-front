import type { Denuncia } from '../../types/denuncia'

/** Dados de exemplo enquanto não há API. Substituir pela busca no backend. */
export const denunciasMock: Denuncia[] = [
  {
    id: '543',
    data: '23/06/2026',
    autor: 'João Carlos da Vila',
    categoria: 'Golpes ou fraudes financeiras',
    descricao:
      'Comprei um produto através de um anúncio do Instagram e nunca o recebi. A página saiu do ar no dia seguinte.',
    rede: 'Instagram',
    status: 'emAnalise',
  },
  {
    id: '542',
    data: '22/06/2026',
    autor: 'Marina Alves',
    categoria: 'Perfil falso',
    descricao:
      'Criaram um perfil usando minhas fotos para pedir dinheiro emprestado aos meus contatos.',
    rede: 'Facebook',
    status: 'recebida',
  },
  {
    id: '539',
    data: '21/06/2026',
    autor: 'Anônimo',
    categoria: 'Conteúdo sexual envolvendo menores',
    descricao:
      'Grupo público divulgando material com suspeita de envolver menores de idade. Denunciei no aplicativo e continua no ar.',
    rede: 'Telegram',
    status: 'resolvida',
  },
  {
    id: '536',
    data: '19/06/2026',
    autor: 'Roberto Nunes',
    categoria: 'Assédio e ameaças',
    descricao:
      'Recebo mensagens ameaçadoras do mesmo usuário há duas semanas, mesmo depois de bloquear e reportar.',
    rede: 'WhatsApp',
    status: 'emAnalise',
  },
  {
    id: '531',
    data: '17/06/2026',
    autor: 'Camila Prado',
    categoria: 'Desinformação sobre saúde',
    descricao:
      'Vídeo patrocinado indica remédio sem registro na Anvisa como cura para diabetes, com mais de 200 mil visualizações.',
    rede: 'TikTok',
    status: 'recebida',
  },
  {
    id: '528',
    data: '15/06/2026',
    autor: 'Anônimo',
    categoria: 'Golpes ou fraudes financeiras',
    descricao:
      'Anúncio de investimento prometendo 30% ao mês usando o nome de um banco conhecido.',
    rede: 'YouTube',
    status: 'arquivada',
  },
  {
    id: '524',
    data: '12/06/2026',
    autor: 'Lucas Ferreira',
    categoria: 'Discurso de ódio',
    descricao:
      'Perfil publica diariamente conteúdo incitando violência contra moradores de rua na minha cidade.',
    rede: 'X',
    status: 'resolvida',
  },
]
