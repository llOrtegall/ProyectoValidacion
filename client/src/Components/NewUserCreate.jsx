import { useState } from "react";
import { CloseIcon } from "./IconsSvg"
import axios from "axios";


// eslint-disable-next-line react/prop-types
export function NewUserCreate({ user, fun }) {

  const CloseComponent = fun
  // eslint-disable-next-line react/prop-types
  const { nombre, telefono, cedula, correo } = user[0]
  const [userCreated, setUserCreated] = useState(false);
  const [userUpdate, setUserUpdate] = useState(false);

  async function handleCreate(ev) {
    ev.preventDefault()
    setUserCreated(true)
    axios.post('http://localhost:3000/newCF', { cedula, nombre, telefono, correo })
      .then(response => {
        if (response.status === 201) {
          setUserUpdate(true)
        }
      })
      .then(data => console.log(data.json()))
      .catch(response => {
        if (response.status === 500) {
          console.log('error al actulizar')
        }
      })
      .finally(() => {
        setUserCreated(false)
      })
  }

  const UsuarioCreado = () => {

    setTimeout(() => {
      CloseComponent()
      location.reload()
    }, 3000)
    return <div className="text-green-500 pt-2 absolute bottom-0 pb-4 right-auto font-bold "> Usuarios Creado Correctamente !!!</div>
  }

  return (
    <>
      <section className="relative w-1/3">
        <form className="flex flex-col m-2 p-2 rounded-lg bg-green-100" onSubmit={handleCreate}>
          <div className="flex">
            <label className="font-bold pr-8">Nombres: </label>
            <input className="mb-2 rounded-lg px-2 w-full" disabled value={nombre} />
          </div>
          <div className="flex">
            <label className="font-bold pr-8">Telefono: </label>
            <input className="mb-2 rounded-lg px-2 w-full" disabled value={telefono} />
          </div>
          <div className="flex">
            <label className="font-bold pr-8">Correo: </label>
            <input className="mb-2 rounded-lg px-2 w-full" disabled value={correo} />
          </div>
          <div className="flex">
            <label className="font-bold pr-8">Cedula: </label>
            <input className="mb-2 rounded-lg px-2 w-full" disabled value={cedula} />
          </div>
          {userCreated ? (
            <div className="text-center  text-orange-500 font-semibold">Creando El Cliente...</div>
          ) : (
            <button className="font-semibold bg-green-400 p-2 rounded-xl hover:bg-white hover:text-green-400 " >
              Crear Cliente Fiel
            </button>
          )}
          {userUpdate === true
            ? <UsuarioCreado />
            : null
          }
        </form>
        <button className="absolute top-0 right-0 hover:bg-red-700 hover:rounded-full hover:text-white" onClick={CloseComponent}><CloseIcon /></button>
      </section>

    </>
  )
}