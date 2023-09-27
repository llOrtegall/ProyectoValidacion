import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false
});

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(true)

  console.log(setIsAuthenticated);


  return (
    <AuthContext.Provider value={{ isAuthenticated }} >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)