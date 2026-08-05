import styled from 'styled-components'
import type { StatusDenuncia } from '../../types/denuncia'

export const Badge = styled.span<{ $status: StatusDenuncia }>`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2.5)};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-weight: ${({ theme }) => theme.fonts.weights.semiBold};
  background: ${({ theme, $status }) => theme.colors.status[$status].background};
  color: ${({ theme, $status }) => theme.colors.status[$status].text};
`
