import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'

import { CreatedItems } from './pages/CreatedItems.jsx'
import { Items } from './pages/Items.jsx'
import { Home } from './pages/Home.jsx'

import { AsignarItemBodega } from './pages/AsignarItemBodega.jsx'
import { CrearMovimiento } from './pages/CrearMovimiento.jsx'
import { CreatedBodega } from './pages/createdBodega.jsx'
import { Bodegas } from './pages/Bodegas.jsx'

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export function App() {
  return (
    <section className='w-screen h-full'>
      <Routes>
        <Route path="/" element={< Layout />}>
          <Route path="home" element={< Home />}></Route>
          <Route path="items" element={< Items />}></Route>
          <Route path="created-items" element={< CreatedItems />}></Route>
          <Route path="created-bodega" element={<CreatedBodega />}></Route>
          <Route path='asignarItemBodega' element={<AsignarItemBodega />}></Route>
          <Route path='bodegas' element={<Bodegas />}></Route>
          <Route path='crearMovimiento' element={<CrearMovimiento />}></Route>
        </Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </section>
  )
}
