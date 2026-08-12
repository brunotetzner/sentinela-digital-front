import { useCallback, useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { listarDenuncias } from '../../actions/denuncia'
import { useAuth } from '../../auth/useAuth'
import Button from '../../components/Button'
import DenunciaCard from '../../components/DenunciaCard'
import Select from '../../components/Select'
import { STATUS_DA_DENUNCIA } from '../../constants/denuncias'
import { useCatalogos } from '../../hooks/useCatalogos'
import AppLayout from '../../layouts/AppLayout'
import { PageHeader } from '../../layouts/AppLayout/styles'
import { ApiError } from '../../services/ApiError'
import { Subtitle, Title } from '../../styles/typography'
import type { Denuncia, StatusDenuncia } from '../../types/denuncia'
import { Filters, List, LoadMore, Notice } from './styles'

type Filtros = {
  rede_social_id: string
  status: string
}

const SEM_FILTRO: Filtros = { rede_social_id: '', status: '' }

function mensagemDeErro(erro: unknown): string {
  if (erro instanceof ApiError && erro.ehFalhaDeRede) {
    return 'Não foi possível falar com o servidor. Verifique sua conexão e tente de novo.'
  }

  return 'Não foi possível carregar as denúncias agora. Tente de novo em instantes.'
}

function Denuncias() {
  const { obterIdToken } = useAuth()
  const { redesSociais, nomeDaCategoria, nomeDaRede } = useCatalogos()

  const [filtros, setFiltros] = useState<Filtros>(SEM_FILTRO)
  const [denuncias, setDenuncias] = useState<Denuncia[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [carregandoMais, setCarregandoMais] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  // Filtro vazio significa "todos" e não pode ir na URL — o backend validaria `''` contra o
  // enum e devolveria 422.
  const comoConsulta = useCallback(
    () => ({
      rede_social_id: filtros.rede_social_id || undefined,
      status: (filtros.status || undefined) as StatusDenuncia | undefined,
    }),
    [filtros],
  )

  // Primeira página, e recarga sempre que os filtros mudam. O cursor pertence a uma combinação
  // de filtros: trocar de filtro obriga a recomeçar do zero.
  useEffect(() => {
    let cancelado = false

    async function buscar() {
      const token = await obterIdToken()

      // Sessão encerrada durante a navegação: o provider já limpou tudo e a rota protegida
      // manda para o login no próximo render. Aqui basta não seguir.
      if (!token) return

      try {
        const pagina = await listarDenuncias(token, comoConsulta())

        if (cancelado) return

        setDenuncias(pagina.data)
        setCursor(pagina.proximo_cursor)
        setErro(null)
      } catch (falha) {
        if (!cancelado) setErro(mensagemDeErro(falha))
      } finally {
        if (!cancelado) setCarregando(false)
      }
    }

    buscar()

    return () => {
      cancelado = true
    }
  }, [comoConsulta, obterIdToken])

  function aoFiltrar(campo: keyof Filtros) {
    return (event: ChangeEvent<HTMLSelectElement>) => {
      // `carregando` é ligado aqui, no manipulador, e não dentro do efeito: setState síncrono
      // em efeito provoca renderização em cascata.
      setCarregando(true)
      setFiltros((atual) => ({ ...atual, [campo]: event.target.value }))
    }
  }

  async function carregarMais() {
    if (!cursor || carregandoMais) return

    setCarregandoMais(true)

    try {
      const token = await obterIdToken()

      if (!token) return

      const pagina = await listarDenuncias(token, { ...comoConsulta(), cursor })

      setDenuncias((atuais) => [...atuais, ...pagina.data])
      setCursor(pagina.proximo_cursor)
      setErro(null)
    } catch (falha) {
      setErro(mensagemDeErro(falha))
    } finally {
      setCarregandoMais(false)
    }
  }

  const total = denuncias.length
  const contagem = cursor ? `${total}+ registros` : `${total} ${total === 1 ? 'registro' : 'registros'}`

  return (
    <AppLayout>
      <PageHeader>
        <Title>Denúncias</Title>
        <Subtitle>{carregando ? 'Carregando…' : contagem}</Subtitle>
      </PageHeader>

      <Filters>
        <Select
          label="Rede social"
          placeholder="Todas as redes"
          placeholderSelecionavel
          options={redesSociais}
          value={filtros.rede_social_id}
          onChange={aoFiltrar('rede_social_id')}
        />
        <Select
          label="Situação"
          placeholder="Todas as situações"
          placeholderSelecionavel
          options={STATUS_DA_DENUNCIA}
          value={filtros.status}
          onChange={aoFiltrar('status')}
        />
      </Filters>

      {carregando && <Notice>Carregando denúncias…</Notice>}

      {!carregando && erro && <Notice $tipo="erro">{erro}</Notice>}

      {!carregando && !erro && total === 0 && (
        <Notice>
          {filtros.rede_social_id || filtros.status
            ? 'Nenhuma denúncia encontrada com esses filtros.'
            : 'Nenhuma denúncia registrada ainda.'}
        </Notice>
      )}

      {!carregando && total > 0 && (
        <>
          <List>
            {denuncias.map((denuncia) => (
              <li key={denuncia.id}>
                <DenunciaCard
                  denuncia={denuncia}
                  categoriaNome={nomeDaCategoria(denuncia.categoria_id)}
                  redeNome={nomeDaRede(denuncia.rede_social_id)}
                />
              </li>
            ))}
          </List>

          {cursor && (
            <LoadMore>
              <Button
                type="button"
                text={carregandoMais ? 'Carregando…' : 'Carregar mais'}
                onClick={carregarMais}
                disabled={carregandoMais}
              />
            </LoadMore>
          )}

          {erro && <Notice $tipo="erro">{erro}</Notice>}
        </>
      )}
    </AppLayout>
  )
}

export default Denuncias
