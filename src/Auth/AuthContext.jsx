import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [company, setCompany] = useState({})
  const [rol, setRol] = useState('')
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const defineCompany = (company) => {
    setCompany(company)
  }

  const login = (auth, DataUser) => {
    if (auth === true) {
      setUser(DataUser)
      setRol(DataUser.rol)
      setCompany(DataUser.empresa)
      navigate('/bodega/home')
    } else {
      setUser(null)
      setRol('')
      setCompany({})
      navigate('/')
    }
  }

  const logout = () => {
    localStorage.removeItem('tokenBodega')
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, rol, login, logout, defineCompany, company }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth () {
  return useContext(AuthContext)
}
