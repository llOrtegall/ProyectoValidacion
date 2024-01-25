import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [company, setCompany] = useState({})
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const defineCompany = (company) => {
    setCompany(company)
  }

  const login = (usuario) => {
    if (usuario.auth === true) {
      setLoggedIn(true)
      setUser(usuario.user)
      setCompany(usuario.user.empresa)
    }
  }

  const logout = () => {
    setLoggedIn(false)
    setUser({})
    document.cookie = 'bodega=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'bodega=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/bodega;'
    navigate('/bodega/login')
  }

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout, defineCompany, company }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth () {
  return useContext(AuthContext)
}
