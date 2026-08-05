import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(5)};
  max-width: 560px;
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(4)};
  }
`

export const Actions = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
`
