import { useLocation, useParams } from 'react-router-dom'
import StatusBadge from '../../components/StatusBadge'
import { useCatalogos } from '../../hooks/useCatalogos'
import AppLayout from '../../layouts/AppLayout'
import { PageHeader } from '../../layouts/AppLayout/styles'
import { paths } from '../../routes/paths'
import { Subtitle, Title } from '../../styles/typography'
import type { Denuncia } from '../../types/denuncia'
import { formatarData } from '../../utils/data'
import { linkSeguro } from '../../utils/link'
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

/** A denúncia chega pelo `state` do card, porque a API não tem `GET /denuncia/:id`. */
type EstadoDaNavegacao = { denuncia?: Denuncia } | null

function DetalhesDaDenuncia() {
  const { id } = useParams()
  const { state } = useLocation()
  const { nomeDaCategoria, nomeDaRede } = useCatalogos()

  const denuncia = (state as EstadoDaNavegacao)?.denuncia

  if (!denuncia) {
    return (
      <AppLayout>
        <BackLink to={paths.denuncias}>← Voltar para denúncias</BackLink>

        <PageHeader>
          <Title>Denúncia não encontrada</Title>
        </PageHeader>

        <EmptyState>
          <Paragraph>
            Não foi possível abrir a denúncia #{id} por este endereço. Abra-a pela lista de
            denúncias.
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
            Protocolo #{denuncia.id} · registrada em {formatarData(denuncia.criado_em)}
          </Subtitle>
        </TitleGroup>
        <StatusBadge status={denuncia.status} />
      </PageHeader>

      <Card>
        <Facts>
          <div>
            <Term>Categoria</Term>
            <Detail>{nomeDaCategoria(denuncia.categoria_id)}</Detail>
          </div>
          <div>
            <Term>Plataforma</Term>
            <Detail>{nomeDaRede(denuncia.rede_social_id)}</Detail>
          </div>
          {denuncia.autor && (
            <div>
              <Term>Denunciante</Term>
              <Detail>{denuncia.autor.nome}</Detail>
            </div>
          )}
        </Facts>

        <Section>
          <SectionTitle>Descrição</SectionTitle>
          <Paragraph>{denuncia.descricao}</Paragraph>
        </Section>

        <Section>
          <SectionTitle>Link do conteúdo</SectionTitle>
          {/* O `z.url()` do backend aceita `javascript:` e afins. Só viram link de verdade os
              endereços http/https; o resto aparece como texto, sem virar vetor de execução. */}
          {linkSeguro(denuncia.link) ? (
            // noreferrer: o destino é um conteúdo denunciado, não deve receber a origem
            <ContentLink href={denuncia.link} target="_blank" rel="noreferrer noopener">
              {denuncia.link}
            </ContentLink>
          ) : (
            <Paragraph>{denuncia.link}</Paragraph>
          )}
        </Section>
      </Card>
    </AppLayout>
  )
}

export default DetalhesDaDenuncia
