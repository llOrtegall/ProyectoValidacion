import { Routes, Route, useNavigate } from 'react-router-dom'

// TODO: Páginas
import { MovimientoDetalle } from './pages/Movimientos/MovimientoDetalle.jsx'
import { CrearMovimiento } from './pages/Movimientos/CrearMovimiento.jsx'
import { AsignarItemBodega } from './pages/Items/AsignarItemBodega.jsx'
import { VerMovimientos } from './pages/Movimientos/VerMovimientos.jsx'
import { AsignarSimcards } from './pages/Simcards/AsignarSimcards.jsx'
import { DetalleBodega } from './pages/Bodegas/DetallesBodegas.jsx'
import { CreatedBodega } from './pages/Bodegas/CreatedBodega.jsx'
import { CrearSimcard } from './pages/Simcards/CrearSimcard.jsx'
import { CreaMovimientosSim } from './pages/Simcards/Movimientos.jsx'
import { VerSimcards } from './pages/Simcards/VerSimcards.jsx'
import { CreatedItems } from './pages/Items/CreatedItems.jsx'
import { LoginForm } from './pages/Login/LoginForm.jsx'
import { VerBodegas } from './pages/Bodegas/Bodegas.jsx'
import { Items } from './pages/Items/Items.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { Home } from './pages/Home.jsx'

// TODO: Componentes y/o Utilidades
import { ProtectdeRoutes } from './components/ProtectedRoutes.jsx'
import { GetUserCookie, getCookie } from './utils/funtions.js'
import { useAuth } from './Auth/AuthContext.jsx'
import { useEffect } from 'react'
import axios from 'axios'

axios.defaults.baseURL = 'http://172.20.1.70:3000/'
// axios.defaults.baseURL = 'http://localhost:3000/'

const CrearAsignarItems = ['Analista Desarrollo', 'Jefe Tecnología', 'Director Tecnología', 'Auxiliar Administrativa', 'Administrador']
const CrearBodegayMovimientos = ['Analista Desarrollo', 'Jefe Tecnología', 'Director Tecnología', 'Coordinador Soporte', 'Auxiliar Administrativa', 'Administrador']
const CrearMoverAsignSimcards = ['Analista Desarrollo', 'Jefe Tecnología', 'Director Tecnología', 'Coordinador Soporte']

export function App () {
  const { login, logout, loggedIn, user, defineCompany, company } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const token = getCookie('bodega')
    if (token) {
      GetUserCookie(token).then(user => {
        login(user)
        navigate('/bodega/home')
      }).catch(() => {
        logout()
      })
    } else {
      logout()
    }
  }, [])

  return (
    <Routes>

      <Route path='/bodega/login' element={<LoginForm />} />

      <Route path='/bodega/*' element={<ProtectdeRoutes rol={user.rol} isAllowed={!!loggedIn} user={user} />} >
        <Route path='home' element={<Home fun={defineCompany} company={company}/>} />
        <Route path='stock/items' element={<Items fun={logout} user={user} company={company}/>} />
        <Route path='stock/movimientos' element={<VerMovimientos fun={logout} company={company}/>} />
        <Route path='stock/movimientos/detalle/:id' element={<MovimientoDetalle fun={logout} user={user} company={company}/>} />
        <Route path='stock/bodegas' element={<VerBodegas fun={logout} company={company}/>} />
        <Route path='stock/bodegas/detalle/:id' element={<DetalleBodega fun={logout} user={user} company={company}/>} />
        <Route path='stock/simcards' element={<VerSimcards fun={logout} company={company}/>} />
      </Route>

      <Route path='/bodega/*' element={<ProtectdeRoutes rol={user.rol} isAllowed={!!loggedIn && CrearAsignarItems.includes(user.rol)} redirectTo='/bodega/home' />} >
          <Route path='stock/items/crearItems' element={<CreatedItems fun={logout} user={user} company={company}/>} />
          <Route path='stock/items/asignarItems' element={<AsignarItemBodega fun={logout} user={user} company={company}/>} />
        </Route>

        <Route path='/bodega/*' element={<ProtectdeRoutes rol={user.rol} isAllowed={!!loggedIn && CrearBodegayMovimientos.includes(user.rol)} redirectTo='/bodega/home' />} >
          <Route path='stock/bodegas/crearBodegas' element={<CreatedBodega fun={logout} user={user} company={company}/>} />
          <Route path='stock/bodegas/crearMovimientos' element={<CrearMovimiento fun={logout} user={user} company={company}/>} />
        </Route>

        <Route path='/bodega/*' element={<ProtectdeRoutes rol={user.rol} isAllowed={!!loggedIn && CrearMoverAsignSimcards.includes(user.rol)} redirectTo='/bodega/home' />} >
          <Route path='stock/simcards/crearSimcards' element={<CrearSimcard fun={logout} user={user} company={company}/>} />
          <Route path='stock/simcards/asignarSimcards' element={<AsignarSimcards fun={logout} user={user} company={company}/>} />
          <Route path='stock/simcards/movimientosSimcards' element={<CreaMovimientosSim fun={logout} user={user} company={company}/>} />
        </Route>

      <Route path='*' element={<NotFound />} />

    </Routes>
  )
}
