import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { paths } from '../routes/paths'
import { useAuth } from './useAuth'

/**
 * Guarda das telas internas. Sem sessão, manda para o login e guarda de onde veio, para
 * devolver a pessoa ao lugar certo depois de entrar.
 *
 * Isto é conveniência de navegação, não segurança: o que protege os dados é o backend exigir
 * o ID token em toda rota de denúncia.
 */
function RotaProtegida() {
  const { sessao, restaurando } = useAuth()
  const location = useLocation()

  // Enquanto a sessão guardada está sendo restaurada ainda não se sabe se há login. Redirecionar
  // aqui expulsaria quem só recarregou a página.
  if (restaurando) return null

  if (!sessao) {
    return <Navigate to={paths.login} replace state={{ de: location.pathname }} />
  }

  return <Outlet />
}

export default RotaProtegida
