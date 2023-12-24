import axios from "axios"
import { useEffect, useState } from "react"

export function AsignarItemBodega() {
  const [bodegas, setBodegas] = useState([])

  useEffect(() => {
    axios.get('/getBodegas')
      .then((response) => {
        setBodegas(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
<main className="bg-slate-100">
  <h1>Asignar Item Bodega</h1>
  <select className="bg-white shadow-lg p-2">

    {
      bodegas.map((bodega) => {
        return (
          <option value={bodega._id} key={bodega._id}>
            {bodega.nombre} - {bodega.sucursal} - {bodega.direccion}
          </option>
        )
      })
    }
  </select>
</main>
  )
}