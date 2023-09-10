import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {

  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [apellidos, setApellidos] = useState(null);

  useEffect(() => {
    axios.get('/profile').then(response => {
      setId(response.data.id)
      setUsername(response.data.username)
      setName(response.data.nombres)
      setApellidos(response.data.apellidos)
    })
  }, [])

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, name, setName, apellidos, setApellidos }}>
      {children}
    </UserContext.Provider>
  )
}