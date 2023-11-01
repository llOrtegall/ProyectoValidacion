import axios from 'axios'
import { Login } from './routes/Login'
import { useContext } from 'react'
import { AuthContext } from './auth/AuthContext'
import { Dashboard } from './routes/Dashboard'

export function App () {
  // Configuración de axios
  axios.defaults.baseURL = 'http://localhost:3000'
  axios.defaults.withCredentials = true

  // Obtener el usuario actual del contexto de autenticación
  const { user } = useContext(AuthContext)

  // Si el usuario está autenticado, mostrar el panel de control
  if (user.usuario !== null) return <Dashboard />

  // Si el usuario no está autenticado, mostrar la página de inicio de sesión
  return <Login />
}
