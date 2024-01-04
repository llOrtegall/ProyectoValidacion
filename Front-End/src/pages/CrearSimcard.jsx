import axios from 'axios'
import { useState } from 'react'

export function CrearSimcard () {
  // const [error, setError] = useState('')
  // const [message, setMessage] = useState('')
  const [simcard, setSimcard] = useState({
    numero: '',
    operador: '',
    estado: '',
    serial: '',
    apn: '',
    user: '',
    pass: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    axios.post('/createSimcard', simcard)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <main className='w-full flex items-center justify-center'>
      <form className='bg-blue-600 m-4 p-8 rounded-md grid grid-cols-2 gap-2 place-items-center' onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="numero">Numero</label>
          <input type="text" name="numero" id="numero" value={simcard.numero} onChange={(e) => setSimcard({ ...simcard, numero: e.target.value })} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="operador">Operador</label>
          <input type="text" name="operador" id="operador" value={simcard.operador} onChange={(e) => setSimcard({ ...simcard, operador: e.target.value })} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="estado">Estado</label>
          <input type="text" name="estado" id="estado" value={simcard.estado} onChange={(e) => setSimcard({ ...simcard, estado: e.target.value })} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="serial">Serial</label>
          <input type="text" name="serial" id="serial" value={simcard.serial} onChange={(e) => setSimcard({ ...simcard, serial: e.target.value })} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="apn">Apn</label>
          <input type="text" name="apn" id="apn" value={simcard.apn} onChange={(e) => setSimcard({ ...simcard, apn: e.target.value })} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="user">User</label>
          <input type="text" name="user" id="user" value={simcard.user} onChange={(e) => setSimcard({ ...simcard, user: e.target.value })} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="pass">Pass</label>
          <input type="text" name="pass" id="pass" value={simcard.pass} onChange={(e) => setSimcard({ ...simcard, pass: e.target.value })} />
        </div>
        <div className="flex flex-col bg-green-400 h-8 rounded-md px-2 justify-center">
          <button type="submit">Crear Simcard</button>
        </div>
      </form>
    </main>

  )
}
