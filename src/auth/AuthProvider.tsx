import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { entrar as entrarNaApi } from '../actions/usuario'
import { ApiError } from '../services/ApiError'
import { AuthContext } from './AuthContext'
import { lerClaims, renovarIdToken, trocarCustomToken } from './identityToolkit'
import { limparSessao, lerSessao, salvarSessao } from './sessao'
import type { Sessao } from './sessao'

/** Renova com um minuto de folga: um token que expira no meio do voo vira 401 na cara da pessoa. */
const MARGEM_DE_RENOVACAO = 60_000

type Estado = {
  sessao: Sessao | null
  /**
   * Sessão guardada cujo ID token já venceu, esperando renovação. Guardá-la aqui evita reler
   * o storage dentro do efeito e deixa o refresh token à mão de quem vai usá-lo.
   */
  aRenovar: Sessao | null
}

/**
 * Lê o storage na primeira renderização.
 *
 * Isto é leitura síncrona de um valor que já existe, não sincronização com sistema externo —
 * fazer num efeito só provocaria uma renderização extra e um piscar de tela deslogada.
 */
function estadoInicial(): Estado {
  const guardada = lerSessao()

  if (!guardada) return { sessao: null, aRenovar: null }

  return guardada.expiraEm > Date.now() + MARGEM_DE_RENOVACAO
    ? { sessao: guardada, aRenovar: null }
    : { sessao: null, aRenovar: guardada }
}

type AuthProviderProps = {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [estado, setEstado] = useState<Estado>(estadoInicial)

  // `obterIdToken` é chamada de dentro de fluxos assíncronos, onde o valor capturado pelo
  // closure já pode estar velho. A ref é a fonte da verdade; o state existe para renderizar.
  const sessaoRef = useRef<Sessao | null>(estado.sessao)

  const aplicar = useCallback((nova: Sessao | null) => {
    sessaoRef.current = nova
    setEstado({ sessao: nova, aRenovar: null })

    if (nova) salvarSessao(nova)
    else limparSessao()
  }, [])

  // O ID token vencido é trocado por um novo sem pedir a senha. Se o refresh token também
  // morreu, a sessão acabou e a pessoa volta para o login.
  useEffect(() => {
    const expirada = estado.aRenovar

    if (!expirada) return

    let cancelado = false

    renovarIdToken(expirada.refreshToken)
      .then((tokens) => {
        if (!cancelado) aplicar({ ...expirada, ...tokens })
      })
      .catch(() => {
        if (!cancelado) aplicar(null)
      })

    return () => {
      cancelado = true
    }
  }, [estado.aRenovar, aplicar])

  const entrar = useCallback(
    async (email: string, senha: string) => {
      // O backend devolve um custom token; quem transforma em ID token é o Google.
      const { token } = await entrarNaApi({ email, senha })
      const tokens = await trocarCustomToken(token)
      const claims = lerClaims(tokens.idToken)

      if (!claims) throw new ApiError(0, null, {}, 'Token de autenticação ilegível')

      aplicar({ ...tokens, ...claims })
    },
    [aplicar],
  )

  const sair = useCallback(() => aplicar(null), [aplicar])

  const obterIdToken = useCallback(async () => {
    const atual = sessaoRef.current

    if (!atual) return null

    if (atual.expiraEm > Date.now() + MARGEM_DE_RENOVACAO) return atual.idToken

    try {
      const tokens = await renovarIdToken(atual.refreshToken)

      aplicar({ ...atual, ...tokens })

      return tokens.idToken
    } catch {
      // Refresh token revogado ou expirado: a sessão acabou de verdade.
      aplicar(null)

      return null
    }
  }, [aplicar])

  const valor = useMemo(
    () => ({
      sessao: estado.sessao,
      restaurando: estado.aRenovar !== null,
      entrar,
      sair,
      obterIdToken,
    }),
    [estado.sessao, estado.aRenovar, entrar, sair, obterIdToken],
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export default AuthProvider
