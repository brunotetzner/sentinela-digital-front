import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { cadastrarUsuario } from '../../actions/usuario'
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
import {
  errosDoBackend,
  FORMULARIO_VAZIO,
  paraEnvio,
  REGRAS_USERNAME,
  validarCadastro,
} from './validacao'
import type { CampoCadastro, ErrosCadastro } from './validacao'

function Cadastro() {
  const navigate = useNavigate()

  const [formulario, setFormulario] = useState(FORMULARIO_VAZIO)
  const [erros, setErros] = useState<ErrosCadastro>({})
  const [erroGeral, setErroGeral] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  function aoDigitar(campo: CampoCadastro) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target

      setFormulario((atual) => ({ ...atual, [campo]: value }))

      // O erro some assim que a pessoa mexe no campo — insistir no aviso enquanto ela corrige
      // é ruído. A validação volta a rodar no envio.
      setErros((atual) => (atual[campo] ? { ...atual, [campo]: undefined } : atual))
    }
  }

  function tratarFalha(erro: unknown) {
    if (!(erro instanceof ApiError)) {
      setErroGeral('Algo deu errado ao criar sua conta. Tente de novo.')
      return
    }

    if (erro.status === 409 && erro.codigo === 'email_em_uso') {
      setErros({ email: 'Este e-mail já está cadastrado' })
      return
    }

    if (erro.status === 409 && erro.codigo === 'username_em_uso') {
      setErros({ username: 'Este nome de usuário já está em uso' })
      return
    }

    if (erro.status === 422) {
      const doBackend = errosDoBackend(erro.errosPorCampo)

      if (Object.keys(doBackend).length > 0) {
        setErros(doBackend)
        return
      }
    }

    setErroGeral(
      erro.ehFalhaDeRede
        ? 'Não foi possível falar com o servidor. Verifique sua conexão e tente de novo.'
        : 'Não foi possível criar sua conta agora. Tente de novo em instantes.',
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setErroGeral(null)

    const errosLocais = validarCadastro(formulario)

    setErros(errosLocais)

    if (Object.keys(errosLocais).length > 0) return

    setEnviando(true)

    try {
      await cadastrarUsuario(paraEnvio(formulario))

      // O cadastro não devolve sessão — quem autentica é o login.
      navigate(paths.login, {
        replace: true,
        state: { aviso: 'Conta criada. Entre para continuar.' },
      })
    } catch (erro) {
      tratarFalha(erro)
    } finally {
      setEnviando(false)
    }
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

      {erroGeral && (
        <FormAlert $tipo="erro" role="alert">
          {erroGeral}
        </FormAlert>
      )}

      {/* noValidate: a validação é nossa, em português e por campo — a nativa do navegador
          interromperia o envio com um balão próprio antes de chegarmos aqui. */}
      <FormFields onSubmit={handleSubmit} noValidate>
        <Input
          label="Nome"
          type="text"
          name="name"
          placeholder="Como quer ser chamado"
          autoComplete="name"
          value={formulario.nome}
          onChange={aoDigitar('nome')}
          error={erros.nome}
          disabled={enviando}
        />
        <Input
          label="Nome de usuário"
          type="text"
          name="username"
          placeholder="maria_silva"
          autoComplete="username"
          hint={REGRAS_USERNAME}
          value={formulario.username}
          onChange={aoDigitar('username')}
          error={erros.username}
          disabled={enviando}
        />
        <Input
          label="E-mail"
          type="email"
          name="email"
          placeholder="voce@email.com"
          autoComplete="email"
          value={formulario.email}
          onChange={aoDigitar('email')}
          error={erros.email}
          disabled={enviando}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Crie uma senha"
          autoComplete="new-password"
          value={formulario.senha}
          onChange={aoDigitar('senha')}
          error={erros.senha}
          disabled={enviando}
        />
        <Input
          label="Confirmar senha"
          type="password"
          name="passwordConfirmation"
          placeholder="Repita a senha"
          autoComplete="new-password"
          value={formulario.confirmacao}
          onChange={aoDigitar('confirmacao')}
          error={erros.confirmacao}
          disabled={enviando}
        />
        <Button
          type="submit"
          text={enviando ? 'Criando conta…' : 'Criar conta'}
          disabled={enviando}
        />
      </FormFields>

      <FormFooter>
        Já tem conta? <FormFooterLink to={paths.login}>Entrar</FormFooterLink>
      </FormFooter>
    </AuthLayout>
  )
}

export default Cadastro
