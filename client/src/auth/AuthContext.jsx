import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

export const AuthContext = createContext({})

// eslint-disable-next-line react/prop-types
export function AuthContextProvider ({ children }) {
  const [user, setUser] = useState({ name: null, lastName: null, id: null, usuario: null })

  const logout = () => {
    setUser({ name: null, lastName: null, id: null, usuario: null })
    Cookies.remove('token')
  }

  useEffect(() => {
    axios.get('/profile')
      .then(data => {
        const { apellidos, id, nombres, username } = data.data
        setUser({ name: nombres, lastName: apellidos, id, usuario: username })
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
