/** A API manda epoch em milissegundos; a tela mostra dd/mm/aaaa. */
const formatador = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

export function formatarData(epochEmMilissegundos: number): string {
  return formatador.format(new Date(epochEmMilissegundos))
}
