export const paths = {
  login: '/login',
  cadastro: '/cadastro',
  denuncias: '/denuncias',
  criarDenuncia: '/denuncias/criar',
  detalhesDaDenuncia: (id: string) => `/denuncias/${id}`,
} as const
