import { useState, useEffect } from 'react'

export function RenderUsuarios() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'http://localhost:3000/clientes'

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error al obtener datos de la API:', error);
        setLoading(false)
      })
  }, [])

  return (
    <>
      {loading
        ? (
          <p>Cargando...</p>
        )
        : (
          <>
            {
              data.map(i => (
                <tr key={i.cedula}>
                  <td className='th-td text-sm'>{i.nombre}</td>
                  <td className='th-td text-sm'>{i.cedula}</td>
                  <td className='th-td text-sm'> {i.correo}</td>
                </tr>
              ))
            }
          </>
        )
      }
    </>
  )
}