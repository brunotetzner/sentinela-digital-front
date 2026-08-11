import type { FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
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
import { Subtitle, Title } from '../../styles/typography'

/** Recado deixado por outra tela ao redirecionar para cá — hoje só o cadastro usa. */
type EstadoDaNavegacao = { aviso?: string } | null

function Login() {
  const { state } = useLocation()
  const aviso = (state as EstadoDaNavegacao)?.aviso

  // Layout apenas — a autenticação ainda não está integrada.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
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

      {aviso && (
        <FormAlert $tipo="sucesso" role="status">
          {aviso}
        </FormAlert>
      )}

      <FormFields onSubmit={handleSubmit}>
        <Input
          label="E-mail"
          type="email"
          name="email"
          placeholder="voce@email.com"
          autoComplete="email"
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Sua senha"
          autoComplete="current-password"
        />
        <Button type="submit" text="Entrar" />
      </FormFields>

      <FormFooter>
        Ainda não tem conta?{' '}
        <FormFooterLink to={paths.cadastro}>Criar uma conta</FormFooterLink>
      </FormFooter>
    </AuthLayout>
  )
}

export default Login
