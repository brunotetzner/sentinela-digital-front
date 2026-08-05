import styled from 'styled-components'
import { DRAWER_BREAKPOINT, SIDEBAR_WIDTH, TOPBAR_HEIGHT } from '../../components/Sidebar/styles'

export const Content = styled.main`
  min-height: 100%;
  /* A sidebar é fixa; o recuo aqui é o que impede o conteúdo de passar por baixo dela */
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(8)};
  padding-left: calc(${SIDEBAR_WIDTH} + ${({ theme }) => theme.spacing(8)});
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: ${DRAWER_BREAKPOINT}) {
    padding: ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(5)};
    padding-top: calc(${TOPBAR_HEIGHT} + ${({ theme }) => theme.spacing(6)});
  }
`

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

/** Cabeçalho padrão das telas internas: título à esquerda, apoio à direita, régua embaixo */
export const PageHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`
