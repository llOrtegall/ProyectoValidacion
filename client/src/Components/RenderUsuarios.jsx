import { useEffect, useState } from "react";
import { getData } from "../services/getDataUser.js";
import { RegistradoClienteFiel } from "./RegistradoClienteFiel.jsx";

export function RenderUsuarios() {

  const [user, setUser] = useState([])

  useEffect(() => {
    getData()
      .then(data => { setUser(data) }
      )
      .catch(err => {
        console.log('Error: ', err)
      })
  }, [])

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

          {user.map(item => {
            return (
              <tr key={item.cedula}>
                <td>{item.nombre}</td>
                <td>{item.cedula}</td>
                <td>{item.telefono}</td>
                <td>{item.correo}</td>
                <td>{item.telwhats}</td>
                <RegistradoClienteFiel cc={item.cedula} />
              </tr>
            )
          })}
        </tbody>
      </table >
    </section>

  )
}