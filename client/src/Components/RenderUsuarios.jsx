import { useEffect, useState } from "react";
import axios from "axios";
import { InfoIcon } from "./IconsSvg";

export function RenderUsuarios() {
  const [renderComponent, setRenderComponent] = useState(false);
  const [value, setValue] = useState('')

  const handleClick = (prop) => {
    // Cambiar el estado para renderizar el componente cuando se hace clic
    setRenderComponent(true);
    // console.log(prop.target.id);
    setValue(prop.target.id)
  };


  // eslint-disable-next-line react/prop-types
  function ValidarUsuario({ cc }) {
    const [valida, setValida] = useState('')

    useEffect(() => {
      axios.post('http://localhost:3000/getCF', { cc })
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
      valida.stado === 'Si Existe'
        ? <>
          <td className="bg-green-400">{valida.stado}</td>
          <td className="bg-green-400">Ok</td>
        </>
        : <>
          <td className="bg-red-400">{valida.stado}</td>
          <td className="hover:bg-yellow-500 hover:cursor-pointer hover:text-white"
            onClick={ev => handleClick(ev)} id={valida.user}>Crear Usuario</td>
        </>
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
        : null
    )
  }

  // eslint-disable-next-line react/prop-types
  function AgregarCliente({ user }) {

    const documento = user
    const [renderInfo, setRenderInfo] = useState({})
    useEffect(() => {
      axios.post('http://localhost:3000/cliente', { documento })
        .then(data => {
          setRenderInfo(data.data);
        })
    }, [documento])

    return (
      <>
        <section className="flex w-auto m-2 p-2 bg-yellow-300 rounded-lg justify-center ">
          <span className="font-semibold">Por Favor Antes De Agregar El Usuario Validar Con Alguna Página Del Estado La Información Recibida</span>
        </section>

        <section className="flex m-2 p-6 bg-zinc-300 rounded-lg items-center">

          <figure className="w-auto h-full pr-2 ">
            <InfoIcon />
          </figure>

          <div className="flex flex-col border rounded-md p-6 bg-zinc-400 w-auto">
            {renderInfo.length > 0
              ? renderInfo.map(
                i => (
                  <div key={i.cedula}>
                    <div className="flex justify-between">
                      <h1 className="font-bold pr-8">Nombres: </h1>
                      <h1 className="">{i.nombre}</h1>
                    </div>
                    <div className="flex justify-between">
                      <h1 className="font-bold pr-8">N° Cedula: </h1>
                      <h1 className="">{i.cedula}</h1>
                    </div>

                    <div className="flex justify-between">
                      <h1 className="font-bold pr-8">Telefono: </h1>
                      <h1 className="">{i.telefono}</h1>
                    </div>
                    <div className="flex justify-between">
                      <h1 className="font-bold pr-8">Tel Registro: </h1>
                      <h1 className="">{i.telwhats}</h1>
                    </div>
                    <div className="flex justify-between">
                      <h1 className="font-bold pr-8">Correo: </h1>
                      <h1 className="">{i.correo}</h1>
                    </div>
                    <div className="flex justify-between">
                      <label className="font-bold pr-8"> Usuario Validado: </label>
                      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" className="w-4" />
                    </div>
                  </div>
                ))
              : null}
          </div>

          <article className="grid grid-cols-1 w-auto h-auto">
            <button className="hover:text-white shadow-lg font-semibold p-2 mx-4 my-2 rounded-xl bg-green-400">Crear Usuario</button>
            <button className="hover:text-white shadow-lg font-semibold p-2 mx-4 my-2 rounded-xl bg-yellow-400">Editar Usuario</button>
            <button className="hover:text-white shadow-lg font-semibold p-2 mx-4 my-2 rounded-xl bg-red-400">Eliminar Usuario</button>
          </article>

        </section >

      </>

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
            <RenderUsers />
          </tbody>
        </table >
      </section>
      {renderComponent && <AgregarCliente user={value} />}
    </>
  )
}