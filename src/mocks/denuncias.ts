import type { Denuncia } from '../types/denuncia'

/** Dados de exemplo enquanto não há API. Substituir pela busca no backend. */
export const denunciasMock: Denuncia[] = [
  {
    id: '543',
    data: '23/06/2026',
    autor: 'João Carlos da Vila',
    titulo: 'Loja anunciada no Instagram sumiu depois do pagamento',
    categoria: 'Golpes ou fraudes financeiras',
    descricao:
      'Comprei um produto através de um anúncio do Instagram e nunca o recebi. A página saiu do ar no dia seguinte. Paguei por Pix e o vendedor parou de responder as mensagens.',
    link: 'https://instagram.com/p/exemplo-543',
    rede: 'Instagram',
    status: 'emAnalise',
  },
  {
    id: '542',
    data: '22/06/2026',
    autor: 'Marina Alves',
    titulo: 'Perfil falso usando minhas fotos para pedir dinheiro',
    categoria: 'Perfil falso',
    descricao:
      'Criaram um perfil usando minhas fotos para pedir dinheiro emprestado aos meus contatos. Já reportei pelo aplicativo três vezes e o perfil continua ativo.',
    link: 'https://facebook.com/exemplo-542',
    rede: 'Facebook',
    status: 'recebida',
  },
  {
    id: '539',
    data: '21/06/2026',
    autor: 'Anônimo',
    titulo: 'Grupo público com material envolvendo menores',
    categoria: 'Conteúdo sexual envolvendo menores',
    descricao:
      'Grupo público divulgando material com suspeita de envolver menores de idade. Denunciei no aplicativo e continua no ar.',
    link: 'https://t.me/exemplo-539',
    rede: 'Telegram',
    status: 'resolvida',
  },
  {
    id: '536',
    data: '19/06/2026',
    autor: 'Roberto Nunes',
    titulo: 'Ameaças recorrentes do mesmo número',
    categoria: 'Assédio e ameaças',
    descricao:
      'Recebo mensagens ameaçadoras do mesmo usuário há duas semanas, mesmo depois de bloquear e reportar. Ele cria um número novo a cada bloqueio.',
    link: 'https://wa.me/exemplo-536',
    rede: 'WhatsApp',
    status: 'emAnalise',
  },
  {
    id: '531',
    data: '17/06/2026',
    autor: 'Camila Prado',
    titulo: 'Anúncio vende remédio sem registro como cura para diabetes',
    categoria: 'Desinformação sobre saúde',
    descricao:
      'Vídeo patrocinado indica remédio sem registro na Anvisa como cura para diabetes, com mais de 200 mil visualizações.',
    link: 'https://tiktok.com/@exemplo/video/531',
    rede: 'TikTok',
    status: 'recebida',
  },
  {
    id: '528',
    data: '15/06/2026',
    autor: 'Anônimo',
    titulo: 'Falso investimento usando o nome de um banco',
    categoria: 'Golpes ou fraudes financeiras',
    descricao:
      'Anúncio de investimento prometendo 30% ao mês usando o nome de um banco conhecido.',
    link: 'https://youtube.com/watch?v=exemplo-528',
    rede: 'YouTube',
    status: 'arquivada',
  },
  {
    id: '524',
    data: '12/06/2026',
    autor: 'Lucas Ferreira',
    titulo: 'Perfil incita violência contra moradores de rua',
    categoria: 'Discurso de ódio',
    descricao:
      'Perfil publica diariamente conteúdo incitando violência contra moradores de rua na minha cidade.',
    link: 'https://x.com/exemplo/status/524',
    rede: 'X',
    status: 'resolvida',
  },
]
