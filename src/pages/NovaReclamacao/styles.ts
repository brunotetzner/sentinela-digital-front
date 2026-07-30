import styled from 'styled-components'

export const Title = styled.h1`
  font-size: 28px;
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`

export const Card = styled.section`
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
`
