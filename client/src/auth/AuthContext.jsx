import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

export const AuthContext = createContext({
  user: {
    user: null,
    name: null,
    lastName: null,
    email: null,
    iat: null,
    proceso: null
  },
  setUser: () => { },
  logout: () => { }
})

export function AuthContextProvider ({ children }) {
  const [user, setUser] = useState({
    user: null,
    name: null,
    lastName: null,
    email: null,
    iat: null,
    proceso: null
  })

  const logout = () => {
    setUser({
      user: null,
      name: null,
      lastName: null,
      email: null,
      iat: null,
      proceso: null
    })
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
  }

  useEffect(() => {
    async function fetchProfile () {
      const token = Cookies.get('token')
      const headers = {
        Authorization: `Bearer ${token}` // Usa el token en las cabeceras
      }
      try {
        const response = await axios.get('/profile', { headers })
        const { username, nombre, apellidos, correo, iat, proceso } = response.data
        console.log(response.data)
        setUser({ user: username, name: nombre, lastName: apellidos, email: correo, iat, proceso })
      } catch (error) {
        console.error(error)
      }
    }
    fetchProfile()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
