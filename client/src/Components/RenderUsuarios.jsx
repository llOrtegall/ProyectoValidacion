import { useEffect, useState } from "react";
import { getData } from "../services/getDataUser.js";

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
          </tr>
        </thead>
        <tbody className="text-center">
          {console.log(user)}
          {user.map(item => {
            return (
              <tr key={item.cedula}>
                <td>{item.nombre}</td>
                <td>{item.cedula}</td>
                <td>{item.telefono}</td>
                <td>{item.correo}</td>
                <td>{item.telwhats}</td>
              </tr>
            )
          })}
        </tbody>
      </table >
    </section>

  )
}