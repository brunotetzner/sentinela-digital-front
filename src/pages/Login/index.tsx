import type { FormEvent } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import ShieldIcon from '../../components/ShieldIcon'
import { paths } from '../../routes/paths'
import { Caption, Subtitle, Title } from '../../styles/typography'
import { Actions, Brand, Card, Content, Form, Page, SignUpLink } from './styles'

function Login() {
  // Layout apenas — a autenticação ainda não está integrada.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <Page>
      <Content>
        <Brand>
          <Title>Login</Title>
          <ShieldIcon />
          <Subtitle>Sentinela digital</Subtitle>
        </Brand>

        <Form onSubmit={handleSubmit}>
          <Card>
            <Input
              label="E-mail"
              type="email"
              name="email"
              placeholder="E-mail"
              autoComplete="email"
            />
            <Input
              label="Senha"
              type="password"
              name="password"
              placeholder="Senha"
              autoComplete="current-password"
            />
          </Card>

          <Actions>
            <Button type="submit" text="Login" />
            <SignUpLink to={paths.cadastro}>
              <Caption>Fazer cadastro</Caption>
            </SignUpLink>
          </Actions>
        </Form>
      </Content>
    </Page>
  )
}

export default Login
