import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

/** Abaixo disso o menu vira gaveta: tablet em retrato já fica apertado com 240px fixos */
export const DRAWER_BREAKPOINT = '1024px'
export const SIDEBAR_WIDTH = '240px'
export const TOPBAR_HEIGHT = '56px'

export const TopBar = styled.header`
  display: none;

  @media (max-width: ${DRAWER_BREAKPOINT}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
    height: ${TOPBAR_HEIGHT};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(3)};
    padding: 0 ${({ theme }) => theme.spacing(4)};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textOnPrimary};
  }
`

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-left: -${({ theme }) => theme.spacing(2)};
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accentSoft};
    outline-offset: -3px;
  }
`

export const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: ${DRAWER_BREAKPOINT}) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    z-index: 25;
    background: rgba(4, 16, 28, 0.55);
  }
`

export const Drawer = styled.nav<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 30;
  width: ${SIDEBAR_WIDTH};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(10)};
  padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(5)};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  overflow-y: auto;

  @media (max-width: ${DRAWER_BREAKPOINT}) {
    width: 264px;
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
    transition: transform 0.25s ease;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const DrawerHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  color: ${({ theme }) => theme.colors.accentSoft};

  svg {
    width: 56px;
    height: 56px;
  }
`

export const BrandName = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  text-align: center;
`

export const TopBarBrand = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`

export const CloseButton = styled(MenuButton)`
  display: none;

  @media (max-width: ${DRAWER_BREAKPOINT}) {
    display: flex;
    margin: -${({ theme }) => theme.spacing(2)} -${({ theme }) => theme.spacing(2)} 0 0;
  }
`

export const Links = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  list-style: none;
  flex: 1;
`

/** Aparência compartilhada pelos itens do menu, sejam links ou ações */
const navItemBase = css`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.semiBold};
  color: ${({ theme }) => theme.colors.textOnPrimary};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accentSoft};
    outline-offset: 2px;
  }
`

export const NavItem = styled(NavLink)`
  ${navItemBase}

  &.active {
    background: ${({ theme }) => theme.colors.primaryHover};
    color: ${({ theme }) => theme.colors.accentSoft};
  }
`

/**
 * Sair encerra a sessão, então é um botão e não um link: um link só mudaria de endereço,
 * deixando o token guardado e a pessoa ainda autenticada.
 */
export const SignOut = styled.button`
  ${navItemBase}
  background: none;
  border: none;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.accentSoft};
`

/** E-mail de quem está logado, acima do Sair */
export const AccountEmail = styled.p`
  padding: 0 ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  color: ${({ theme }) => theme.colors.accentSoft};
  overflow-wrap: anywhere;
`
