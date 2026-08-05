import { paths } from '../../routes/paths'
import type { Denuncia } from '../../types/denuncia'
import StatusBadge from '../StatusBadge'
import {
  Aside,
  Author,
  Body,
  Card,
  Category,
  DateLabel,
  Description,
  Meta,
  Network,
  Protocol,
} from './styles'

type DenunciaCardProps = {
  denuncia: Denuncia
}

function DenunciaCard({ denuncia }: DenunciaCardProps) {
  return (
    <Card to={paths.detalhesDaDenuncia(denuncia.id)}>
      <Meta>
        <Protocol>#{denuncia.id}</Protocol>
        <DateLabel>{denuncia.data}</DateLabel>
      </Meta>

      <Body>
        <Category>{denuncia.categoria}</Category>
        <Author>{denuncia.autor}</Author>
        <Description>{denuncia.descricao}</Description>
      </Body>

      <Aside>
        <Network>{denuncia.rede}</Network>
        <StatusBadge status={denuncia.status} />
      </Aside>
    </Card>
  )
}

export default DenunciaCard
