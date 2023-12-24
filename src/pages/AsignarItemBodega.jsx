import axios from "axios"
import { useEffect, useState } from "react"

export function AsignarItemBodega() {
  const [bodegas, setBodegas] = useState([])
  const [items, setItems] = useState([])

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

  return (
    <main className="flex flex-col items-center w-full h-screenbg-slate-100">
      <h1 className="text-2xl py-4 ">Asignar Item Bodega</h1>

      <form className="flex gap-2">
        <select className="bg-slate-400 rounded-md shadow-lg p-2">
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

        <select className="bg-slate-400 rounded-md shadow-lg p-2">
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
      </form>
    </main>
  )
}