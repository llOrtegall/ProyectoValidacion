import axios from "axios"
import { useState } from "react"
import { CloseIcon } from "./IconsSvg";

// eslint-disable-next-line react/prop-types
export function EditarUsuario({ user, fun }) {

  const CloseComponent = fun

  // eslint-disable-next-line react/prop-types
  const { nombre, telefono, cedula, correo } = user[0]
  const [userUpdate, setUserUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')


  async function handleSubmit(ev) {
    ev.preventDefault()
    setLoading(true)
    axios.put('http://localhost:3000/cliente', { names, tel, email, cedula, nombre, telefono, correo })
      .then(response => {
        if (response.status === 200) {
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
        setLoading(false)
      })
  }

  const UsuarioActualizado = () => {

    setTimeout(() => {
      CloseComponent()
      location.reload()
    }, 3000)
    return <div className="text-green-500 pt-2 absolute bottom-0 pb-4 right-auto font-bold "> Usuarios Actualizado Correctamente !!!</div>
  }

  return (
    <>
      <section className="relative">
        <form className="flex flex-col m-4 p-4 rounded-lg" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <label className="font-bold pr-8">Nombres: </label>
            <input className="mb-2 rounded-lg px-2" defaultValue={nombre} onChange={ev => setNames(ev.target.value)} />
          </div>
          <div className="flex justify-between">
            <label className="font-bold pr-8">Telefono: </label>
            <input className="mb-2 rounded-lg px-2" defaultValue={telefono} onChange={ev => setTel(ev.target.value)} />
          </div>
          <div className="flex justify-between">
            <label className="font-bold pr-8">Correo: </label>
            <input className="mb-2 rounded-lg px-2" defaultValue={correo} onChange={ev => setEmail(ev.target.value)} />
          </div>
          {loading ? (
            <div>Actualizando Información...</div>
          ) : (
            <button className="font-semibold bg-green-400 p-2 rounded-xl hover:bg-white hover:text-green-400 " >
              Actualizar Información
            </button>
          )}
          {userUpdate === true
            ? <UsuarioActualizado />
            : null
          }
        </form>
        <button className="absolute top-0 right-0 hover:bg-red-700 hover:rounded-full hover:text-white" onClick={CloseComponent}><CloseIcon /></button>
      </section>

    </>

  )
}