import styled from 'styled-components'
import { NavLink } from 'react-router'

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(6)};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(8)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`

export const Brand = styled.strong`
  font-size: 18px;
`

export const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
`

export const NavItem = styled(NavLink)`
  color: ${({ theme }) => theme.colors.muted};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius};

  &.active {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.primary};
  }
`

export const Spacer = styled.div`
  flex: 1;
`

export const UserName = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
`

export const LogoutButton = styled.button`
  cursor: pointer;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(3)};

  &:hover {
    border-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.danger};
  }
`

export const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(8)};
`
