import { Outlet, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logout } from '../features/auth/authSlice'
import * as S from './styles'

export default function AppLayout() {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function handleLogout() {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <>
      <S.Header>
        <S.Brand>Sentinela Digital</S.Brand>
        <S.Nav>
          <S.NavItem to="/reclamacoes" end>
            Reclamações
          </S.NavItem>
          <S.NavItem to="/reclamacoes/nova">Nova reclamação</S.NavItem>
        </S.Nav>
        <S.Spacer />
        {user && <S.UserName>{user.nome}</S.UserName>}
        <S.LogoutButton type="button" onClick={handleLogout}>
          Sair
        </S.LogoutButton>
      </S.Header>

      <S.Main>
        <Outlet />
      </S.Main>
    </>
  )
}
