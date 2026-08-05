import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Page = styled.main`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(6)};
`

export const Content = styled.div`
  width: 100%;
  max-width: 960px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(16)};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 400px;
    gap: ${({ theme }) => theme.spacing(12)};
  }
`

export const Brand = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  text-align: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(12)};
`

export const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
`

export const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(5)};
`

export const SignUpLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`
