import { Route, Routes } from 'react-router-dom'
import { useAuth } from './Auth/AuthContext.jsx'

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
import { NotFound } from './pages/NotFound.jsx'
import { Items } from './pages/Items/Items.jsx'
import { Home } from './pages/Home.jsx'

import axios from 'axios'
import { useEffect } from 'react'
import { getUserByToken } from './services/FetchItemsData.js'

// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = 'http://172.20.1.110:3030/api'

export function App () {
  const { loggedIn, rol, defineCompany, company, user, login } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('Token')
    if (token) {
      getUserByToken(token)
        .then(res => {
          login(true, res)
        })
    } else {
      console.log('No hay token')
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginForm />} />

        <Route path='/bodega/*' element={<ProtectdeRoutes isAllowed={!!user} redirectTo='/' autorize={rol} />}>
          <Route index path='home' element={<Home company={company} fun={defineCompany} />} />
          <Route path='verMovimientos' element={<VerMovimientos company={company} />} />
          <Route path='verMovimientos/detalle/:id' element={<MovimientoDetalle company={company} />} />
          <Route path='stock/items' element={<Items company={company} rol={rol} />} />
          <Route path='stock/bodega' element={<VerBodegas company={company} />} />
          <Route path='stock/bodega/detalle/:id' element={<DetalleBodega company={company} />} />
          <Route path='stock/verSimcards' element={<VerSimcards company={company} />} />
        </Route>

        <Route path='/bodega/stock/items/*' element={
          <ProtectdeRoutes isAllowed={!!loggedIn && (rol.includes('Administrador') || rol.includes('Aux administrativa'))}>
            <Route path='/bodega/stock/items/crearItems' element={<CreatedItems company={company} />} />
            <Route path='/bodega/stock/items/asignarItems' element={<AsignarItemBodega company={company} />} />
          </ProtectdeRoutes>} />

        <Route path='/bodega/stock/bodega/*' element={
          <ProtectdeRoutes isAllowed={!!loggedIn && (rol.includes('Administrador') || rol.includes('Coordinador Soporte') || rol.includes('Aux administrativa'))}>
            <Routes>
              <Route path='crearBodega' element={<CreatedBodega company={company} />} />
              <Route path='crearMovimiento' element={<CrearMovimiento company={company} user={user} />} />
            </Routes>
          </ProtectdeRoutes>} />

        <Route path='/bodega/stock/simcards/*' element={
          <ProtectdeRoutes isAllowed={!!loggedIn && (rol.includes('Administrador') || rol.includes('Coordinador Soporte') || rol.includes('Aux administrativa'))}>
            <Routes>
              <Route path='crearSimcard' element={<CrearSimcard company={company} />} />
              <Route path='asignarSimcards' element={<AsignarSimcards company={company} />} />
              <Route path='crearMovimientoSimcard' element={<CreaMovimientosSim company={company} user={user} />} />
            </Routes>
          </ProtectdeRoutes>} />

        <Route path='*' element={<NotFound />} />

      </Routes>
    </>

  )
}
