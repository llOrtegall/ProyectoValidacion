// TODO: Librerías externas
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'

// TODO: Componentes de diseño
import { Layout } from './components/Layout.jsx'

// TODO: Páginas
import { Home } from './pages/Home.jsx'
import { Items } from './pages/Items/Items.jsx'
import { CreatedItems } from './pages/Items/CreatedItems.jsx'
import { AsignarItemBodega } from './pages/Items/AsignarItemBodega.jsx'

import { CreatedBodega } from './pages/Bodegas/CreatedBodega.jsx'
import { Bodegas } from './pages/Bodegas/Bodegas.jsx'

import { CrearMovimiento } from './pages/Movimientos/CrearMovimiento.jsx'
import { VerMovimientos } from './pages/Movimientos/VerMovimientos.jsx'
import { MovimientoDetalle } from './pages/Movimientos/MovimientoDetalle.jsx'

import { CrearSimcard } from './pages/Simcards/CrearSimcard.jsx'
import { VerSimcards } from './pages/Simcards/VerSimcards.jsx'
import { AsignarSimcards } from './pages/Simcards/AsignarSimcards.jsx'

axios.defaults.baseURL = 'http://localhost:4000'

export function App () {
  return (
    <section className=''>
      <Routes>
        <Route path="/" element={< Layout />}>
          <Route index element={<Home />} />
          <Route path="/items" element={< Items />} />
          <Route path="/created-items" element={< CreatedItems />} />
          <Route path="/created-bodega" element={<CreatedBodega />}></Route>
          <Route path='/asignarItemBodega' element={<AsignarItemBodega />} />
          <Route path='/bodegas' element={<Bodegas />} />
          <Route path='/crearMovimiento' element={<CrearMovimiento />} />
          <Route path='/verMovimientos' element={<VerMovimientos />} />
          <Route path="/movimiento/:id" element={<MovimientoDetalle />} />
          <Route path='/createSimcard' element={<CrearSimcard />} />
          <Route path='/verSimcards' element={<VerSimcards />} />
          <Route path='/addSimcards' element={<AsignarSimcards />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </section>
  )
}
