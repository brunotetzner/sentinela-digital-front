import * as S from './styles'

// Placeholder até a API existir.
const reclamacoes = [
  { id: '1', titulo: 'Buraco na via', status: 'Aberta' },
  { id: '2', titulo: 'Iluminação pública apagada', status: 'Em análise' },
  { id: '3', titulo: 'Coleta de lixo irregular', status: 'Resolvida' },
]

export default function Reclamacoes() {
  return (
    <>
      <S.Header>
        <S.Title>Reclamações</S.Title>
        <S.NewButton to="/reclamacoes/nova">Nova reclamação</S.NewButton>
      </S.Header>

      <S.List>
        {reclamacoes.map((reclamacao) => (
          <li key={reclamacao.id}>
            <S.Item to={`/reclamacoes/${reclamacao.id}`}>
              <S.ItemTitle>{reclamacao.titulo}</S.ItemTitle>
              <S.ItemMeta>{reclamacao.status}</S.ItemMeta>
            </S.Item>
          </li>
        ))}
      </S.List>
    </>
  )
}
