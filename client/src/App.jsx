import axios from 'axios'
import { Login } from './routes/Login'
import { useContext } from 'react'
import { AuthContext } from './auth/AuthContext'
import { Dashboard } from './routes/Dashboard'

export function App() {
  axios.defaults.baseURL = 'http://localhost:3000'
  axios.defaults.withCredentials = true

  const { user } = useContext(AuthContext)
  console.log(user)

  if (user.usuario !== null) return <Dashboard />

  return <Login />
}
