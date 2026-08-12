import styled from 'styled-components'
import { fieldBase, fieldInvalido } from '../../styles/field'

export const Field = styled.textarea<{ $invalido?: boolean }>`
  ${fieldBase}
  min-height: 148px;
  padding: ${({ theme }) => theme.spacing(3)};
  line-height: 1.5;
  /* Só na vertical: alargar quebraria a coluna do formulário */
  resize: vertical;

  ${({ $invalido }) => $invalido && fieldInvalido}
`
