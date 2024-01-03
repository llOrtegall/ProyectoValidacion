// TODO: Librerías externas
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'

// TODO: Componentes de diseño
import { Layout } from './components/Layout.jsx'

// TODO: Páginas
import { Home } from './pages/Home.jsx'
import { Items } from './pages/Items.jsx'
import { Bodegas } from './pages/Bodegas.jsx'
import { CreatedItems } from './pages/CreatedItems.jsx'
import { CreatedBodega } from './pages/createdBodega.jsx'
import { VerMovimientos } from './pages/VerMovimientos.jsx'
import { CrearMovimiento } from './pages/CrearMovimiento.jsx'
import { AsignarItemBodega } from './pages/AsignarItemBodega.jsx'
import { MovimientoDetalle } from './pages/MovimientoDetalle.jsx'

axios.defaults.baseURL = 'http://localhost:3000'

export function App () {
  return (
    <section className=''>
      <Routes>
        <Route path="/" element={< Layout />}>
          <Route path="home" element={< Home />}></Route>
          <Route path="items" element={< Items />}></Route>
          <Route path="created-items" element={< CreatedItems />}></Route>
          <Route path="created-bodega" element={<CreatedBodega />}></Route>
          <Route path='asignarItemBodega' element={<AsignarItemBodega />}></Route>
          <Route path='bodegas' element={<Bodegas />}></Route>
          <Route path='crearMovimiento' element={<CrearMovimiento />}></Route>
          <Route path='verMovimientos' element={<VerMovimientos/>}></Route>
          <Route path="/movimiento/:id" element={<MovimientoDetalle/>} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </section>
  )
}
