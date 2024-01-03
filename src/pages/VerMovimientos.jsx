import { useFilterMovimientos } from '../hooks/useFilters.js'
import { formatFecha } from '../utils/funtions.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export function VerMovimientos () {
  const [movimientos, setMovimientos] = useState([])
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    axios.get('/getMovimientos')
      .then(res => {
        setMovimientos(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const { filteredMovimientos, searchMovimiento, setSearchMovimiento } = useFilterMovimientos(movimientos)

  const sortedMovimientos = filteredMovimientos.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.movimientoId - b.movimientoId
    } else {
      return b.movimientoId - a.movimientoId
    }
  })

  return (
    <main className="w-full">
      <section className='p-2'>
        <label className='pr-2 font-semibold'>Filtro: N° Incidente - Encargado: </label>
        <input type="text" value={searchMovimiento} onChange={ev => setSearchMovimiento(ev.target.value)} placeholder="Buscar Movimiento..." className="bg-slate-100 w-64 p-2 rounded-md" />
      </section>
      <article className='grid grid-cols-7 py-2 gap-4 place-content-center place-items-center border mx-2 border-black bg-gradient-to-b from-cyan-200 to-blue-300 font-semibold'>
        <span className="overflow-ellipsis overflow-hidden cursor-pointer hover:underline"
          onClick={toggleSortOrder}>N° Mov. Generado <span>{sortOrder === 'asc' ? '▼' : '▲' }</span></span>
        <span className="overflow-ellipsis overflow-hidden">Fecha Movimiento:</span>
        <span className="overflow-ellipsis overflow-hidden">N° Incidente:</span>
        <span className="overflow-ellipsis overflow-hidden">Encargado:</span>
        <span className="overflow-ellipsis overflow-hidden">Bodega Origen:</span>
        <span className="overflow-ellipsis overflow-hidden">Bodega Destino:</span>
        <span className="overflow-ellipsis overflow-hidden">Cantidad Items Movidos</span>
      </article>

      {
        movimientos && sortedMovimientos.map(m => (
          <Link to={`/movimiento/${m._id}`} key={m._id}>
            <article
              className="grid grid-cols-7 place-content-center text-center gap-4 items-stretch h-7 mx-2 border-b-2 border-r-2 border-l-2 border-black cursor-pointer hover:bg-yellow-100">
              <span className="overflow-ellipsis overflow-hidden font-medium">{m.movimientoId}</span>
              <span className="overflow-ellipsis overflow-hidden text-blue-800 font-medium">{formatFecha(m.fecha)}</span>
              <span className="overflow-ellipsis overflow-hidden font-medium">{m.incidente}</span>
              <span className="overflow-ellipsis overflow-hidden font-medium">{m.encargado}</span>
              <span className="overflow-ellipsis overflow-hidden text-blue-800 font-medium">{m.bodegaOrigen?.nombre}</span>
              <span className="overflow-ellipsis overflow-hidden text-blue-800 font-medium">{m.bodegaDestino?.nombre}</span>
              <span className="overflow-ellipsis overflow-hidden font-medium">{m.items.length}</span>
            </article>
          </Link>

        ))
      }
    </main>
  )
}
