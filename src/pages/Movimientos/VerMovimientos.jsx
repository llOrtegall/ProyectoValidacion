import { useFilterMovimientos } from '../../hooks/useFilters.js'
import { getMovimientos } from '../../services/FetchItemsData.js'
import { formatFecha } from '../../utils/funtions.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function VerMovimientos ({ company }) {
  const [movimientos, setMovimientos] = useState([])
  const [sortOrder, setSortOrder] = useState('desc')

  useEffect(() => {
    getMovimientos(company)
      .then(res => {
        setMovimientos(res)
      }).catch(err => {
        console.log(err)
      })
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
    <section className="w-full h-[93vh] overflow-auto">

      <article className='p-2 bg-blue-700 mb-2'>
        <label className='pr-2 font-semibold'>Filtro: N° Incidente | Encargado : </label>
        <input type="text" value={searchMovimiento} onChange={ev => setSearchMovimiento(ev.target.value)} placeholder="Buscar Movimiento..."
          className="bg-slate-200 w-64 p-1 rounded-md border border-black" />
      </article>

      <table className='w-full'>
        <thead >
          <tr>
            <th className=" cursor-pointer hover:underline" onClick={toggleSortOrder}> N° Mov <span>{sortOrder === 'asc' ? '▼' : '▲'}</span></th>
            <th> Fecha Mov</th>
            <th> N° Incidente</th>
            <th> Encargado</th>
            <th> Origen</th>
            <th> Destino</th>
            <th> Cant Item Mov</th>
            <th> Cant Sims Mov</th>
          </tr>
        </thead>
        <tbody>
          {
            movimientos && sortedMovimientos.map(m => (
              <tr key={m.movimientoId}>
                <td>{m.movimientoId}</td>
                <td>{formatFecha(m.fecha)}</td>
                <td>{m.incidente}</td>
                <td>{m.encargado}</td>
                <td>{m.bodegaOrigen?.nombre}</td>
                <td>{m.bodegaDestino?.nombre}</td>
                <td>{m.items.length}</td>
                <td>{m.simcards.entran.length + m.simcards.salen.length}</td>
              </tr>
            )
            )
          }
        </tbody>
      </table>

    </section>
  )
}
