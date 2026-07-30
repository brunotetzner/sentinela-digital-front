import { useState, type SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAppDispatch } from '../../app/hooks'
import { login } from '../../features/auth/authSlice'
import * as F from '../../styles/form'
import * as S from '../../styles/authCard'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Stub: substituir por createAsyncThunk quando a API existir.
  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    dispatch(login({ id: '1', nome, email }))
    navigate('/reclamacoes', { replace: true })
  }

  return (
    <S.Wrapper>
      <S.Card>
        <S.Title>Criar conta</S.Title>

        <F.Form onSubmit={handleSubmit}>
          <F.Field>
            Nome
            <F.Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </F.Field>

          <F.Field>
            E-mail
            <F.Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </F.Field>

          <F.Field>
            Senha
            <F.Input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </F.Field>

          <F.SubmitButton type="submit">Cadastrar</F.SubmitButton>
        </F.Form>

        <S.Footer>
          Já tem conta? <Link to="/login">Entrar</Link>
        </S.Footer>
      </S.Card>
    </S.Wrapper>
  )
}
