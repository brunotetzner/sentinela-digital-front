import styled from 'styled-components'

export const Wrapper = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing(8)};
`

export const Card = styled.div`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
  padding: ${({ theme }) => theme.spacing(8)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
`

export const Title = styled.h1`
  font-size: 24px;
`

export const Footer = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: underline;
  }
`
