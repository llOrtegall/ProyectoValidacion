import { Route, Routes } from 'react-router-dom'
import { useAuth } from './Auth/AuthContext.jsx'

import { ProtectdeRoutes } from './components/ProtectedRoutes.jsx'

// TODO: Páginas
import { AsignarSimcards, CreaMovimientosSim, CrearSimcard, VerSimcards } from './pages/Simcards'
import { CrearMovimiento, MovimientoDetalle, VerMovimientos } from './pages/Movimientos'
import { CreatedBodega, DetalleBodega, VerBodegas } from './pages/Bodegas'
import { AsignarItemBodega, CreatedItems, Items } from './pages/Items'
import { Home, LoginForm, NotFound } from './pages'

import axios from 'axios'
import { useEffect } from 'react'
import { getUserByToken } from './services/FetchItemsData.js'

// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = 'http://172.20.1.110:3030/api'

export function App () {
  const { rol, company, user, login } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('tokenBodega')
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

        <Route path='/bodega/*' element={<ProtectdeRoutes isAllowed={!!user} redirectTo='/' />}>
          <Route index path='home' element={<Home company={company} />} />
          <Route path='verMovimientos' element={<VerMovimientos company={company} />} />
          <Route path='verMovimientos/detalle/:id' element={<MovimientoDetalle company={company} />} />
          <Route path='stock/items' element={<Items company={company} rol={rol} />} />
          <Route path='stock/bodega' element={<VerBodegas company={company} />} />
          <Route path='stock/bodega/detalle/:id' element={<DetalleBodega company={company} />} />
          <Route path='stock/verSimcards' element={<VerSimcards company={company} />} />
        </Route>

        <Route element={
          <ProtectdeRoutes
            isAllowed={!!user && (rol.includes('Administrador') || rol.includes('Aux administrativa'))}
            redirectTo='/bodega/home' />} >
          <Route path='/bodega/stock/items/crearItems' element={<CreatedItems company={company} />} />
          <Route path='/bodega/stock/items/asignarItems' element={<AsignarItemBodega company={company} />} />
        </Route>

        <Route element={
          <ProtectdeRoutes
            isAllowed={!!user && (rol.includes('Administrador') || rol.includes('Coordinador Soporte') || rol.includes('Aux administrativa'))}
            redirectTo='/bodega/home' />} >
          <Route path='/bodega/stock/bodega/crearBodega' element={<CreatedBodega company={company} />} />
          <Route path='/bodega/stock/bodega/crearMovimiento' element={<CrearMovimiento company={company} user={user} />} />
        </Route>

        <Route element={
          <ProtectdeRoutes
            isAllowed={!!user && (rol.includes('Administrador') || rol.includes('Coordinador Soporte') || rol.includes('Aux administrativa'))}
            redirectTo='/bodega/home' />} >
          <Route path='/bodega/stock/simcards/crearSimcard' element={<CrearSimcard company={company} />} />
          <Route path='/bodega/stock/simcards/asignarSimcards' element={<AsignarSimcards company={company} />} />
          <Route path='/bodega/stock/simcards/crearMovimientoSimcard' element={<CreaMovimientosSim company={company} user={user} />} />
        </Route>

        <Route path='*' element={<NotFound />} />

      </Routes>
    </>

  )
}
