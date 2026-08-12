import styled from 'styled-components'

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  list-style: none;
`

/** Barra de filtros: dois selects lado a lado, empilhados no celular */
export const Filters = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

/** Recado que ocupa o lugar da lista: carregando, vazio ou erro */
export const Notice = styled.p<{ $tipo?: 'erro' }>`
  padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(4)};
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  line-height: 1.6;
  color: ${({ theme, $tipo }) =>
    $tipo === 'erro' ? theme.colors.danger : theme.colors.textMuted};
`

export const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(6)};

  /* O botão é largura total por padrão; aqui ele é uma ação secundária no fim da lista */
  button {
    width: auto;
    min-width: 200px;
  }
`
