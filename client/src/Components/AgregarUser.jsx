import { useState, useEffect } from "react";

export function AgregarUser(data) {

  console.log(data.user);


  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'http://localhost:3000/clientes'

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error al obtener datos de la API:', error);
        setLoading(false)
      })
  }, [])






  return (
    <button className='ml-3 px-1 bg-white rounded p-1 '>Crear Cliente</button>
  )
}