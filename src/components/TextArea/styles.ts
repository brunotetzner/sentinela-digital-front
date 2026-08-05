import styled from 'styled-components'
import { fieldBase } from '../../styles/field'

export const Field = styled.textarea`
  ${fieldBase}
  min-height: 148px;
  padding: ${({ theme }) => theme.spacing(3)};
  line-height: 1.5;
  /* Só na vertical: alargar quebraria a coluna do formulário */
  resize: vertical;
`
