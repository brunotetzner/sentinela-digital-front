import styled from 'styled-components'
import { fieldBase } from '../../styles/field'

export const Control = styled.div`
  position: relative;
  width: 100%;
`

export const Field = styled.select`
  ${fieldBase}
  height: 48px;
  /* Espaço à direita para a seta desenhada por cima */
  padding: 0 ${({ theme }) => theme.spacing(10)} 0 ${({ theme }) => theme.spacing(3)};
  appearance: none;
  cursor: pointer;
`

export const Chevron = styled.span`
  position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.spacing(3)};
  transform: translateY(-50%);
  display: flex;
  color: ${({ theme }) => theme.colors.textMuted};
  pointer-events: none;
`
