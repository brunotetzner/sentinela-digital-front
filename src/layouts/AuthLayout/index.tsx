import type { ReactNode } from 'react'
import ShieldIcon from '../../components/ShieldIcon'
import {
  BrandMark,
  BrandName,
  BrandPanel,
  Description,
  FormArea,
  FormSlot,
  Headline,
  Page,
  Tag,
  Tags,
} from './styles'
import type { FormSide } from './styles'

type AuthLayoutProps = {
  /** Chamada principal do painel de marca */
  headline: string
  /** Parágrafo que explica a plataforma para quem chega sem contexto */
  description: string
  /** Lado do formulário no desktop. No celular a marca fica sempre no topo. */
  formSide?: FormSide
  /** Conteúdo da coluna do formulário */
  children: ReactNode
}

function AuthLayout({ headline, description, formSide = 'right', children }: AuthLayoutProps) {
  return (
    <Page>
      <BrandPanel $formSide={formSide}>
        <BrandMark>
          <ShieldIcon />
          <BrandName>Sentinela Digital</BrandName>
        </BrandMark>

        <div>
          <Headline>{headline}</Headline>
          <Description>{description}</Description>
        </div>

        <Tags>
          <Tag>Denúncias públicas</Tag>
          <Tag>Relatórios abertos</Tag>
        </Tags>
      </BrandPanel>

      <FormArea $formSide={formSide}>
        <FormSlot>{children}</FormSlot>
      </FormArea>
    </Page>
  )
}

export default AuthLayout
