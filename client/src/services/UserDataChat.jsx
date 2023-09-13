import { useState, useEffect } from 'react';

const URL = 'http://localhost:3000/clientes';

export function UserDataChat() {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => setUserData(data))
  }, [])

  return userData

}