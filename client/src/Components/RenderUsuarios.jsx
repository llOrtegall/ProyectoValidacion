import { useEffect, useState } from "react";
import { AgregarCliente } from "./AgregarCliente.jsx";
import { ValidarUsuario } from "./ValidarUsuario.jsx";
import axios from "axios";


export function RenderUsuarios() {
  const [renderComponent, setRenderComponent] = useState(false);
  const [value, setValue] = useState('')

  const handleClick = (prop) => {
    setRenderComponent(true);
    setValue(prop.target.id)
  };

  function UserTablesDetail() {
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
            <ValidarUsuario cc={i.cedula} funcion={handleClick} />

          </tr>
        ))
        : null
    )
  }



  return (
    <>
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
              <th className="">RCCF</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <UserTablesDetail />
          </tbody>
        </table >
      </section>
      {renderComponent && <AgregarCliente user={value} />}
    </>
  )
}