import styled from 'styled-components'
import { Link } from 'react-router'

export const BackLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

export const Title = styled.h1`
  font-size: 28px;
  margin: ${({ theme }) => theme.spacing(4)} 0;
`

export const Card = styled.section`
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.muted};
`
