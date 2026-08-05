import { useParams } from 'react-router-dom'
import StatusBadge from '../../components/StatusBadge'
import AppLayout from '../../layouts/AppLayout'
import { PageHeader } from '../../layouts/AppLayout/styles'
import { denunciasMock } from '../../mocks/denuncias'
import { paths } from '../../routes/paths'
import { Subtitle, Title } from '../../styles/typography'
import {
  BackLink,
  Card,
  ContentLink,
  Detail,
  EmptyState,
  Facts,
  Paragraph,
  Section,
  SectionTitle,
  Term,
  TitleGroup,
} from './styles'

function DetalhesDaDenuncia() {
  const { id } = useParams()
  const denuncia = denunciasMock.find((item) => item.id === id)

  if (!denuncia) {
    return (
      <AppLayout>
        <BackLink to={paths.denuncias}>← Voltar para denúncias</BackLink>

        <PageHeader>
          <Title>Denúncia não encontrada</Title>
        </PageHeader>

        <EmptyState>
          <Paragraph>
            Não existe denúncia com o protocolo #{id}. Confira o número ou volte para a
            lista.
          </Paragraph>
          <BackLink to={paths.denuncias}>Ver todas as denúncias</BackLink>
        </EmptyState>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <BackLink to={paths.denuncias}>← Voltar para denúncias</BackLink>

      <PageHeader>
        <TitleGroup>
          <Title>{denuncia.titulo}</Title>
          <Subtitle>
            Protocolo #{denuncia.id} · registrada em {denuncia.data}
          </Subtitle>
        </TitleGroup>
        <StatusBadge status={denuncia.status} />
      </PageHeader>

      <Card>
        <Facts>
          <div>
            <Term>Categoria</Term>
            <Detail>{denuncia.categoria}</Detail>
          </div>
          <div>
            <Term>Plataforma</Term>
            <Detail>{denuncia.rede}</Detail>
          </div>
          <div>
            <Term>Denunciante</Term>
            <Detail>{denuncia.autor}</Detail>
          </div>
        </Facts>

        <Section>
          <SectionTitle>Descrição</SectionTitle>
          <Paragraph>{denuncia.descricao}</Paragraph>
        </Section>

        <Section>
          <SectionTitle>Link do conteúdo</SectionTitle>
          {/* noreferrer: o destino é um conteúdo denunciado, não deve receber a origem */}
          <ContentLink href={denuncia.link} target="_blank" rel="noreferrer noopener">
            {denuncia.link}
          </ContentLink>
        </Section>
      </Card>
    </AppLayout>
  )
}

export default DetalhesDaDenuncia
