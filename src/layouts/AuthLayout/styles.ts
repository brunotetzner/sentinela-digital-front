import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

/** De que lado da tela o formulário fica no desktop */
export type FormSide = 'left' | 'right'

type SideProps = { $formSide: FormSide }

export const Page = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const BrandPanel = styled.aside<SideProps>`
  order: ${({ $formSide }) => ($formSide === 'left' ? 2 : 1)};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  padding: ${({ theme }) => theme.spacing(12)} ${({ theme }) => theme.spacing(10)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(10)};
  /* O conteúdo encosta na borda externa da tela, do lado em que o painel está */
  align-items: ${({ $formSide }) => ($formSide === 'left' ? 'flex-end' : 'stretch')};
  text-align: ${({ $formSide }) => ($formSide === 'left' ? 'right' : 'left')};

  @media (max-width: 768px) {
    /* Em coluna única a marca vem sempre primeiro, dos dois lados do layout */
    order: 1;
    align-items: stretch;
    text-align: left;
    padding: ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(5)};
    gap: ${({ theme }) => theme.spacing(3)};
  }
`

export const BrandMark = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.accentSoft};

  /* O tamanho do escudo é decisão de layout, não do ícone */
  svg {
    width: 44px;
    height: 44px;
  }

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing(2)};

    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const BrandName = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.textOnPrimary};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.sizes.md};
  }
`

export const Headline = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.xxl};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  line-height: 1.2;
  letter-spacing: -0.5px;
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.sizes.lg};
    margin-bottom: 0;
  }
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  line-height: 1.6;
  max-width: 38ch;
  color: ${({ theme }) => theme.colors.accentSoft};

  @media (max-width: 768px) {
    display: none;
  }
`

export const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
  list-style: none;

  /* Perdem a função no celular, onde competem com o formulário pela dobra */
  @media (max-width: 768px) {
    display: none;
  }
`

export const Tag = styled.li`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: ${({ theme }) => theme.colors.accentSoft};
  background: ${({ theme }) => theme.colors.primaryHover};
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.pill};
`

export const FormArea = styled.main<SideProps>`
  order: ${({ $formSide }) => ($formSide === 'left' ? 1 : 2)};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(6)};

  @media (max-width: 768px) {
    order: 2;
  }
`

export const FormSlot = styled.div`
  width: 100%;
  max-width: 360px;
`

/* --- Peças compartilhadas pelos formulários de autenticação --- */

export const FormHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`

export const FormFields = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`

/**
 * Recado sobre o formulário inteiro: falha que não pertence a nenhum campo, ou confirmação
 * vinda de outra tela. Fica acima dos campos para ser lido antes de recomeçar o
 * preenchimento.
 */
export const FormAlert = styled.p<{ $tipo: 'erro' | 'sucesso' }>`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1.5px solid;
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  line-height: 1.5;

  ${({ theme, $tipo }) =>
    $tipo === 'erro'
      ? css`
          border-color: ${theme.colors.danger};
          background: ${theme.colors.danger}0F;
          color: ${theme.colors.danger};
        `
      : css`
          border-color: ${theme.colors.success};
          background: ${theme.colors.successSoft};
          color: ${theme.colors.success};
        `}
`

export const FormFooter = styled.p`
  margin-top: ${({ theme }) => theme.spacing(5)};
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

export const FormFooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: ${({ theme }) => theme.fonts.weights.semiBold};
  text-decoration: underline;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radii.sm};
  }
`
