import { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const login = (auth, user) => {
    if (auth === true) {
      setLoggedIn(true)
      setUser(user)
    }
  }
  const logout = () => {
    setLoggedIn(false)
    setUser({})
    document.cookie = 'bodega=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'bodega=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/bodega;'
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth () {
  return useContext(AuthContext)
}
