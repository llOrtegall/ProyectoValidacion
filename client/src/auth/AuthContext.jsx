import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [name, setName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [id, setId] = useState(null)

  useEffect(() => {
    axios.get('/profile')
      .then(data => {
        const { apellidos, id, nombres, username } = data.data
        setUser(username), setName(nombres), setLastName(apellidos), setId(id)
      })
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, name, setName, lastName, setLastName, id, setId }}>
      {children}
    </AuthContext.Provider>
  )
}

