import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`

export const SignUpText = styled.p`
  margin-top: ${({ theme }) => theme.spacing(5)};
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

export const SignUpLink = styled(Link)`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: ${({ theme }) => theme.fonts.weights.semiBold};
  text-decoration: underline;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radii.sm};
  }
`
