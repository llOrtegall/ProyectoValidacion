// TODO: Librerías externas
import axios from 'axios'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

// TODO: Componentes de diseño
import { Layout } from './components/Layout.jsx'

// TODO: Páginas
import { Home } from './pages/Home.jsx'
import { Items } from './pages/Items/Items.jsx'
import { CreatedItems } from './pages/Items/CreatedItems.jsx'
import { AsignarItemBodega } from './pages/Items/AsignarItemBodega.jsx'

import { DetalleBodega } from './pages/Bodegas/DetallesBodegas.jsx'
import { CreatedBodega } from './pages/Bodegas/CreatedBodega.jsx'
import { Bodegas } from './pages/Bodegas/Bodegas.jsx'

import { CrearMovimiento } from './pages/Movimientos/CrearMovimiento.jsx'
import { VerMovimientos } from './pages/Movimientos/VerMovimientos.jsx'
import { MovimientoDetalle } from './pages/Movimientos/MovimientoDetalle.jsx'

import { CrearSimcard } from './pages/Simcards/CrearSimcard.jsx'
import { VerSimcards } from './pages/Simcards/VerSimcards.jsx'
import { AsignarSimcards } from './pages/Simcards/AsignarSimcards.jsx'
import { Movimientos } from './pages/Simcards/Movimientos.jsx'

import { getCookie } from './utils/funtions.js'
import { useAuth } from './Auth/AuthContext.jsx'
import { useEffect } from 'react'
import { LoginForm } from './pages/Login/LoginForm.jsx'

axios.defaults.headers.common.Authorization = `Bearer ${getCookie('bodega')}`

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  console.log(user.rol)
  if (user.rol === 'Analista Desarrollo') {
    return children
  } else {
    return <Navigate to='/' />
  }
}

export function App () {
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const getLoggedIn = async () => {
      try {
        const token = getCookie('bodega')
        const response = await axios.get('http://172.20.1.160:3000/profile', {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
        const usuario = await response.data
        login(usuario.auth, usuario.user)
        navigate('/')
      } catch (error) {
        console.log(error)
        navigate('/login')
      }
    }
    getLoggedIn()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/created-items" element={<CreatedItems />} />
        <Route path="/created-bodega" element={<ProtectedRoute> <CreatedBodega /> </ProtectedRoute>} />
        <Route path='/asignarItemBodega' element={<AsignarItemBodega />} />
        <Route path='/bodegas' element={<Bodegas />} />
        <Route path='/crearMovimiento' element={<CrearMovimiento />} />
        <Route path='/verMovimientos' element={<VerMovimientos />} />
        <Route path="/movimiento/:id" element={<MovimientoDetalle />} />
        <Route path='/createSimcard' element={<CrearSimcard />} />
        <Route path='/verSimcards' element={<VerSimcards />} />
        <Route path='/addSimcards' element={<AsignarSimcards />} />
        <Route path='/DetalleBodega/:id' element={<DetalleBodega />} />
        <Route path='/movimientosSimcards' element={<Movimientos />} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}
