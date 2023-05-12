import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);

  useEffect(() => {
    axios.get('/profile').then(response => {
      console.log(response);

      setId(response.data.id)
      setUsername(response.data.username)
      setName(response.data.nombres)
      setLastName(response.data.apellidos)
    })
  }, [])

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, name, setName, lastName, setLastName }}>
      {children}
    </UserContext.Provider>
  )
}