import { createContext, useState } from "react";

export const AuthContext = createContext(false);

// eslint-disable-next-line react/prop-types
export function AuthContextProvider({ children }) {
  const [username, setUsername] = useState(false)

  console.log(username);


  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  )
}