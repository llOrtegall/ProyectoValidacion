import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(false);

// eslint-disable-next-line react/prop-types
export function AuthContextProvider({ children }) {
  const [username, setUsername] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3000/profile')
      .then(response => {
        if (response.status === 200) {
          setUsername(true)
        }
      })
  }, [])

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  )
}