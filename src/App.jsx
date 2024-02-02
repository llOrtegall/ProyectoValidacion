import { Route, Routes } from 'react-router-dom'
import { useAuth } from './Auth/AuthContext.jsx'

import { NavBar } from './components/NavBar.jsx'
import { LoginForm } from './pages/Login/LoginForm.jsx'
import { Home } from './pages/Home.jsx'

// TODO: Pagina
import { VerMovimientos } from './pages/Movimientos/VerMovimientos.jsx'
import { Items } from './pages/Items/Items.jsx'

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.withCredentials = true

export function App () {
  const { loggedIn, defineCompany, user, company } = useAuth()

  if (!loggedIn) {
    return <LoginForm />
  }

  return (
    <>
      <NavBar company={company}/>

      <Routes>
        <Route index element={<Home />} />
        <Route path='/bodega/home' element={<Home company={company} fun={defineCompany}/>} />
        <Route path='/bodega/verMovimientos' element={<VerMovimientos company={company} />} />
        <Route path='/bodega/stock/items' element={<Items company={company} rol={user.rol}/>} />
      </Routes>
    </>
  )
}
