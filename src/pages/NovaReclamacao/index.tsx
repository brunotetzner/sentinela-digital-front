import { useState, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router'
import * as F from '../../styles/form'
import * as S from './styles'

export default function NovaReclamacao() {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const navigate = useNavigate()

  // Placeholder: enviar para a API quando ela existir.
  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    navigate('/reclamacoes')
  }

  return (
    <>
      <S.Title>Nova reclamação</S.Title>

      <S.Card>
        <F.Form onSubmit={handleSubmit}>
          <F.Field>
            Título
            <F.Input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </F.Field>

          <F.Field>
            Descrição
            <F.TextArea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </F.Field>

          <F.SubmitButton type="submit">Enviar reclamação</F.SubmitButton>
        </F.Form>
      </S.Card>
    </>
  )
}
