import { paths } from '../../routes/paths'
import type { Denuncia } from '../../types/denuncia'
import { formatarData } from '../../utils/data'
import StatusBadge from '../StatusBadge'
import { Aside, Author, Body, Card, Category, DateLabel, Description, Network } from './styles'

type DenunciaCardProps = {
  denuncia: Denuncia
  /** Nome legível de `categoria_id`, resolvido pela página com o catálogo. */
  categoriaNome: string
  /** Nome legível de `rede_social_id`. */
  redeNome: string
}

function DenunciaCard({ denuncia, categoriaNome, redeNome }: DenunciaCardProps) {
  return (
    // A denúncia viaja no state porque não existe `GET /denuncia/:id`: a tela de detalhes lê
    // daqui. Abrir a URL direto ou recarregar não traz o state e cai no "não encontrada".
    <Card to={paths.detalhesDaDenuncia(denuncia.id)} state={{ denuncia }}>
      <DateLabel>{formatarData(denuncia.criado_em)}</DateLabel>

      <Body>
        <Category>{categoriaNome}</Category>
        {denuncia.autor && <Author>{denuncia.autor.nome}</Author>}
        <Description>{denuncia.descricao}</Description>
      </Body>

      <Aside>
        <Network>{redeNome}</Network>
        <StatusBadge status={denuncia.status} />
      </Aside>
    </Card>
  )
}

export default DenunciaCard
