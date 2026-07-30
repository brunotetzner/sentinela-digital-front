import { createBrowserRouter, Navigate } from 'react-router'
import AppLayout from '../layouts/AppLayout'
import ProtectedRoute from './ProtectedRoute'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import Reclamacoes from '../pages/Reclamacoes'
import NovaReclamacao from '../pages/NovaReclamacao'
import DetalhesDeReclamacao from '../pages/DetalhesDeReclamacao'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/reclamacoes" replace /> },
  { path: '/login', element: <Login /> },
  { path: '/cadastro', element: <Cadastro /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/reclamacoes', element: <Reclamacoes /> },
          { path: '/reclamacoes/nova', element: <NovaReclamacao /> },
          { path: '/reclamacoes/:id', element: <DetalhesDeReclamacao /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/reclamacoes" replace /> },
])
