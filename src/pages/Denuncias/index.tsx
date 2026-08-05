import DenunciaCard from '../../components/DenunciaCard'
import AppLayout from '../../layouts/AppLayout'
import { Subtitle, Title } from '../../styles/typography'
import { denunciasMock } from './mock'
import { Header, List } from './styles'

function Denuncias() {
  const denuncias = denunciasMock

  return (
    <AppLayout>
      <Header>
        <Title>Denúncias</Title>
        <Subtitle>
          {denuncias.length} {denuncias.length === 1 ? 'registro' : 'registros'}
        </Subtitle>
      </Header>

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
