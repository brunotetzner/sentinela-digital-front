import styled from 'styled-components'
import { Link } from 'react-router'

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`

export const Title = styled.h1`
  font-size: 28px;
`

export const NewButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  font-weight: 600;
`

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`

export const Item = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing(4)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const ItemTitle = styled.h2`
  font-size: 16px;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

export const ItemMeta = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
`
