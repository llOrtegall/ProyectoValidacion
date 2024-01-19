// TODO: Librerías externas
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'

import { MovimientoDetalle } from './pages/Movimientos/MovimientoDetalle.jsx'
import { CrearMovimiento } from './pages/Movimientos/CrearMovimiento.jsx'
import { VerMovimientos } from './pages/Movimientos/VerMovimientos.jsx'
import { AsignarItemBodega } from './pages/Items/AsignarItemBodega.jsx'
import { AsignarSimcards } from './pages/Simcards/AsignarSimcards.jsx'
import { DetalleBodega } from './pages/Bodegas/DetallesBodegas.jsx'
import { CreatedBodega } from './pages/Bodegas/CreatedBodega.jsx'
import { CrearSimcard } from './pages/Simcards/CrearSimcard.jsx'
import { Movimientos } from './pages/Simcards/Movimientos.jsx'
import { VerSimcards } from './pages/Simcards/VerSimcards.jsx'
import { CreatedItems } from './pages/Items/CreatedItems.jsx'
import { LoginForm } from './pages/Login/LoginForm.jsx'
import { Bodegas } from './pages/Bodegas/Bodegas.jsx'
import { Items } from './pages/Items/Items.jsx'
import { Home } from './pages/Home.jsx'

import { getCookie, GetUserCookie } from './utils/funtions.js'
import { useAuth } from './Auth/AuthContext.jsx'
import { useEffect } from 'react'
import { NotFound } from './pages/NotFound.jsx'
import axios from 'axios'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  const RolUser = user.rol
  if (RolUser === 'Analista Desarrollo') {
    return children
  }

  if (RolUser === 'Jefe Tecnología') {
    return children
  }

  if (RolUser === 'Coordinador Soporte') {
    return children
  }

  if (RolUser === 'Director Tecnología') {
    return children
  }

  return <Navigate to='/bodega/home' />
}

axios.defaults.baseURL = 'http://172.20.1.160:3000/'

export function App () {
  const { login, logout } = useAuth()

  useEffect(() => {
    const token = getCookie('bodega')
    if (token) {
      GetUserCookie(token).then(user => {
        login(user)
      }).catch(() => {
        logout()
      })
    } else {
      logout()
    }
  }, [])

  return (
    <Routes>

      <Route path="/bodega/login" element={<LoginForm />} />

      <Route path='/bodega/*' element={<Layout />}>

        <Route path='home' element={<Home fun={logout} />} />
        <Route path='stock/movimientos' element={<VerMovimientos fun={logout} />} />
        <Route path="stock/movimientos/detalle/:id" element={<MovimientoDetalle />} />

        <Route path="stock/bodegas" element={<Bodegas fun={logout} />} />
        <Route path="stock/bodegas/detalle/:id" element={<DetalleBodega />} />
        <Route path="stock/bodegas/crearBodegas" element={<ProtectedRoute><CreatedBodega /></ProtectedRoute>} />
        <Route path='stock/bodegas/crearMovimientos' element={<ProtectedRoute><CrearMovimiento fun={logout} /></ProtectedRoute>} />

        <Route path="stock/items" element={<Items fun={logout} />} />
        <Route path="stock/items/crearItems" element={<ProtectedRoute><CreatedItems /></ProtectedRoute>} />
        <Route path="stock/items/asignarItems" element={<ProtectedRoute><AsignarItemBodega /></ProtectedRoute>} />

        <Route path='stock/simcards' element={<VerSimcards fun={logout} />} />
        <Route path="stock/simcards/crearSimcards" element={<ProtectedRoute><CrearSimcard /></ProtectedRoute>} />
        <Route path="stock/simcards/asignarSimcards" element={<ProtectedRoute><AsignarSimcards /></ProtectedRoute>} />
        <Route path="stock/simcards/movimientosSimcards" element={<ProtectedRoute><Movimientos fun={logout} /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />

      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
