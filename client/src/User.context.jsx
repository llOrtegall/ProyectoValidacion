import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);

  // TODO: Si existe un TOKEN RECUPERA LA INFO EVITA QUE SE CIERRE SESION UNA VEZ INICIADA O AL RECARGAR
  useEffect(() => {
    axios.get('/profile').then(response => {
      console.log(response);
      const { apellidos, id, nombres, username } = response.data;
      setId(id)
      setUsername(username)
      setName(nombres)
      setLastName(apellidos)
    })
  }, [])

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, name, setName, lastName, setLastName }}>
      {children}
    </UserContext.Provider>
  )
}