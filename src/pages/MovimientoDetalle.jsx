import { formatFecha } from '../utils/funtions.js'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function MovimientoDetalle () {
  const { id } = useParams()
  const [movimiento, setMovimiento] = useState(null)

  useEffect(() => {
    axios.get(`/movimiento/${id}`)
      .then(res => {
        setMovimiento(res.data)
      })
      .catch(err => console.log(err))
  }, [id])

  if (!movimiento) {
    return <div>Loading...</div>
  }

  const { bodegaDestino, bodegaOrigen, encargado, fecha, incidente, movimientoId, items } = movimiento

  return (

    movimiento &&
    <section className='flex flex-col gap-4 m-2'>
      <h1 className="text-2xl font-semibold text-center">Movimiento # : {movimientoId}</h1>
      <article className='flex justify-around'>
        <div>
          <p className="text-xl font-semibold">Fecha: {formatFecha(fecha)}</p>
          <p className="text-xl font-semibold">Encargado: {encargado}</p>
          <p className="text-xl font-semibold">Incidente: {incidente}</p>
        </div>
        <div>
          <p className="text-xl font-semibold">Bodega Origen: {bodegaOrigen.nombre}</p>
          <p className="text-xl font-semibold">Bodega Destino: {bodegaDestino.nombre}</p>
          <p className="text-xl font-semibold">Cantidad de Items: {items.length}</p>
        </div>
      </article>

      <h2 className="text-xl font-semibold text-center">Items Movidos</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Item</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className='border px-4 py-2'>N° Placa</th>
            <th className="border px-4 py-2">Serial</th>
            <th className="border px-4 py-2">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map(item => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{item.nombre}</td>
                <td className="border px-4 py-2">{item.descripcion}</td>
                <td className='border px-4 py-2 uppercase text-center'>{item.placa}</td>
                <td className='border px-4 py-2 uppercase text-center'>{item.serial}</td>
                <td className="border px-4 py-2 text-center">1</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>

  )
}
