import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

export const AuthContext = createContext({
  user: {
    name: null,
    lastName: null,
    id: null,
    usuario: null
  },
  setUser: () => {},
  logout: () => {}
})

export function AuthContextProvider ({ children }) {
  const [user, setUser] = useState({
    name: null,
    lastName: null,
    id: null,
    usuario: null
  })

  const logout = () => {
    setUser({
      name: null,
      lastName: null,
      id: null,
      usuario: null
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
        const { data } = await axios.get('/profile', { headers })
        const { apellidos, id, nombres, username } = data
        setUser({
          name: nombres,
          lastName: apellidos,
          id,
          usuario: username
        })
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
