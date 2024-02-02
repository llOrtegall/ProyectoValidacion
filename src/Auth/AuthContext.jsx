import axios from 'axios'
import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [company, setCompany] = useState({})
  const [rol, setRol] = useState('')
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const defineCompany = (company) => {
    setCompany(company)
  }

  const login = (usuario) => {
    if (usuario.auth === true) {
      navigate('/bodega/home')
      setLoggedIn(true)
      setUser(usuario.UserLogin)
      setCompany(usuario.UserLogin.empresa)
      setRol(usuario.UserLogin.rol)
    } else {
      setLoggedIn(false)
      setUser({})
      setCompany({})
      navigate('/login')
    }
  }

  const logout = () => {
    axios.post('/logout').then(res => {
      if (res.status === 200) {
        setLoggedIn(false)
        setUser({})
        setCompany({})
      }
    })
  }

  return (
    <AuthContext.Provider value={{ loggedIn, user, rol, login, logout, defineCompany, company }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth () {
  return useContext(AuthContext)
}
