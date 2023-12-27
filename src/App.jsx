import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'

import { CreatedItems } from './pages/CreatedItems.jsx'
import { Home } from './pages/Home.jsx'
import { Items } from './pages/Items.jsx'

import axios from 'axios'
import { CreatedBodega } from './pages/createdBodega.jsx'
import { AsignarItemBodega } from './pages/AsignarItemBodega.jsx'
import { Bodegas } from './pages/Bodegas.jsx'

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
        </Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </section>
  )
}