import styled from 'styled-components'

export const Page = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const BrandPanel = styled.aside`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  padding: ${({ theme }) => theme.spacing(12)} ${({ theme }) => theme.spacing(10)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(10)};

  @media (max-width: 768px) {
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

export const FormArea = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(6)};
`

export const FormSlot = styled.div`
  width: 100%;
  max-width: 360px;
`
