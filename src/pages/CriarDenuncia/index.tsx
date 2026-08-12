import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { criarDenuncia } from '../../actions/denuncia'
import { useAuth } from '../../auth/useAuth'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'
import TextArea from '../../components/TextArea'
import { useCatalogos } from '../../hooks/useCatalogos'
import AppLayout from '../../layouts/AppLayout'
import { PageHeader } from '../../layouts/AppLayout/styles'
import { paths } from '../../routes/paths'
import { ApiError } from '../../services/ApiError'
import { Subtitle, Title } from '../../styles/typography'
import { Actions, Form, FormAlert } from './styles'
import {
  errosDoBackend,
  FORMULARIO_VAZIO,
  paraEnvio,
  validarDenuncia,
} from './validacao'
import type { CampoDenuncia, ErrosDenuncia } from './validacao'

function CriarDenuncia() {
  const navigate = useNavigate()
  const { obterIdToken } = useAuth()
  const { categorias, redesSociais, carregando: carregandoCatalogos, falhou } = useCatalogos()

  const [formulario, setFormulario] = useState(FORMULARIO_VAZIO)
  const [erros, setErros] = useState<ErrosDenuncia>({})
  const [erroGeral, setErroGeral] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  function aoDigitar(campo: CampoDenuncia) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value } = event.target

      setFormulario((atual) => ({ ...atual, [campo]: value }))
      setErros((atual) => (atual[campo] ? { ...atual, [campo]: undefined } : atual))
    }
  }

  function tratarFalha(erro: unknown) {
    if (erro instanceof ApiError && erro.status === 422) {
      const doBackend = errosDoBackend(erro.errosPorCampo)

      if (Object.keys(doBackend).length > 0) {
        setErros(doBackend)
        return
      }
    }

    setErroGeral(
      erro instanceof ApiError && erro.ehFalhaDeRede
        ? 'Não foi possível falar com o servidor. Verifique sua conexão e tente de novo.'
        : 'Não foi possível registrar a denúncia agora. Tente de novo em instantes.',
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setErroGeral(null)

    const errosLocais = validarDenuncia(formulario)

    setErros(errosLocais)

    if (Object.keys(errosLocais).length > 0) return

    setEnviando(true)

    try {
      const token = await obterIdToken()

      // Sessão encerrada: o provider já limpou tudo e a rota protegida assume daqui.
      if (!token) return

      await criarDenuncia(token, paraEnvio(formulario))

      navigate(paths.denuncias, { replace: true })
    } catch (erro) {
      tratarFalha(erro)
    } finally {
      setEnviando(false)
    }
  }

  const bloqueado = enviando || carregandoCatalogos

  return (
    <AppLayout>
      <PageHeader>
        <Title>Nova denúncia</Title>
        <Subtitle>Quanto mais detalhes, maior a chance de a plataforma agir.</Subtitle>
      </PageHeader>

      {falhou && (
        <FormAlert role="alert">
          Não foi possível carregar as categorias e plataformas. Recarregue a página para tentar
          de novo.
        </FormAlert>
      )}

      {erroGeral && <FormAlert role="alert">{erroGeral}</FormAlert>}

      <Form onSubmit={handleSubmit} noValidate>
        <Input
          label="Título da denúncia"
          name="titulo"
          placeholder="Resuma o caso em uma frase"
          maxLength={120}
          value={formulario.titulo}
          onChange={aoDigitar('titulo')}
          error={erros.titulo}
          disabled={bloqueado}
        />

        <TextArea
          label="Descrição"
          name="descricao"
          placeholder="Conte o que aconteceu: o que você viu, quando, e o que já tentou fazer."
          maxLength={2000}
          value={formulario.descricao}
          onChange={aoDigitar('descricao')}
          error={erros.descricao}
          disabled={bloqueado}
        />

        <Select
          label="Categoria"
          name="categoria_id"
          placeholder={carregandoCatalogos ? 'Carregando…' : 'Selecione a categoria'}
          options={categorias}
          value={formulario.categoria_id}
          onChange={aoDigitar('categoria_id')}
          error={erros.categoria_id}
          disabled={bloqueado}
        />

        <Select
          label="Plataforma onde o conteúdo foi encontrado"
          name="rede_social_id"
          placeholder={carregandoCatalogos ? 'Carregando…' : 'Selecione a plataforma'}
          options={redesSociais}
          value={formulario.rede_social_id}
          onChange={aoDigitar('rede_social_id')}
          error={erros.rede_social_id}
          disabled={bloqueado}
        />

        <Input
          label="Link do conteúdo"
          type="url"
          name="link"
          placeholder="https://"
          inputMode="url"
          value={formulario.link}
          onChange={aoDigitar('link')}
          error={erros.link}
          disabled={bloqueado}
        />

        <Actions>
          <Button
            type="submit"
            text={enviando ? 'Registrando…' : 'Criar denúncia'}
            disabled={bloqueado}
          />
        </Actions>
      </Form>
    </AppLayout>
  )
}

export default CriarDenuncia
