import { useParams } from 'react-router'
import * as S from './styles'

export default function DetalhesDeReclamacao() {
  const { id } = useParams<{ id: string }>()

  return (
    <>
      <S.BackLink to="/reclamacoes">← Voltar para reclamações</S.BackLink>
      <S.Title>Reclamação #{id}</S.Title>
      <S.Card>Detalhes da reclamação virão da API.</S.Card>
    </>
  )
}
