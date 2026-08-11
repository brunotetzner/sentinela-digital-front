import styled, { css } from 'styled-components'

/** Moldura comum de todo campo de formulário: rótulo visível acima do controle */
export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
  width: 100%;
`

export const FieldLabel = styled.label`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.semiBold};
  color: ${({ theme }) => theme.colors.text};
`

/** Aparência compartilhada por input, textarea e select */
export const fieldBase = css`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.text};
  /* 16px: abaixo disso o Safari do iOS dá zoom ao focar o campo */
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accent}2E;
  }
`

/** Sobrepõe a borda do `fieldBase` quando o campo está inválido. Aplicar depois dele. */
export const fieldInvalido = css`
  border-color: ${({ theme }) => theme.colors.danger};

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.danger};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.danger}2E;
  }
`

/** Texto de apoio abaixo do campo: regras de preenchimento, exemplos */
export const FieldHint = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
`

/**
 * Mensagem de erro do campo.
 *
 * A cor sozinha não comunica o erro para quem não distingue vermelho — quem lê com leitor de
 * tela recebe pelo `aria-describedby`, e a borda muda junto para quem enxerga.
 */
export const FieldError = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: ${({ theme }) => theme.colors.danger};
  line-height: 1.4;
`
