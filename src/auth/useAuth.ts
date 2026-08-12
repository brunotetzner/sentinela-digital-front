import { useContext } from 'react'
import { AuthContext } from './AuthContext'
import type { ContextoDeAutenticacao } from './AuthContext'

export function useAuth(): ContextoDeAutenticacao {
  const contexto = useContext(AuthContext)

  if (!contexto) throw new Error('useAuth precisa estar dentro de <AuthProvider>')

  return contexto
}
