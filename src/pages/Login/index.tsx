import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import Button from '../../components/Button'
import Input from '../../components/Input'
import AuthLayout from '../../layouts/AuthLayout'
import {
  FormAlert,
  FormFields,
  FormFooter,
  FormFooterLink,
  FormHeader,
} from '../../layouts/AuthLayout/styles'
import { paths } from '../../routes/paths'
import { ApiError } from '../../services/ApiError'
import { Subtitle, Title } from '../../styles/typography'

/**
 * Recado ou origem deixados por outra tela ao redirecionar para cá: `aviso` vem do cadastro,
 * `de` vem da rota protegida que barrou a pessoa.
 */
type EstadoDaNavegacao = { aviso?: string; de?: string } | null

type Erros = { email?: string; senha?: string }

function Login() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { entrar } = useAuth()

  const { aviso, de } = (state as EstadoDaNavegacao) ?? {}

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erros, setErros] = useState<Erros>({})
  const [erroGeral, setErroGeral] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  function aoDigitar(definir: (valor: string) => void, campo: keyof Erros) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      definir(event.target.value)
      setErros((atual) => (atual[campo] ? { ...atual, [campo]: undefined } : atual))
    }
  }

  function tratarFalha(erro: unknown) {
    if (!(erro instanceof ApiError)) {
      setErroGeral('Algo deu errado ao entrar. Tente de novo.')
      return
    }

    if (erro.status === 401 && erro.codigo === 'credenciais_invalidas') {
      // O backend não diz se foi a conta ou a senha, de propósito — não vazamos isso aqui.
      setErroGeral('E-mail ou senha incorretos.')
      return
    }

    setErroGeral(
      erro.ehFalhaDeRede
        ? 'Não foi possível falar com o servidor. Verifique sua conexão e tente de novo.'
        : 'Não foi possível entrar agora. Tente de novo em instantes.',
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setErroGeral(null)

    // A validação aqui é só de campo vazio: qualquer regra a mais viraria uma dica de
    // formato para quem tenta adivinhar credenciais.
    const locais: Erros = {}

    if (!email.trim()) locais.email = 'Informe seu e-mail'
    if (!senha) locais.senha = 'Informe sua senha'

    setErros(locais)

    if (Object.keys(locais).length > 0) return

    setEnviando(true)

    try {
      await entrar(email.trim(), senha)

      navigate(de ?? paths.denuncias, { replace: true })
    } catch (erro) {
      tratarFalha(erro)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <AuthLayout
      headline="Sua denúncia não se perde no vazio."
      description="Registre conteúdo nocivo que você encontrou nas redes. Cada relato vira dado público e entra nos relatórios que cobram resposta das plataformas."
    >
      <FormHeader>
        <Title>Entrar</Title>
        <Subtitle>Acesse sua conta para denunciar e acompanhar.</Subtitle>
      </FormHeader>

      {aviso && !erroGeral && (
        <FormAlert $tipo="sucesso" role="status">
          {aviso}
        </FormAlert>
      )}

      {erroGeral && (
        <FormAlert $tipo="erro" role="alert">
          {erroGeral}
        </FormAlert>
      )}

      <FormFields onSubmit={handleSubmit} noValidate>
        <Input
          label="E-mail"
          type="email"
          name="email"
          placeholder="voce@email.com"
          autoComplete="email"
          value={email}
          onChange={aoDigitar(setEmail, 'email')}
          error={erros.email}
          disabled={enviando}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Sua senha"
          autoComplete="current-password"
          value={senha}
          onChange={aoDigitar(setSenha, 'senha')}
          error={erros.senha}
          disabled={enviando}
        />
        <Button type="submit" text={enviando ? 'Entrando…' : 'Entrar'} disabled={enviando} />
      </FormFields>

      <FormFooter>
        Ainda não tem conta?{' '}
        <FormFooterLink to={paths.cadastro}>Criar uma conta</FormFooterLink>
      </FormFooter>
    </AuthLayout>
  )
}

export default Login
