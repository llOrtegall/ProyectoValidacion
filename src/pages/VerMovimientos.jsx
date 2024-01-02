import axios from 'axios'
import { useEffect, useState } from 'react'

export function VerMovimientos () {
  const [movimientos, setMovimientos] = useState([])

  useEffect(() => {
    axios.get('/getMovimientos')
      .then(res => {
        setMovimientos(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <main className="w-full">
      <section className="flex justify-around mt-2 ">
        <h1>Ver Movimientos</h1>
      </section>

    {
      movimientos && movimientos.map(m => (
        <article key={m._id} className="mb-2 bg-yellow-200">
          <h3><span className="font-semibold pr-2">Fecha Movimiento:</span>{m.fecha.split('T')[0]}</h3>
          <p><span className="font-semibold pr-2">Encargado:</span>{m.encargado}</p>
          <p><span className="font-semibold pr-2">N° Incidente:</span>{m.incidente}</p>
          <p><span className="font-semibold pr-2">Bodega Origen:</span>{m.bodegaOrigen?.nombre}</p>
          <p><span className="font-semibold pr-2">Bodega Destino:</span>{m.bodegaDestino?.nombre}</p>
          <p><span className="font-semibold pr-2">Cantidad Items Movidos</span>{m.items.length}</p>
          <p><span className="font-semibold pr-2">Descripción Motivo</span>{m.descripcion}</p>
        </article>
      ))
    }

    </main>
  )
}
