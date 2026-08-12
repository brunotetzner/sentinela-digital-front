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

/** Falha que não pertence a nenhum campo, acima do formulário */
export const FormAlert = styled.p`
  max-width: 560px;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(3)};
  border: 1.5px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.danger}0F;
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  line-height: 1.5;
`
