import { Route, Routes } from 'react-router-dom'
import { useAuth } from './Auth/AuthContext.jsx'

import { NavBar } from './components/NavBar.jsx'
import { LoginForm } from './pages/Login/LoginForm.jsx'
import { Home } from './pages/Home.jsx'

// TODO: Pagina
import { VerMovimientos } from './pages/Movimientos/VerMovimientos.jsx'

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.withCredentials = true

export function App () {
  const { loggedIn, user, login, logout, defineCompany, company } = useAuth()

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
      </Routes>
    </>
  )
}
