import styled from 'styled-components'
import { fieldBase, fieldInvalido } from '../../styles/field'

export const Field = styled.input<{ $invalido?: boolean }>`
  ${fieldBase}
  height: 48px;
  padding: 0 ${({ theme }) => theme.spacing(3)};

  ${({ $invalido }) => $invalido && fieldInvalido}
`
