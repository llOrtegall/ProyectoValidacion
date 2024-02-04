import axios from 'axios'
import { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [company, setCompany] = useState({})
  const [rol, setRol] = useState('')
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('Token')
    axios.get('/profile', { headers: { Authorization: `Bearer ${token}` } }).then(res => {
      if (res.status === 200) {
        setUser(res.data)
        setCompany(res.data.empresa)
        setRol(res.data.rol)
        setLoggedIn(true)
        navigate('/bodega/home')
      }
    })
  }, [loggedIn])

  const defineCompany = (company) => {
    setCompany(company)
  }

  const login = (auth) => {
    if (auth === true) {
      navigate('/bodega/home')
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
      navigate('/login')
    }
  }

  const logout = () => {
    localStorage.removeItem('Token')
    setLoggedIn(false)
    navigate('/login')
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
