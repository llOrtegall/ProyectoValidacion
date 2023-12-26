import axios from "axios"
import { useEffect, useState } from "react"

export function Bodegas() {
  const [bodegas, setBodegas] = useState([])

  useEffect(() => {
    axios.get('/getBodegas')
      .then(response => {
        setBodegas(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <main>
      {
        bodegas.map(bodega => (
          <article key={bodega._id} className="flex justify-between items-center p-4 border border-gray-400 rounded shadow-lg">
            <div>
              <h2 className="font-semibold">{bodega.nombre}</h2>
              <p><span className="font-semibold">Sucursal: </span> {bodega.sucursal}</p>
              <p><span className="font-semibold">Dirección: </span>{bodega.direccion}</p>
            </div>
            <div>
              <p>Items Asignados</p>
              <p className="text-center">{bodega.items.length}</p>
            </div>
          </article>
        ))
      }
    </main>
  )
}