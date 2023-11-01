import { useEffect, useState } from 'react'
import { ValidarUsuario } from './ValidarUsuario.jsx'
import { InfoUserChat } from './InfoUserChat.jsx'
import axios from 'axios'

export function RenderUsuarios () {
  // 1. Agregar manejo de errores en la petición de axios.
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [datoDeValidacion, setDatoDeValidacion] = useState()
  const [userFiltrado, setUserFiltrado] = useState(null)

  const FiltrarUsuario = () => {
    const documento = datoDeValidacion
    const documentoInt = parseInt(documento)
    const userFiltrado = user.filter((user) => user.cedula === documentoInt)
    setUserFiltrado(userFiltrado)
  }

  const manejarDatoDeValidacion = (dato) => {
    setDatoDeValidacion(dato)
  }

  useEffect(() => {
    if (datoDeValidacion) {
      FiltrarUsuario()
    }
  }, [datoDeValidacion])

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
          <tbody className='text-center'>
            {user.length && user.map((user) => (
              <tr key={user.id}>
                <td>{user.nombre}</td>
                <td>{user.cedula}</td>
                <td>{user.telefono}</td>
                <td>{user.correo}</td>
                <td>{user.telwhats}</td>
                <ValidarUsuario user={user.cedula} onDatoDeValidacion={manejarDatoDeValidacion} />
              </tr>
            ))}
          </tbody>
        </table>
        {/* 2. Agregar un mensaje de carga y manejo de errores. */}
        {loading && <p>Cargando usuarios...</p>}
        {error && <p>Error al cargar usuarios: {error.message}</p>}
      </section>

      <section>
        {userFiltrado && <InfoUserChat user={userFiltrado} />}
      </section>
    </>
  )
}
