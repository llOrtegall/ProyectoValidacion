import { useState } from "react";
import { CloseIcon } from "./IconsSvg"
import axios from "axios";


// eslint-disable-next-line react/prop-types
export function NewUserCreate({ user, fun }) {

  const CloseComponent = fun
  // eslint-disable-next-line react/prop-types
  const { nombre, telefono, cedula, correo } = user[0]
  const [userCreated, setUserCreated] = useState(false);

  async function handleSubmit(ev) {
    ev.preventDefault()
    setUserCreated(true)
    axios.put('http://localhost:3000/newCF', { names, tel, email, cedula, nombre, telefono, correo })
      .then(response => {
        if (response.status === 200) {
          setUserCreated(true)
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

  return (
    <>
      <section className="relative">
        <form className="flex flex-col m-2 p-2 rounded-lg bg-green-100" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <label className="font-bold pr-8">Nombres: </label>
            <input className="mb-2 rounded-lg px-2" disabled value={nombre} />
          </div>
          <div className="flex justify-between">
            <label className="font-bold pr-8">Telefono: </label>
            <input className="mb-2 rounded-lg px-2" disabled value={telefono} />
          </div>
          <div className="flex justify-between">
            <label className="font-bold pr-8">Correo: </label>
            <input className="mb-2 rounded-lg px-2" disabled value={correo} />
          </div>
          <div className="flex justify-between">
            <label className="font-bold pr-8">Cedula: </label>
            <input className="mb-2 rounded-lg px-2" disabled value={cedula} />
          </div>
          {userCreated ? (
            <div className="text-center pt-2 text-orange-500 font-semibold">Creando El Cliente...</div>
          ) : (
            <button className="font-semibold bg-green-400 p-2 rounded-xl hover:bg-white hover:text-green-400 " >
              Crear Cliente Fiel
            </button>
          )}
        </form>
        <button className="absolute top-0 right-0 hover:bg-red-700 hover:rounded-full hover:text-white" onClick={CloseComponent}><CloseIcon /></button>
      </section>

    </>
  )
}