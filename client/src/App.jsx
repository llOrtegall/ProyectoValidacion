import { Login } from './routes/Login'
import { useContext } from 'react'
import { AuthContext } from './auth/AuthContext'
import { Dashboard } from './routes/Dashboard'
import axios from 'axios'

axios.defaults.baseURL = 'http://172.20.1.160:3000'
axios.defaults.withCredentials = true

export function App () {
  const { user } = useContext(AuthContext)

  // Si el usuario está autenticado, mostrar el panel de control
  if (user.usuario !== null) return <Dashboard />

  // Si el usuario no está autenticado, mostrar la página de inicio de sesión
  return <Login />
}
