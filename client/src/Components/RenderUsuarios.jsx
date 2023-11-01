import { useEffect, useState } from 'react'
import { ListaUsuarioChat } from './ListaUsuariosChat.jsx'
import axios from 'axios'

export function RenderUsuarios () {
  // 1. Agregar manejo de errores en la petición de axios.
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // 2. Agregar una variable de estado para manejar el estado de carga de la petición.
    setLoading(true)
    setError(null)

    axios.get('/clientes')
      .then(response => {
        setUser(response.data)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <section className='flex flex-col p-2' style={{ maxHeight: '450px', overflowY: 'auto' }}>
        <h1 className='p-3 text-white rounded-t-xl text-xl font-semibold bg-blue-500 text-center'>Usuarios Registrados Por Chat Boot</h1>
        <table className=''>
          <thead className=''>
            <tr>
              <th>Nombres</th>
              <th>Documento</th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>N° Registro</th>
              <th>RCCF</th>
              <th>Opciones</th>
            </tr>
          </thead>
          {/* 3. Agregar una clave única a cada elemento de la lista de usuarios para evitar errores de rendimiento. */}
          <ListaUsuarioChat usuario={user} key={user.map(u => u.id).join(',')} />
        </table>
        {/* 2. Agregar un mensaje de carga y manejo de errores. */}
        {loading && <p>Cargando usuarios...</p>}
        {error && <p>Error al cargar usuarios: {error.message}</p>}
      </section>
    </>
  )
}
