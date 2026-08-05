# Redesign da tela de login — Sentinela Digital

Data: 2026-08-05
Status: aprovado, pronto para plano de implementação

## Contexto

O Sentinela Digital é uma plataforma pública de denúncias de conteúdo nocivo em redes
sociais. As denúncias viram acervo público e alimentam relatórios que cobram resposta
das grandes plataformas.

A tela de login atual (commit `c5d7dfd`) reproduz um print da equipe: fundo marrom,
marca centralizada à esquerda, cartão rosa claro com dois campos sem rótulo visível.
Ela funciona, mas foi desenhada antes de olhar para quem vai usá-la.

## Público-alvo

Dois perfis entram pela mesma tela:

- **Denunciante comum** — leigo, frequentemente abalado (caiu num golpe, sofreu assédio),
  no celular, faixa etária ampla. Acessa raramente. Precisa decidir, no primeiro segundo,
  se confia a denúncia à plataforma.
- **Moderador** — entra todos os dias, quer eficiência.

O denunciante é quem manda no design: é ele que abandona a tela se ela não passar
credibilidade, e é ele que sofre com contraste baixo e alvos pequenos.

## Direção visual escolhida

**Institucional cívico.** Azul-marinho e branco, alto contraste, registro de órgão
público / imprensa. Descartadas: uma versão clara e acolhedora em terracota (perde
autoridade) e uma versão escura com acento neon (lê como "coisa de técnico" e afasta
a vítima leiga).

A paleta marrom do print é abandonada por inteiro, e a fonte Quicksand — arredondada e
informal — dá lugar à Inter, mais neutra. Ambas as trocas foram aprovadas explicitamente.

## Layout

Duas colunas no desktop:

- **Esquerda (painel navy)**: escudo + "Sentinela Digital" no topo; frase forte
  ("Sua denúncia não se perde no vazio."); parágrafo curto explicando o que a plataforma
  faz com o relato; dois chips ("Denúncias públicas", "Relatórios abertos") no rodapé.
- **Direita (formulário)**: título "Entrar", subtítulo "Acesse sua conta para denunciar e
  acompanhar.", campos E-mail e Senha com rótulo visível, botão primário "Entrar", e a
  linha "Ainda não tem conta? Criar uma conta" apontando para `/cadastro`.

No celular vira coluna única: o painel colapsa em faixa de topo com marca + frase, e o
formulário ocupa a largura restante. O breakpoint é 768px, o mesmo já usado na página.

O painel explica o produto porque quem chega por link compartilhado não sabe o que é
"Sentinela Digital" — e essa é exatamente a decisão de confiar ou não.

## Decisões de acessibilidade

Não são preferências estéticas; cada uma responde a um traço do público:

- **Rótulos visíveis** acima dos campos. Placeholder some ao digitar, some para leitor de
  tela e some para quem preenche devagar.
- **Contraste**: texto `#10202E` sobre branco (~15:1), branco sobre `#0F2A47` (~13:1).
  O marrom-sobre-marrom do print ficava perto do mínimo da WCAG AA.
- **Alvos de 44–48px** e fonte de 16px nos campos, que evita o zoom automático do iOS.
- **Foco visível** em todos os controles: borda azul + anel de 3px.

## Tokens

| Token | Valor | Uso |
|---|---|---|
| `background` | `#F4F7FA` | fundo da coluna do formulário |
| `surface` | `#FFFFFF` | campos e superfícies |
| `primary` | `#0F2A47` | painel de marca e botão primário |
| `primaryHover` | `#173D63` | hover do botão primário |
| `accent` | `#1B6FB5` | links e anel de foco |
| `accentSoft` | `#4FA3E3` | escudo sobre o navy |
| `border` | `#C7D4E0` | bordas de campo |
| `text` | `#10202E` | texto sobre superfície clara |
| `textOnPrimary` | `#EAF1F8` | texto sobre o navy |
| `textMuted` | `#5B7288` | textos de apoio |
| `danger` | `#B3261E` | erros (reservado) |

Os nomes existentes (`background`, `surface`, `primary`, `primaryHover`, `border`, `text`,
`textMuted`, `danger`) são mantidos — muda só o valor. Duas mudanças de chave:
`surfaceAlt` deixa de existir (os campos passam a usar `surface`), e `textOnSurface` vira
`textOnPrimary`, com o sentido invertido: agora o fundo escuro é a exceção, não a regra.

Fonte: Inter (400/500/600/700), via Google Fonts. Escala `xs → xxl` e pesos nomeados,
como já existe hoje. `radii` e `spacing(n)` permanecem.

## Estrutura de código

`AuthLayout` como componente que recebe `children` — não como rota aninhada. É explícito,
não mexe na configuração de rotas e mantém cada página legível isoladamente. Se as telas
de autenticação crescerem, a migração para rota de layout com `<Outlet/>` é direta.

```
src/layouts/AuthLayout/{index.tsx,styles.ts}   novo — painel de marca + slot do formulário
src/pages/Login/{index.tsx,styles.ts}          passa a conter só o formulário
src/components/Input/{index.tsx,styles.ts}     rótulo visível
src/components/Button/{index.tsx,styles.ts}    só cores e altura, via tema
src/components/ShieldIcon/index.tsx            inalterado
src/styles/theme.ts                            paleta e tipografia novas
src/styles/typography.ts                       recalibrado; VisuallyHidden removido
index.html                                     Quicksand → Inter
```

Como quase todas as chaves do tema são preservadas, o ajuste nos componentes existentes se
limita às duas trocas listadas na seção de tokens.

**`Input`**: a API pública não muda — continua `label: string` mais as props nativas de
`<input>`. O que muda é o render: o rótulo vira visível e é ligado ao campo por
`<label htmlFor>` com `id` de `useId()`, respeitando um `id` passado por prop.
`VisuallyHidden` fica sem uso e é removido de `typography.ts` em vez de virar código morto.

**`Button`**: mantém a prop `text`, por requisito da equipe.

## Fora de escopo

- Qualquer chamada de API, formulário controlado ou validação. Não há backend definido;
  inventar estados de erro agora é adivinhar o contrato.
- Ações secundárias no login: "esqueci minha senha", "ver denúncias sem entrar" e
  "denunciar anonimamente" foram consideradas e descartadas. A tela fica com entrar e
  criar conta.
- As outras quatro telas (cadastro, denúncias, criar denúncia, detalhes). O `AuthLayout`
  nasce pensando no cadastro, mas o cadastro não será implementado aqui.

## Verificação

O projeto não tem infra de teste automatizado (sem vitest ou testing-library), e montá-la
está fora do escopo deste redesign. A verificação é:

1. `npx tsc -b` sem erros.
2. `npm run lint` sem erros.
3. Screenshots do headless Chrome em 1280px e 360px, comparados com o mockup aprovado em
   `.superpowers/brainstorm/265401-1785962887/content/login-alta-fidelidade.html`.

Lembrete de ambiente: todo comando npm precisa de Node 22 (`nvm use 22.21.1`); o Node
padrão da máquina é 20.10 e quebra o Vite 8.
