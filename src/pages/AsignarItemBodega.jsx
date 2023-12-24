import axios from "axios"
import { useEffect, useState } from "react"

export function AsignarItemBodega() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [bodegas, setBodegas] = useState([])
  const [items, setItems] = useState([])
  const [item, setItem] = useState({
    itemId: '',
    sucursal: '' 
  })

  useEffect(() => {
    axios.get('/getBodegas')
      .then((response) => {
        setBodegas(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    axios.get('/getItems')
      .then((response) => {
        console.log(response.data);
        setItems(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/addItemToBodega', item)
      .then(res => {
        console.log(res)
        setItem({
          itemId: '',
          sucursal: ''
        })
        setMessage(res.data.message)
        setTimeout(() => {
          setMessage('')
        }, 4000)
      })
      .catch(err => {
        console.log(err)
        setError(err.response.data.error)
        setTimeout(() => {
          setError('')
        }, 4000)
      })
  }

  return (
    <main className="flex flex-col items-center w-full h-screenbg-slate-100">
      <h1 className="text-2xl py-4 ">Asignar Item Bodega</h1>

      <form className="flex gap-2" onSubmit={handleSubmit}>
        <select name="itemId" value={item.itemId} onChange={handleChange}
        className="bg-slate-400 rounded-md shadow-lg p-2" >
          <option value="">Seleccione un item para asignar</option>
          {
            items.map((item) => {
              return (
                <option key={item._id} value={item._id} >
                  {item.nombre} - {item.placa} - {item.serial}
                </option>
              )
            })
          }
        </select>

        <select name="sucursal" value={item.sucursal} onChange={handleChange}
        className="bg-slate-400 rounded-md shadow-lg p-2">
          <option value="">Seleccione una bodega</option>
          {
            bodegas.map((bodega) => {
              return (
                <option key={bodega._id} value={bodega.sucursal} >
                  {bodega.nombre} - {bodega.sucursal} - {bodega.direccion}
                </option>
              )
            })
          }
        </select>
        <button className="p-2 bg-blue-400 hover:bg-blue-600 w-44 rounded-lg text-white font-semibold">
          Asignar
        </button>
      </form>
      { message && <p className="text-green-500 font-semibold">{message}</p> }
      { error && <p className="text-red-500 font-semibold">{error}</p> }
    </main>
  )
}