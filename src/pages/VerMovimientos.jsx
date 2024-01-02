import { useEffect, useState } from 'react'
import moment from 'moment-timezone'
import axios from 'axios'

export function VerMovimientos () {
  const [movimientos, setMovimientos] = useState([])

  useEffect(() => {
    axios.get('/getMovimientos')
      .then(res => {
        setMovimientos(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const formatFecha = (fecha) => {
    const fechaLocal = moment(fecha).tz(moment.tz.guess()).format('YYYY-MM-DD hh:mm A')
    return fechaLocal
  }

  return (
    <main className="w-full">
      <article className='grid grid-cols-7 py-2 gap-4 place-content-center place-items-center border mx-2 border-black'>
        <span className="overflow-ellipsis overflow-hidden ">N° Movi...</span>
        <span className="overflow-ellipsis overflow-hidden ">Fecha Movimiento:</span>
        <span className="overflow-ellipsis overflow-hidden ">N° Incidente:</span>
        <span className="overflow-ellipsis overflow-hidden ">Encargado:</span>
        <span className="overflow-ellipsis overflow-hidden ">Bodega Origen:</span>
        <span className="overflow-ellipsis overflow-hidden ">Bodega Destino:</span>
        <span className="overflow-ellipsis overflow-hidden ">Cantidad Items Movidos</span>
      </article>

      {
        movimientos && movimientos.map(m => (
          <article key={m._id} className="grid grid-cols-7 place-content-center place-items-center gap-4 items-stretch h-7 bg-yellow-200 mx-2 border-b-2 border-r-2 border-l-2 border-black cursor-pointer hover:bg-blue-200">
            <span className="overflow-ellipsis overflow-hidden">{m.movimientoId}</span>
            <span className="overflow-ellipsis overflow-hidden">{formatFecha(m.fecha)}</span>
            <span className="overflow-ellipsis overflow-hidden">{m.incidente}</span>
            <span className="overflow-ellipsis overflow-hidden">{m.encargado}</span>
            <span className="overflow-ellipsis overflow-hidden">{m.bodegaOrigen?.nombre}</span>
            <span className="overflow-ellipsis overflow-hidden">{m.bodegaDestino?.nombre}</span>
            <span className="overflow-ellipsis overflow-hidden">{m.items.length}</span>
          </article>
        ))
      }
    </main>
  )
}
