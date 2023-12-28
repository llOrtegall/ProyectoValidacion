import axios from "axios"
import { useEffect, useState } from "react"

export function VerMovimientos (){
  const [movimientos, setMovimientos] = useState([])

  useEffect(() => {
    axios.get('/getMovimientos')
      .then(res => {
        console.log(res.data)
        setMovimientos(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return(
    <main className="w-full">
      <section className="flex justify-around mt-2 ">
        <h1>Ver Movimientos</h1>
      </section>

      {movimientos.map(movimiento => (
        <section className="flex justify-around mt-2 flex-col" key={movimiento._id}>
          <h1>Fecha: {movimiento.fecha.split('T')[0]}</h1>
          <h1>{movimiento.encargado}</h1>
          <h1>N° Incidente: {movimiento.incidente}</h1>
          <h1>Bodega Origen: {movimiento.bodegaOrigen}</h1>
          <h1>Bodega Destino: {movimiento.bodegaDestino}</h1>
          <h1>Items:{movimiento.items}</h1>
        </section>
      ))}
    </main>
  )
}