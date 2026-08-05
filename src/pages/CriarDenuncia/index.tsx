import type { FormEvent } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'
import TextArea from '../../components/TextArea'
import { CATEGORIAS, PLATAFORMAS } from '../../constants/denuncias'
import AppLayout from '../../layouts/AppLayout'
import { PageHeader } from '../../layouts/AppLayout/styles'
import { Subtitle, Title } from '../../styles/typography'
import { Actions, Form } from './styles'

function CriarDenuncia() {
  // Layout apenas — o envio da denúncia ainda não está integrado.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <AppLayout>
      <PageHeader>
        <Title>Nova denúncia</Title>
        <Subtitle>Quanto mais detalhes, maior a chance de a plataforma agir.</Subtitle>
      </PageHeader>

      <Form onSubmit={handleSubmit}>
        <Input
          label="Título da denúncia"
          name="titulo"
          placeholder="Resuma o caso em uma frase"
        />

        <TextArea
          label="Descrição"
          name="descricao"
          placeholder="Conte o que aconteceu: o que você viu, quando, e o que já tentou fazer."
        />

        <Select
          label="Categoria"
          name="categoria"
          placeholder="Selecione a categoria"
          options={CATEGORIAS}
        />

        <Select
          label="Plataforma onde o conteúdo foi encontrado"
          name="plataforma"
          placeholder="Selecione a plataforma"
          options={PLATAFORMAS}
        />

        <Input
          label="Link do conteúdo"
          type="url"
          name="link"
          placeholder="https://"
          inputMode="url"
        />

        <Actions>
          <Button type="submit" text="Criar denúncia" />
        </Actions>
      </Form>
    </AppLayout>
  )
}

export default CriarDenuncia
