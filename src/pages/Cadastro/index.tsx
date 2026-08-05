import type { FormEvent } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import AuthLayout from '../../layouts/AuthLayout'
import {
  FormFields,
  FormFooter,
  FormFooterLink,
  FormHeader,
} from '../../layouts/AuthLayout/styles'
import { paths } from '../../routes/paths'
import { Subtitle, Title } from '../../styles/typography'

function Cadastro() {
  // Layout apenas — o cadastro ainda não está integrado.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <AuthLayout
      formSide="left"
      headline="Sua voz entra para o registro público."
      description="Com uma conta você registra denúncias, acompanha o que acontece com cada uma e ajuda a formar os relatórios que cobram resposta das plataformas."
    >
      <FormHeader>
        <Title>Criar conta</Title>
        <Subtitle>Leva menos de um minuto.</Subtitle>
      </FormHeader>

      <FormFields onSubmit={handleSubmit}>
        <Input
          label="Nome"
          type="text"
          name="name"
          placeholder="Como quer ser chamado"
          autoComplete="name"
        />
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
          placeholder="Crie uma senha"
          autoComplete="new-password"
        />
        <Input
          label="Confirmar senha"
          type="password"
          name="passwordConfirmation"
          placeholder="Repita a senha"
          autoComplete="new-password"
        />
        <Button type="submit" text="Criar conta" />
      </FormFields>

      <FormFooter>
        Já tem conta? <FormFooterLink to={paths.login}>Entrar</FormFooterLink>
      </FormFooter>
    </AuthLayout>
  )
}

export default Cadastro
