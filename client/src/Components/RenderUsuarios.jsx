import { useEffect, useState } from 'react'
import { ListaUsuarioChat } from './ListaUsuariosChat.jsx'
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

  const fetchClientes = async () => {
    const response = await axios.get('/clientes')
    setUser(response.data)
  }
  useEffect(() => {
    fetchClientes()
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
          <ListaUsuarioChat usuario={user} />
        </table>
      </section>

      {/* <section className='flex flex-col'>
        {showComponent && <InfoUsuario inf={sendUserRender} fun={toggleComponent} />}
      </section> */}
    </>
  )
}
