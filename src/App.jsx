import { Route, Routes } from 'react-router-dom'
import { useAuth } from './Auth/AuthContext.jsx'
import { useEffect } from 'react'

// TODO: Páginas
import { LoginForm } from './pages/Login/LoginForm.jsx'
import { MovimientoDetalle } from './pages/Movimientos/MovimientoDetalle.jsx'
import { CrearMovimiento } from './pages/Movimientos/CrearMovimiento.jsx'
import { VerMovimientos } from './pages/Movimientos/VerMovimientos.jsx'
import { AsignarItemBodega } from './pages/Items/AsignarItemBodega.jsx'
import { AsignarSimcards } from './pages/Simcards/AsignarSimcards.jsx'
import { CreaMovimientosSim } from './pages/Simcards/Movimientos.jsx'
import { DetalleBodega } from './pages/Bodegas/DetallesBodegas.jsx'
import { ProtectdeRoutes } from './components/ProtectedRoutes.jsx'
import { CreatedBodega } from './pages/Bodegas/CreatedBodega.jsx'
import { CrearSimcard } from './pages/Simcards/CrearSimcard.jsx'
import { VerSimcards } from './pages/Simcards/VerSimcards.jsx'
import { CreatedItems } from './pages/Items/CreatedItems.jsx'
import { VerBodegas } from './pages/Bodegas/Bodegas.jsx'
import { NavBar } from './components/NavBar.jsx'
import { Items } from './pages/Items/Items.jsx'
import { Home } from './pages/Home.jsx'

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.withCredentials = true

export function App () {
  const { loggedIn, rol, login, defineCompany, company, logout, user } = useAuth()

  useEffect(() => {
    axios.get('/profile').then(res => {
      if (res.status === 200) {
        login(res.data)
      } else {
        login({ auth: false })
      }
    })
  }, [])

  if (!loggedIn) {
    return <LoginForm />
  }

  return (
    <>
      <NavBar company={company} closeSesion={logout} authorize={rol}/>

      <Routes>
        <Route index element={<Home />} />
        <Route path='/bodega/home' element={<Home company={company} fun={defineCompany} />} />
        <Route path='/bodega/verMovimientos' element={<VerMovimientos company={company} />} />
        <Route path='/bodega/verMovimientos/detalle/:id' element={<MovimientoDetalle company={company} />} />
        <Route path='/bodega/stock/items' element={<Items company={company} rol={rol} />} />
        <Route path='/bodega/stock/bodega' element={<VerBodegas company={company} />} />
        <Route path='/bodega/stock/bodega/detalle/:id' element={<DetalleBodega company={company} />} />
        <Route path='/bodega/stock/verSimcards' element={<VerSimcards company={company} />} />

        <Route path='/bodega/stock/items/*' element={
        <ProtectdeRoutes isAllowed={!!loggedIn && rol.includes('Administrador')}>
          <Routes>
            <Route path='crearItems' element={<CreatedItems company={company} />} />
            <Route path='asignarItems' element={<AsignarItemBodega company={company} />} />
          </Routes>
        </ProtectdeRoutes>} />

        <Route path='/bodega/stock/bodega/*' element={
        <ProtectdeRoutes isAllowed={!!loggedIn && rol.includes('Coordinador Soporte')}>
          <Routes>
            <Route path='crearBodega' element={<CreatedBodega company={company} />} />
            <Route path='crearMovimiento' element={<CrearMovimiento company={company} user={user}/>} />
          </Routes>
        </ProtectdeRoutes>} />

        <Route path='/bodega/stock/simcards/*' element={
        <ProtectdeRoutes isAllowed={!!loggedIn && rol.includes('Coordinador Soporte')}>
          <Routes>
            <Route path='crearSimcard' element={<CrearSimcard company={company} />} />
            <Route path='asignarSimcards' element={<AsignarSimcards company={company} />} />
            <Route path='crearMovimientoSimcard' element={<CreaMovimientosSim company={company} user={user}/>} />
          </Routes>
        </ProtectdeRoutes>} />

      </Routes>
    </>
  )
}
