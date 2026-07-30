import { useState, type SubmitEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAppDispatch } from '../../app/hooks'
import { login } from '../../features/auth/authSlice'
import * as F from '../../styles/form'
import * as S from '../../styles/authCard'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // Stub: substituir por createAsyncThunk quando a API existir.
  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    dispatch(login({ id: '1', nome: email.split('@')[0] || 'Usuário', email }))

    const from = (location.state as { from?: string } | null)?.from
    navigate(from ?? '/reclamacoes', { replace: true })
  }

  return (
    <S.Wrapper>
      <S.Card>
        <S.Title>Entrar</S.Title>

        <F.Form onSubmit={handleSubmit}>
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

          <F.SubmitButton type="submit">Entrar</F.SubmitButton>
        </F.Form>

        <S.Footer>
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </S.Footer>
      </S.Card>
    </S.Wrapper>
  )
}
