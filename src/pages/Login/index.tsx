import type { FormEvent } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import AuthLayout from '../../layouts/AuthLayout'
import { paths } from '../../routes/paths'
import { Subtitle, Title } from '../../styles/typography'
import { Form, Header, SignUpLink, SignUpText } from './styles'

function Login() {
  // Layout apenas — a autenticação ainda não está integrada.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <AuthLayout
      headline="Sua denúncia não se perde no vazio."
      description="Registre conteúdo nocivo que você encontrou nas redes. Cada relato vira dado público e entra nos relatórios que cobram resposta das plataformas."
    >
      <Header>
        <Title>Entrar</Title>
        <Subtitle>Acesse sua conta para denunciar e acompanhar.</Subtitle>
      </Header>

      <Form onSubmit={handleSubmit}>
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
      </Form>

      <SignUpText>
        Ainda não tem conta? <SignUpLink to={paths.cadastro}>Criar uma conta</SignUpLink>
      </SignUpText>
    </AuthLayout>
  )
}

export default Login
