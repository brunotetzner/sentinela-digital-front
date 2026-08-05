import { useEffect, useState } from 'react'
import ShieldIcon from '../ShieldIcon'
import { paths } from '../../routes/paths'
import { CloseIcon, MenuIcon } from './icons'
import {
  Brand,
  BrandName,
  CloseButton,
  Drawer,
  DrawerHeader,
  Links,
  MenuButton,
  NavItem,
  Overlay,
  SignOut,
  TopBar,
  TopBarBrand,
} from './styles'

const DRAWER_ID = 'menu-lateral'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  function close() {
    setIsOpen(false)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <TopBar>
        <MenuButton
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={isOpen}
          aria-controls={DRAWER_ID}
        >
          <MenuIcon />
        </MenuButton>
        <TopBarBrand>Sentinela Digital</TopBarBrand>
      </TopBar>

      <Overlay $isOpen={isOpen} onClick={close} />

      <Drawer id={DRAWER_ID} $isOpen={isOpen} aria-label="Menu principal">
        <DrawerHeader>
          <Brand>
            <ShieldIcon />
            <BrandName>Sentinela Digital</BrandName>
          </Brand>
          <CloseButton type="button" onClick={close} aria-label="Fechar menu">
            <CloseIcon />
          </CloseButton>
        </DrawerHeader>

        {/* Navegar fecha a gaveta; sem isso ela cobre a página recém-aberta no celular */}
        <Links>
          <li>
            {/* `end`: sem isso a lista fica ativa também em /denuncias/criar e /denuncias/:id */}
            <NavItem to={paths.denuncias} end onClick={close}>
              Denúncias
            </NavItem>
          </li>
          <li>
            <NavItem to={paths.criarDenuncia} onClick={close}>
              Criar denúncia
            </NavItem>
          </li>
        </Links>

        <SignOut to={paths.login} onClick={close}>
          Sair
        </SignOut>
      </Drawer>
    </>
  )
}

export default Sidebar
