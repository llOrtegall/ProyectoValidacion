import { formatFecha } from '../../utils/funtions.js'
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

  const { simcards, bodegaDestino, bodegaOrigen, encargado, fecha, incidente, movimientoId, items, descripcion } = movimiento

  return (

    movimiento &&
    <main className='flex flex-col gap-4 h-[93vh] px-2'>
      <article className='border bg-slate-200 mt-4'>
        <section className='border-t border-l border-r border-black'>
          <h1 className="text-lg text-center bg-gradient-to-b from-cyan-200 to-blue-300 p-1 font-semibold">Movimiento:
            <span className='font-semibold pl-2'>{movimientoId}</span>
          </h1>
        </section>

        <section className='grid grid-cols-2 px-4 py-2 border border-black '>
          <p className="text-blue-800 font-medium">Fecha: <span className='font-semibold text-black'>{formatFecha(fecha)}</span></p>
          <p className="text-blue-800 font-medium">Nombre Bodega Origen: <span className='font-semibold text-black'>{bodegaOrigen.nombre}</span></p>
          <p className="text-blue-800 font-medium">Encargado: <span className='font-semibold text-black'>{encargado}</span></p>
          <p className="text-blue-800 font-medium">Sucursal Origen: <span className='font-semibold text-black'>{bodegaOrigen.sucursal}</span> </p>
          <p className="text-blue-800 font-medium">Incidente: <span className='font-semibold text-black'>{incidente}</span></p>
          <p className="text-blue-800 font-medium">Nombre Bodega Destino: <span className='font-semibold text-black'>{bodegaDestino.nombre}</span> </p>
          <p className="text-blue-800 font-medium">Cantidad De Items Movidos: <span className='font-semibold text-black'>{items.length}</span> </p>
          <p className="text-blue-800 font-medium">Sucursal Destino: <span className='font-semibold text-black'>{bodegaDestino.sucursal}</span> </p>
          <p className="text-blue-800 font-medium">Cantidad De Simcards Movidas: <span className='font-semibold text-black'>{simcards.entran.length + simcards.salen.length}</span> </p>
        </section>
      </article>

      <section className='border border-black h-auto '>
        <header>
          <h3 className='p-1 bg-yellow-200 border-black text-center font-medium border-b'>Motivo / Descripción Movimiento</h3>
        </header>
        <p className='py-2 pl-1 bg-slate-200'>{descripcion}</p>
      </section>

      <article className='w-full flex flex-col gap-2 '>
        <table className="table-auto w-full bg-slate-200">
          <thead >
            <tr className='bg-yellow-200'>
              <th className="border py-1">Item</th>
              <th className="border py-1">Descripción</th>
              <th className='border py-1'>N° Placa</th>
              <th className="border py-1">Serial</th>
              <th className="border py-1">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {
              items.length > 0
                ? items.map(item => (
                  <tr key={item._id}>
                    <td className="border text-center">{item.nombre}</td>
                    <td className="border text-center">{item.descripcion}</td>
                    <td className='border uppercase text-center'>{item.placa}</td>
                    <td className='border uppercase text-center'>{item.serial}</td>
                    <td className="border text-center">1</td>
                  </tr>
                ))
                : <tr><td colSpan='5' className='text-center'>No Se Realizaron Movimientos De Items</td></tr>
            }
          </tbody>
        </table>
      </article>

      <article className='w-full flex flex-col gap-2 bg-slate-200'>
        <table className="table-auto w-full ">
          <thead >
            <tr className='bg-yellow-200'>
            <th className="border py-1">N°</th>
              <th className="border py-1">Número</th>
              <th className="border py-1">Operador</th>
              <th className="border py-1">Serial</th>
              <th className="border py-1">Estado</th>
              <th className="border py-1">Movimiento</th>
            </tr>
          </thead>
          <tbody>
            {
              simcards.entran.length > 0
                ? simcards.entran.map((sim, index) => (
                  <tr key={sim._id} className='bg-green-200'>
                    <td className="border text-center">{index + 1}</td>
                    <td className="border text-center">{sim.numero}</td>
                    <td className="border text-center">{sim.operador}</td>
                    <td className='border text-center'>{sim.estado}</td>
                    <td className='border uppercase text-center'>{sim.serial}</td>
                    <td className='border text-center'>Entran</td>
                  </tr>
                ))
                : <tr><td colSpan='5' className='text-center'>No Se Realizaron Entrada De Simcards</td></tr>
            }

            {
              simcards.salen.length > 0
                ? simcards.salen.map((sim, index) => (
                  <tr key={sim._id} className='bg-red-200'>
                    <td className="border text-center">{index + 1}</td>
                    <td className="border text-center">{sim.numero}</td>
                    <td className="border text-center">{sim.operador}</td>
                    <td className='border text-center'>{sim.estado}</td>
                    <td className='border uppercase text-center'>{sim.serial}</td>
                    <td className='border text-center'>Salen</td>
                  </tr>))
                : <tr><td colSpan='5' className='text-center'>No Se Realizó Salida De Simcards</td></tr>
            }
          </tbody>
        </table>
      </article>

    </main>

  )
}
