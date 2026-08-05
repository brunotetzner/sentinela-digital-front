import styled from 'styled-components'

/** Título de tela — ex.: "Entrar" */
export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.4px;
`

/** Linha de apoio logo abaixo do título */
export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  color: ${({ theme }) => theme.colors.textMuted};
`

/** Corpo de texto padrão */
export const Text = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  color: ${({ theme }) => theme.colors.text};
`

/** Texto pequeno de apoio */
export const Caption = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
`
