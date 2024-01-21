// TODO: Librerías externas
import { Routes, Route } from 'react-router-dom'
import { VerMovimientos } from './pages/Movimientos/VerMovimientos.jsx'
import { VerSimcards } from './pages/Simcards/VerSimcards.jsx'
import { Bodegas } from './pages/Bodegas/Bodegas.jsx'
import { Items } from './pages/Items/Items.jsx'
import { Home } from './pages/Home.jsx'

import { Layout } from './components/Layout.jsx'

import { ProtectdeRoutes } from './Auth/components/ProtectedRoutes.jsx'
import { useAuth } from './Auth/AuthContext.jsx'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'

export function App() {
  const { login, logout, loggedIn } = useAuth()

  // console.log(loggedIn)

  // useEffect(() => {
  //   const token = getCookie('bodega')
  //   if (token) {
  //     GetUserCookie(token).then(user => {
  //       login(user)
  //     }).catch(() => {
  //       logout()
  //     })
  //   } else {
  //     logout()
  //   }
  // }, [])

  return (
    <Routes>

      <Route element={<ProtectdeRoutes isAllowed={true} />} >
        <Route path='/bodega/*' element={<Layout />} >
          <Route path='home' element={<Home fun={logout} />} />
          <Route path='stock/movimientos' element={<VerMovimientos fun={logout} />} />
          <Route path="stock/items" element={<Items fun={logout} />} />
          <Route path="stock/bodegas" element={<Bodegas fun={logout} />} />
          <Route path='stock/simcards' element={<VerSimcards fun={logout} />} />
        </Route>
      </Route>
    </Routes>
  )
}
