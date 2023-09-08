import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {

  const [username, setUsername] = useState(null);
  // const [id, setId] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    axios.get('/profile').then(response => {
      console.log(response)
      // setId(response.data.id)
      setUsername(response.data.username)
      setName(response.data.name)
    })
  }, [])

  return (
    <UserContext.Provider value={{ username, setUsername,/* id, setId,*/ name, setName }}>
      {children}
    </UserContext.Provider>
  )
}