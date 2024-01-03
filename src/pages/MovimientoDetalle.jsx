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
      <article className='border bg-slate-200'>
        <section>
          <h1 className="text-lg text-center bg-gradient-to-b from-cyan-200 to-blue-300 p-1 font-semibold">Movimiento:
            <span className='font-semibold pl-2'>{movimientoId}</span>
          </h1>
        </section>

        <section className='grid grid-cols-2 place-items-center p-2'>
          <p className="text-blue-800 font-medium">Fecha: <span className='font-semibold text-black'>{formatFecha(fecha)}</span></p>
          <p className="text-blue-800 font-medium">Encargado: <span className='font-semibold text-black'>{encargado}</span></p>
          <p className="text-blue-800 font-medium">Incidente: <span className='font-semibold text-black'>{incidente}</span></p>
          <p className="text-blue-800 font-medium">Bodega Origen:<span className='font-semibold text-black'>{bodegaOrigen.nombre}</span></p>
          <p className="text-blue-800 font-medium">Cantidad De Items Movidos: <span className='font-semibold text-black'>{items.length}</span> </p>
          <p className="text-blue-800 font-medium">Bodega Destino: <span className='font-semibold text-black'>{bodegaDestino.nombre}</span> </p>
        </section>
      </article>

      <article className='w-full'>
        <table className="table-auto w-full">
          <thead>
            <tr className='bg-yellow-100'>
              <th className="border py-1">Item</th>
              <th className="border py-1">Descripción</th>
              <th className='border py-1'>N° Placa</th>
              <th className="border py-1">Serial</th>
              <th className="border py-1">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map(item => (
                <tr key={item._id}>
                  <td className="border text-center">{item.nombre}</td>
                  <td className="border text-center">{item.descripcion}</td>
                  <td className='border uppercase text-center'>{item.placa}</td>
                  <td className='border uppercase text-center'>{item.serial}</td>
                  <td className="border text-center">1</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </article>

    </section>

  )
}
