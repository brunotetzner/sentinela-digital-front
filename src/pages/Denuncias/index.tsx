import DenunciaCard from '../../components/DenunciaCard'
import AppLayout from '../../layouts/AppLayout'
import { PageHeader } from '../../layouts/AppLayout/styles'
import { denunciasMock } from '../../mocks/denuncias'
import { Subtitle, Title } from '../../styles/typography'
import { List } from './styles'

function Denuncias() {
  const denuncias = denunciasMock

  return (
    <AppLayout>
      <PageHeader>
        <Title>Denúncias</Title>
        <Subtitle>
          {denuncias.length} {denuncias.length === 1 ? 'registro' : 'registros'}
        </Subtitle>
      </PageHeader>

      <List>
        {denuncias.map((denuncia) => (
          <li key={denuncia.id}>
            <DenunciaCard denuncia={denuncia} />
          </li>
        ))}
      </List>
    </AppLayout>
  )
}

export default Denuncias
