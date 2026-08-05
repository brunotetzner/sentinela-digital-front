import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import Denuncias from '../pages/Denuncias'
import CriarDenuncia from '../pages/CriarDenuncia'
import DetalhesDaDenuncia from '../pages/DetalhesDaDenuncia'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/denuncias" element={<Denuncias />} />
        <Route path="/denuncias/criar" element={<CriarDenuncia />} />
        <Route path="/denuncias/:id" element={<DetalhesDaDenuncia />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
