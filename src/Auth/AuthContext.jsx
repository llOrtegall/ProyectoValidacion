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

  const login = (auth, DataUser) => {
    if (auth === true) {
      setUser(DataUser)
      setLoggedIn(true)
      setRol(DataUser.rol)
      setCompany(DataUser.empresa)
      navigate('/bodega/home')
    } else {
      setLoggedIn(false)
      setRol('')
      setCompany({})
      navigate('/')
    }
  }

  const logout = () => {
    localStorage.removeItem('Token')
    setLoggedIn(false)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ loggedIn, user, rol, setRol, login, logout, defineCompany, company, setCompany }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth () {
  return useContext(AuthContext)
}
