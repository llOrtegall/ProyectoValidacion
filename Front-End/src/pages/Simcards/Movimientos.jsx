import { useCarSimcards, useCarSimcards2 } from '../../hooks/useCartItems.js'
import { MessageDisplay } from '../../components/MessageDisplay.jsx'
import { useState } from 'react'
import axios from 'axios'

import { ComponenteSimcards } from '../../components/ComponenteSimcards.jsx'
import { RenderBodegaOrigen } from '../../components/RenderBodegaOrigen.jsx'
import { RenderBodegaDestino } from '../../components/RenderBodegaDestino.jsx'
import { FooterMovSim } from '../../components/FooterCompSimcaMov.jsx'

export function Movimientos () {
  const [bodegaDestino, setBodegaDestino] = useState(null)
  const [bodegaOrigen, setBodegaOrigen] = useState(null)

  const [descripcion, setDescripcion] = useState('')
  const [encargado, setEncargado] = useState('')
  const [incidente, setIncidente] = useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const { cartSims, setCartSims, handleAddSimcard, handleRemoveItem } = useCarSimcards()
  const { cartSims2, setCartSims2, handleAddSimcard2, handleRemoveItem2 } = useCarSimcards2()

  const handleClick = () => {
    if (!bodegaOrigen || !bodegaDestino) {
      setTimeout(() => {
        setMessage('')
        setError('')
      }, 4000)
      return setError('Debe Ingresar Una Bodega De Origen y Una De Destino')
    }
    axios.post('/moveSimcard', {
      bodegas: { bodegaOrigen: bodegaOrigen._id, bodegaDestino: bodegaDestino._id },
      simsIds: { entran: cartSims, salen: cartSims2 },
      encargado,
      descripcion,
      incidente
    })
      .then(res => {
        setMessage(res.data.message); setBodegaOrigen(null); setBodegaDestino(null); setCartSims([])
        setCartSims2([]); setEncargado(''); setDescripcion(''); setIncidente(''); setTimeout(() => { setMessage(''); setError('') }, 4000)
      })
      .catch(err => {
        setError(err.response.data.error)
        setTimeout(() => { setMessage(''); setError('') }, 4000)
      })
  }

  return (
    <main className="w-full min-h-[93vh] bg-slate-300">

      <section className="grid grid-cols-4 p-2 gap-2">
        {/* //*: Renderizado Bodega Origen */}
        <RenderBodegaOrigen bodegaOrigen={bodegaOrigen} setBodegaOrigen={setBodegaOrigen} cartSims={cartSims} handleAddSimcard={handleAddSimcard}/>
        {/* //*: Renderizado Bodega Destino */}
        <RenderBodegaDestino bodegaDestino={bodegaDestino} setBodegaDestino={setBodegaDestino} cartSims2={cartSims2} handleAddSimcard2={handleAddSimcard2}/>
      </section>

      {/* //* Renderizado Movimiento */}
      <article className='mx-2 rounded-md'>
        <ComponenteSimcards bodegaOrigen={bodegaOrigen} bodegaDestino={bodegaDestino} cartSims={cartSims}
          cartSims2={cartSims2} handleRemoveItem={handleRemoveItem} handleRemoveItem2={handleRemoveItem2}/>
      </article>

      <FooterMovSim encargado={encargado} setEncargado={setEncargado} incidente={incidente} setIncidente={setIncidente} descripcion={descripcion} setDescripcion={setDescripcion}/>

      <section className="flex w-full justify-center mt-4">
        <button className="p-2 text-white font-bold w-48 bg-green-600 rounded-md hover:bg-white  hover:text-black" onClick={handleClick}>
          Realizar Movimiento
        </button>
      </section>

      <MessageDisplay message={message} error={error} />
    </main>
  )
}
