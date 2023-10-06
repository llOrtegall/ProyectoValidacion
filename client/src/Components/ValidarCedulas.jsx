import { useState, useEffect } from 'react'

export function ValidarCedulas() {
  const [responseData, setResponseData] = useState(null);
  const [userCedulas, setUserCedulas] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const apiUrl = 'http://localhost:3000/clientes'

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setUserCedulas(data)
        setError(false)
      })
      .catch(err => {
        console.error('Error al obtener datos de la API:', err);
        setError(false)
      })
  }, [])


  useEffect(() => {

    function ExtraerCedulas(data) {
      let cedulas = []
      for (let i = 0; i < data.length; i++) {
        cedulas.push(data[i].cedula);
      }
      return cedulas
    }

    const cedulas = ExtraerCedulas(userCedulas)

    fetch('http://localhost:3000/validacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cedulas)
    })
      .then(response => response.json())
      .then(data => {
        setResponseData(data);
        setLoading(false)
      })
      .catch(error => {
        console.error('Error al realizar la solicitud POST:', error);
        setLoading(false)
      });

  }, [error])

  return (
    <>
      {loading
        ? (
          <p>Cargando...</p>
        )
        : (
          <>
            {
              responseData.map(i => (
                <tr key={i.cedula}>
                  {
                    i.userCreated === true
                      ? <td className='th-td text-sm bg-green-400'>Si</td>
                      : <td className='th-td text-sm bg-red-400'>No</td>
                  }
                </tr>
              ))
            }
          </>
        )
      }
    </>
  )
}