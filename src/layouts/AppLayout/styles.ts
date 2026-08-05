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
