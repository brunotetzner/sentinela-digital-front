import type { StatusDenuncia } from '../../types/denuncia'
import { Badge } from './styles'

const labels: Record<StatusDenuncia, string> = {
  recebida: 'Recebida',
  emAnalise: 'Em análise',
  resolvida: 'Resolvida',
  arquivada: 'Arquivada',
}

type StatusBadgeProps = {
  status: StatusDenuncia
}

function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge $status={status}>{labels[status]}</Badge>
}

export default StatusBadge
