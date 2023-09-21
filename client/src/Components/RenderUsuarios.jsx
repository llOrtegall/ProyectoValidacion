import { useEffect, useState } from "react";
import axios from "axios";

export function RenderUsuarios() {

  // eslint-disable-next-line react/prop-types
  function ValidarUsuario({ cc }) {
    const [valida, setValida] = useState('')

    useEffect(() => {
      axios.post('http://localhost:3000/validarUsuario', { cc })
        .then(data => {
          setValida(data.data)
        })
        .catch(data => {
          if (data.response && data.response.status === 200) {
            setValida(data.response.data)
          }
        })
    }, [cc])

    return (
      valida === 'Si Existe'
        ? <td className="bg-green-400">{valida}</td>
        : <td className="bg-red-400">{valida}</td>
    )
  }

  function RenderUsers() {
    const [user, setUser] = useState([]);

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

    return (
      user.length > 0
        ? user.map(i => (
          <tr key={i.cedula}>
            <td>{i.nombre}</td>
            <td>{i.cedula}</td>
            <td>{i.telefono}</td>
            <td>{i.correo}</td>
            <td>{i.telwhats}</td>
            <ValidarUsuario cc={i.cedula} />
          </tr>
        ))
        : <tr>NO LLEGO SOLICITUD DE USUARIOS</tr>
    )
  }


  return (
    <section className="w-full flex flex-col p-2">
      <h1 className="p-3 text-white rounded-t-xl text-xl font-semibold bg-blue-500 text-center">Usuarios Registrados Por Chat Boot</h1>
      <table className="">
        <thead >
          <tr>
            <th>Nombres</th>
            <th>Documento</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>N° Registro</th>
            <th>RCF</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <RenderUsers />
        </tbody>
      </table >
    </section>

  )
}