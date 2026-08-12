import { NOME_DO_STATUS } from '../../constants/denuncias'
import type { StatusDenuncia } from '../../types/denuncia'
import { Badge } from './styles'

type StatusBadgeProps = {
  status: StatusDenuncia
}

function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge $status={status}>{NOME_DO_STATUS[status]}</Badge>
}

export default StatusBadge
