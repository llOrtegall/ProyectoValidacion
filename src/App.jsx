import { Route, Routes } from 'react-router-dom'
import { useAuth } from './Auth/AuthContext.jsx'

import { NavBar } from './components/NavBar.jsx'
import { LoginForm } from './pages/Login/LoginForm.jsx'
import { Home } from './pages/Home.jsx'

import { ProtectdeRoutes } from './components/ProtectedRoutes.jsx'

// TODO: Pagina
import { VerMovimientos } from './pages/Movimientos/VerMovimientos.jsx'
import { MovimientoDetalle } from './pages/Movimientos/MovimientoDetalle.jsx'
import { DetalleBodega } from './pages/Bodegas/DetallesBodegas.jsx'
import { VerBodegas } from './pages/Bodegas/Bodegas.jsx'

import { CreatedBodega } from './pages/Bodegas/CreatedBodega.jsx'

import { Items } from './pages/Items/Items.jsx'

import { AsignarItemBodega } from './pages/Items/AsignarItemBodega.jsx'
import { CrearMovimiento } from './pages/Movimientos/CrearMovimiento.jsx'
import { CreatedItems } from './pages/Items/CreatedItems.jsx'

import { VerSimcards } from './pages/Simcards/VerSimcards.jsx'

import axios from 'axios'
import { useEffect } from 'react'

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
      <NavBar company={company} closeSesion={logout} />

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
        <ProtectdeRoutes isAllowed={!!loggedIn && rol.includes('Analista Desarrollo')}>
          <Routes>
            <Route path='crearItems' element={<CreatedItems company={company} />} />
            <Route path='asignarItems' element={<AsignarItemBodega company={company} />} />
          </Routes>
        </ProtectdeRoutes>} />

        <Route path='/bodega/stock/bodega/*' element={
        <ProtectdeRoutes isAllowed={!!loggedIn && rol.includes('Analista Desarrollo')}>
          <Routes>
            <Route path='crearBodega' element={<CreatedBodega company={company} />} />
            <Route path='crearMovimiento' element={<CrearMovimiento company={company} user={user}/>} />
          </Routes>
        </ProtectdeRoutes>} />

      </Routes>
    </>
  )
}
