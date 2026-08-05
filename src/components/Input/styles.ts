import styled from 'styled-components'
import { fieldBase } from '../../styles/field'

export const Field = styled.input`
  ${fieldBase}
  height: 48px;
  padding: 0 ${({ theme }) => theme.spacing(3)};
`
