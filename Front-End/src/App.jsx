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
  if (RolUser !== 'Analista Desarrollo') {
    return <Navigate to='/bodega/home' />
  }
  return children
}

axios.defaults.baseURL = 'http://localhost:3080/'

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

      <Route path="/bodega/home" element={<Layout />}>
        <Route index element={<Home fun={logout}/>} />
      </Route>

      <Route path='/bodega/stock/*'>

        <Route path="movimientos/*" element={<Layout />}>
          <Route index element={<VerMovimientos fun={logout} />} />
          <Route path="detalle/:id" element={<MovimientoDetalle />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path='bodegas/*' element={<Layout />}>
          <Route index element={<Bodegas fun={logout}/>} />
          <Route path="detalle/:id" element={<DetalleBodega />} />
          <Route path="crearBodegas" element={<ProtectedRoute><CreatedBodega /></ProtectedRoute>} />
          <Route path='crearMovimientos' element={<ProtectedRoute><CrearMovimiento fun={logout}/></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path='items/*' element={<Layout />}>
          <Route index element={<Items fun={logout}/>} />
          <Route path="crearItems" element={<ProtectedRoute><CreatedItems /></ProtectedRoute>} />
          <Route path="asignarItems" element={<ProtectedRoute><AsignarItemBodega /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path='simcards/*' element={<Layout />}>
          <Route index element={<VerSimcards fun={logout}/>} />
          <Route path="crearSimcards" element={<ProtectedRoute><CrearSimcard /></ProtectedRoute>} />
          <Route path="asignarSimcards" element={<ProtectedRoute><AsignarSimcards /></ProtectedRoute>} />
          <Route path="movimientosSimcards" element={<ProtectedRoute><Movimientos fun={logout}/></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
