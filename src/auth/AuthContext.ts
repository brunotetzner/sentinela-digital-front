import { createContext } from 'react'
import type { Sessao } from './sessao'

export type ContextoDeAutenticacao = {
  /** `null` quando ninguém está autenticado. */
  sessao: Sessao | null
  /** `true` enquanto a sessão guardada está sendo restaurada, no primeiro render. */
  restaurando: boolean
  /** Autentica e guarda a sessão. Lança `ApiError` em falha. */
  entrar: (email: string, senha: string) => Promise<void>
  sair: () => void
  /**
   * ID token válido para mandar ao backend, renovado se estiver perto de expirar.
   * `null` se não há sessão ou se a renovação falhou — nesse caso a sessão já foi encerrada.
   */
  obterIdToken: () => Promise<string | null>
}

export const AuthContext = createContext<ContextoDeAutenticacao | null>(null)
