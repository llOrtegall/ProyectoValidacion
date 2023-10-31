import { useEffect, useState } from 'react'
import { ValidarUsuario } from './ValidarUsuario.jsx'
import { InfoUsuario } from './InfoUsuario.jsx'
import axios from 'axios'

export function RenderUsuarios () {
  const [user, setUser] = useState([])
  const [showComponent, setShowComponent] = useState(false)
  const [sendUserRender, setSendUserRender] = useState({})

  const toggleComponent = (ev) => {
    setShowComponent(!showComponent)
    const User = (ev.id)
    const sendUser = () => {
      // eslint-disable-next-line eqeqeq
      const newUser = user.filter((i) => i.cedula == User)
      setSendUserRender(newUser)
    }
    sendUser()
  }

  useEffect(() => {
    axios.get('http://localhost:3000/clientes')
      .then(data => {
        setUser(data.data)
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          console.log(error.response)
        }
        throw error
      })
  }, [])

  const uniqueUsers = user.filter((value, index, self) => {
    return self.findIndex((t) => t.cedula === value.cedula) === index
  })

  return (
    <>
      <section className='flex flex-col p-2' style={{ maxHeight: '550px', overflowY: 'auto' }}>
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
            {user.length > 0
              ? uniqueUsers.map(index => (
                <tr key={index.cedula}>
                  <td>{index.nombre}</td>
                  <td>{index.cedula}</td>
                  <td>{index.telefono}</td>
                  <td>{index.correo}</td>
                  <td>{index.telwhats}</td>
                  <ValidarUsuario user={index} fun={toggleComponent} />
                </tr>
              ))
              : null}
          </tbody>
        </table>
      </section>

      <section className='flex flex-col'>
        {showComponent && <InfoUsuario inf={sendUserRender} fun={toggleComponent} />}
      </section>
    </>
  )
}
