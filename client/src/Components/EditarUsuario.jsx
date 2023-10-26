import axios from "axios"
import { useState } from "react"

// eslint-disable-next-line react/prop-types
export function EditarUsuario({ user }) {

  // eslint-disable-next-line react/prop-types
  const { nombre, telefono, cedula, correo } = user[0]

  const [names, setNames] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')


  async function handleSubmit(ev) {
    ev.preventDefault()
    axios.put('http://localhost:3000/cliente', { names, tel, email, cedula, nombre, telefono, correo })
      .then(response => {
        if (response.status === 200) {
          setTimeout(() => {
            location.reload()
          }, 100)
        }
      })
      .then(data => console.log(data))
      .catch(response => {
        if (response.status === 500) {
          console.log('error al actulizar')
        }
      })


  }

  return (

    <form className="flex flex-col  m-4 p-4" onSubmit={handleSubmit}>
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
      <button className="font-semibold bg-green-400 p-2 rounded-xl hover:bg-white hover:text-green-400 " >
        Actualizar Información
      </button>

    </form>

  )
}