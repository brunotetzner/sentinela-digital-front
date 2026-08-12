/**
 * Aceita apenas http e https.
 *
 * O `z.url()` do backend valida pelo construtor `URL`, que aprova `javascript:alert(1)` — e o
 * link da denúncia é renderizado como `href` na tela de detalhes. Barrar no envio não fecha o
 * buraco (quem posta direto na API passa), então a tela de detalhes checa de novo antes de
 * transformar o valor em link clicável.
 */
export function linkSeguro(valor: string): boolean {
  try {
    const { protocol } = new URL(valor)

    return protocol === 'http:' || protocol === 'https:'
  } catch {
    return false
  }
}
