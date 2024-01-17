// TODO: Librerías externas
import { Routes, Route } from 'react-router-dom'
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

export function App () {
  return (
    <Routes>

      <Route path="/login" element={<LoginForm />} />

      <Route path="/home" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path='stock/*'>

        <Route path="movimientos/*" element={<Layout />}>
          <Route index element={<VerMovimientos />} />
          <Route path="detalle/:id" element={<MovimientoDetalle />} />
        </Route>

        <Route path='bodegas/*' element={<Layout />}>
          <Route index element={<Bodegas />} />
          <Route path="detalle/:id" element={<DetalleBodega />} />
          <Route path="crearBodegas" element={<CreatedBodega />} />
          <Route path='crearMovimientos' element={<CrearMovimiento />} />
        </Route>

        <Route path='items/*' element={<Layout />}>
          <Route index element={<Items />} />
          <Route path="crearItems" element={<CreatedItems />} />
          <Route path="asignarItems" element={<AsignarItemBodega />} />
        </Route>

        <Route path='simcards/*' element={<Layout />}>
          <Route index element={<VerSimcards />} />
          <Route path="crearSimcards" element={<CrearSimcard />} />
          <Route path="asignarSimcards" element={<AsignarSimcards />} />
          <Route path="movimientosSimcards" element={<Movimientos />} />
        </Route>

      </Route>

      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  )
}
