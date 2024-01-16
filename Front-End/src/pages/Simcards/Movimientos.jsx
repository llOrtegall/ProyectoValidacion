import { useFilterSimcards, useFilterSimcards2 } from '../../hooks/useFilters.js'
import { useCarSimcards, useCarSimcards2 } from '../../hooks/useCartItems.js'
import { MessageDisplay } from '../../components/MessageDisplay.jsx'
import { AddIcon, DeleteIcon2 } from '../../components/Icons.jsx'
import { useState } from 'react'
import axios from 'axios'
import { ComponenteSimcards } from '../../components/ComponenteSimcards.jsx'

export function Movimientos () {
  const [bodegaDestino, setBodegaDestino] = useState(null)
  const [bodegaOrigen, setBodegaOrigen] = useState(null)

  const [searchBodegaOrigen, setSearchBodegaOrigen] = useState('')
  const [searchBodegaDestino, setSearchBodegaDestino] = useState('')

  const [descripcion, setDescripcion] = useState('')
  const [encargado, setEncargado] = useState('')
  const [incidente, setIncidente] = useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const searchOrigen = (ev) => {
    ev.preventDefault()
    axios.get(`/getBodegaSimcards/${searchBodegaOrigen}`)
      .then(response => {
        setBodegaOrigen(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const searchDestino = (ev) => {
    ev.preventDefault()
    axios.get(`/getBodegaSimcards/${searchBodegaDestino}`)
      .then(response => {
        setBodegaDestino(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const simCards = bodegaOrigen?.simcards || []
  const simCards2 = bodegaDestino?.simcards || []

  const { cartSims, handleAddSimcard, setCartSims } = useCarSimcards()
  const { cartSims2, handleAddSimcard2, setCartSims2 } = useCarSimcards2()

  const { filteredSimcards, searchSimcard, setSearchSimcard } = useFilterSimcards(simCards)
  const { filteredSimcards2, searchSimcard2, setSearchSimcard2 } = useFilterSimcards2(simCards2)

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
        <article className="col-span-2 text-md flex flex-col gap-2">

          <form className="w-full p-1 bg-gray-600 rounded-lg flex items-center gap-2 text-center col-span-2 place-content-center"
            onSubmit={searchOrigen}>
            <h3 className="font-semibold text-white">Buscar Bodega Origen</h3>
            <input type="text" value={searchBodegaOrigen} onChange={ev => setSearchBodegaOrigen(ev.target.value)}
              placeholder="40001 | 34545"
              className="bg-slate-100 w-64 p-1 rounded-md " />
            <button className="bg-green-600 text-white rounded-md p-1 font-semibold hover:bg-white hover:text-black">Buscar Sucursal</button>
          </form>

          <header className="w-full flex justify-around rounded-md p-2 bg-slate-600 text-white place-items-center">
            <h3> <span className="font-bold">Nombre:</span>  {bodegaOrigen?.nombre}</h3>
            <p> <span className="font-bold">Direccion:</span>  {bodegaOrigen?.direccion}</p>
            <p> <span className="font-bold">Sucursal:</span>  {bodegaOrigen?.sucursal}</p>
          </header>

          <section className="grid grid-cols-2 w-full place-items-center gap-6 bg-slate-600 text-white rounded-md px-4 py-2">
            <p><span className="font-semibold pr-2">Filtrar:</span>| Número | Serial | Operador |</p>
            <input type="text" placeholder="Buscar Items..." className="bg-slate-100 w-64 rounded-md p-1 text-black"
              value={searchSimcard} onChange={ev => setSearchSimcard(ev.target.value)} />
          </section>

          <section className="grid grid-cols-4 w-full place-items-center p-2 bg-slate-600 rounded-md  text-white">
            <p className="font-semibold">Número</p>
            <p className="font-semibold">Operador</p>
            <p className="font-semibold">Serial</p>
            <p className="font-semibold">Agregar</p>
          </section>

          <section style={{ maxHeight: '330px', overflowY: 'auto' }} className=''>
            {
              bodegaOrigen && (
                filteredSimcards.map(item => (
                  <section key={item._id} className="w-full grid grid-cols-4 p-2 bg-blue-500 rounded-md mb-2 place-items-center text-white transition-colors hover:text-black hover:bg-slate-200 cursor-default">
                    <p>{item.numero}</p>
                    <p>{item.operador}</p>
                    <p>{item.serial}</p>
                    <button
                      onClick={() => handleAddSimcard(item._id)}
                      className={cartSims.includes(item._id) ? 'added' : 'rounded-full transition-colors hover:bg-green-300  hover:text-black'}
                    >
                      <AddIcon />
                    </button>
                  </section>
                ))
              )
            }
          </section>

        </article>

        {/* //*: Renderizado Bodega Destino */}
        <article className="col-span-2 text-md flex flex-col gap-2">

          <form className="w-full p-1 bg-gray-600 rounded-lg flex items-center gap-2 text-center col-span-2 place-content-center "
            onSubmit={searchDestino}>
            <h3 className="font-semibold text-white">Buscar Bodega Destino</h3>
            <input type="text" value={searchBodegaDestino} onChange={ev => setSearchBodegaDestino(ev.target.value)}
              placeholder="40001 | 34545"
              className="bg-slate-100 w-64 p-1 rounded-md " />
            <button className="bg-green-600 text-white rounded-md p-1 font-semibold hover:bg-white hover:text-black">Buscar Sucursal</button>
          </form>

          <header className="w-full flex justify-around rounded-md p-2 bg-slate-600 text-white place-items-center ">
            <h3> <span className='font-bold pr-2'>Nombre:</span>{bodegaDestino?.nombre}</h3>
            <p> <span className='font-bold pr-2'>Direccion:</span>{bodegaDestino?.direccion}</p>
            <p> <span className='font-bold pr-2'>Sucursal:</span>{bodegaDestino?.sucursal}</p>
          </header>

          <section className="grid grid-cols-2 w-full place-items-center gap-6 bg-slate-600 text-white rounded-md px-4 py-2 ">
            <p><span className="font-semibold pr-2">Filtrar:</span>| Número | Serial | Operador |</p>
            <input type="text" placeholder="Buscar Items..." className="bg-slate-100 w-64 rounded-md p-1 text-black"
              value={searchSimcard2} onChange={ev => setSearchSimcard2(ev.target.value)} />
          </section>

          <section className="grid grid-cols-4 w-full place-items-center p-2 bg-slate-600 rounded-md  text-white">
            <p className="font-semibold">Número</p>
            <p className="font-semibold">Operador</p>
            <p className="font-semibold">Serial</p>
            <p className="font-semibold">Agregar</p>
          </section>

          <section style={{ maxHeight: '330px', overflowY: 'auto' }} className=''>
            {
              bodegaDestino && (
                filteredSimcards2.map(item => (
                  <section key={item._id} className="w-full grid grid-cols-4 p-2 bg-blue-500 rounded-md mb-2 place-items-center text-white transition-colors hover:text-black hover:bg-slate-200 cursor-default">
                    <p>{item.numero}</p>
                    <p>{item.operador}</p>
                    <p>{item.serial}</p>
                    <button
                      onClick={() => handleAddSimcard2(item._id)}
                      className={cartSims2.includes(item._id) ? 'deleted' : 'rounded-full transition-colors hover:bg-red-300  hover:text-black'}
                    >
                      <DeleteIcon2 />
                    </button>
                  </section>
                ))
              )
            }
          </section>
        </article>
      </section>

      {/* //* Renderizado Movimiento */}
      <article className='mx-2 rounded-md'>
        <h1 className='text-xl font-semibold text-center py-1 rounded-t-md bg-blue-400'>Movimiento </h1>
        <header className='flex justify-around bg-yellow-100 p-1 text-black '>
          <h3> <span className="font-bold">Nombre:</span>  {bodegaDestino?.nombre}</h3>
          <p> <span className="font-bold">Direccion:</span>  {bodegaDestino?.direccion}</p>
          <p> <span className="font-bold">N° Sucursal:</span>  {bodegaDestino?.sucursal}</p>
        </header>

        <ComponenteSimcards />

      </article>

      <footer className="py-4 bg-slate-600 rounded-md text-white mx-2 mt-2">
        <form className="grid grid-cols-2 gap-3">
          <label className="flex h-10 items-center ml-3"> <span className="font-semibold w-32">Encargado:</span>
            <input type="text" className="w-full p-2 rounded-md col-span-1 bg-slate-100 no-underline text-black"
              value={encargado}
              onChange={ev => setEncargado(ev.target.value)}
              placeholder="Pepito Perez Muñoz" />
          </label>
          <label className="flex h-10 items-center"> <span className="font-semibold w-32">N° Incidente:</span>
            <input type="text" className="w-full p-2 rounded-md bg-slate-100 no-underline text-black"
              value={incidente}
              onChange={ev => setIncidente(ev.target.value)}
              placeholder="134564 | 234252 | 634532" />
          </label>
          <label className="col-span-3 mx-3"> <span className="font-semibold w-40">Observaciones:</span>
            <input type="text" className="w-full p-2 rounded-md bg-slate-100 no-underline text-black"
              value={descripcion}
              onChange={ev => setDescripcion(ev.target.value)}
              placeholder="texto para registrar observación ..." />
          </label>
        </form>
      </footer>

      <section className="flex w-full justify-center mt-4">
        <button className="p-2 text-white font-bold w-48 bg-green-600 rounded-md hover:bg-white  hover:text-black" onClick={handleClick}>
          Realizar Movimiento
        </button>
      </section>

      <MessageDisplay message={message} error={error} />
    </main>
  )
}
