import type { ReactNode } from 'react'
import Sidebar from '../../components/Sidebar'
import { Container, Content } from './styles'

type AppLayoutProps = {
  children: ReactNode
}

/** Moldura das telas internas: menu lateral fixo no desktop, gaveta no tablet e celular */
function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Sidebar />
      <Content>
        <Container>{children}</Container>
      </Content>
    </>
  )
}

export default AppLayout
