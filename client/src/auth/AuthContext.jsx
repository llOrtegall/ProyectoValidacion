import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(false);

// eslint-disable-next-line react/prop-types
export function AuthContextProvider({ children }) {
  const [username, setUsername] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3000/profile')
      .then(response => {
        setUsername(response.data.username)
      })
  }, [])


  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  )
}