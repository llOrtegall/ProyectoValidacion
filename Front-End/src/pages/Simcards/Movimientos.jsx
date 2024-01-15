import { MessageDisplay } from '../../components/MessageDisplay.jsx'
import { SimcardAgregadas } from '../../components/SimcardsAgregadas.jsx'
import { useFilterSimcards } from '../../hooks/useFilters.js'
import { useCarSimcards } from '../../hooks/useCartItems.js'
import { AddIcon } from '../../components/Icons.jsx'
import { useState } from 'react'
import axios from 'axios'

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

  const { cartSims, handleAddSimcard, handleRemoveItem, setCartSims } = useCarSimcards()
  const { filteredSimcards, searchSimcard, setSearchSimcard } = useFilterSimcards(simCards)

  const handleClick = () => {
    if (!bodegaOrigen || !bodegaDestino) {
      setTimeout(() => {
        setMessage('')
        setError('')
      }, 4000)
      return setError('Debe Ingresar Una Bodega De Origen y Una De Destino')
    }

    axios.post('/moveItem', {
      bodegaOrigen: bodegaOrigen._id,
      bodegaDestino: bodegaDestino._id,
      itemsIds: cartSims,
      encargado,
      descripcion,
      incidente
    })
      .then(res => {
        setMessage(res.data.message)
        // resetea los estados
        setBodegaOrigen(null)
        setBodegaDestino(null)
        setCartSims([])
        setEncargado('')
        setDescripcion('')
        setIncidente('')
        setTimeout(() => {
          setMessage('')
          setError('')
        }, 4000)
      })
      .catch(err => {
        setError(err.response.data.error)
        setTimeout(() => {
          setMessage('')
          setError('')
        }, 4000)
      })
  }

  return (
    <main className="w-full min-h-[93vh]">

      <section className="grid grid-cols-4 py-4 w-full gap-4 p-2">

        <form className="w-full p-2 bg-gray-600 rounded-lg flex items-center gap-2 text-center col-span-2 place-content-center" onSubmit={searchOrigen}>
          <h3 className="font-semibold text-white">Bodega # 1</h3>
          <input type="text" value={searchBodegaOrigen} onChange={ev => setSearchBodegaOrigen(ev.target.value)}
            placeholder="40001 | 34545"
            className="bg-slate-100 w-64 p-2 rounded-md" />
          <button className="bg-green-600 text-white rounded-md p-2 font-semibold hover:bg-white hover:text-black">Buscar Sucursal</button>
        </form>

        <form className="w-full p-2 bg-gray-600 rounded-lg flex items-center gap-2 text-center col-span-2 place-content-center" onSubmit={searchDestino}>
          <h3 className="font-semibold text-white">Bodega # 2</h3>
          <input type="text" value={searchBodegaDestino} onChange={ev => setSearchBodegaDestino(ev.target.value)}
            placeholder="40001 | 34545"
            className="bg-slate-100 w-64 p-2 rounded-md" />
          <button className="bg-green-600 text-white rounded-md p-2 font-semibold hover:bg-white hover:text-black">Buscar Sucursal</button>
        </form>

      </section>

      <section className="grid grid-cols-4 p-2 gap-6">

        <article className="col-span-2">

          <header className="w-full rounded-md p-2 bg-slate-600 text-white grid grid-cols-3 place-items-center mb-2">
            <h3> <span className="font-bold">Nombre:</span>  {bodegaOrigen?.nombre}</h3>
            <p> <span className="font-bold">Direccion:</span>  {bodegaOrigen?.direccion}</p>
            <p> <span className="font-bold">Sucursal:</span>  {bodegaOrigen?.sucursal}</p>
          </header>

          <section className="grid grid-cols-2 w-full place-items-center gap-6 bg-slate-600 text-white rounded-md px-4 py-2 mb-2">
            <p><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
            <input type="text" placeholder="Buscar Items..." className="bg-slate-100 w-64 rounded-md p-1 text-black"
              value={searchSimcard} onChange={ev => setSearchSimcard(ev.target.value)} />
          </section>

          <section className="grid grid-cols-4 w-full place-items-center p-2 bg-slate-600 rounded-md mb-2 text-white">
            <p className="font-semibold">Número</p>
            <p className="font-semibold">Operador</p>
            <p className="font-semibold">Serial</p>
            <p className="font-semibold">Agregar</p>
          </section>

          <section style={{ maxHeight: '330px', overflowY: 'auto' }} className='mb-2'>
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

          <footer className="py-4 bg-slate-600 rounded-md text-white">
            <form className="grid grid-cols-2 gap-3">
              <label className="flex h-10 items-center ml-3"> <span className="font-semibold w-32">Encargado:</span>
                <input type="text" className="w-full p-2 rounded-md col-span-1 bg-slate-100 no-underline text-black" readOnly
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

        </article>

        <article className='col-span-2'>
          <header className='bg-slate-600 mb-2 rounded-md p-3 text-white grid place-content-center'>
            <h3> <span className="font-bold">Nombre:</span>  {bodegaDestino?.nombre}</h3>
            <p> <span className="font-bold">Direccion:</span>  {bodegaDestino?.direccion}</p>
            <p> <span className="font-bold">N° Sucursal:</span>  {bodegaDestino?.sucursal}</p>
          </header>
          <main>
            <h2 className="text-center py-2 font-semibold bg-slate-600 mb-2 rounded-md text-white">Items Que Ingresarán :</h2>
            <section style={{ maxHeight: '450px', overflowY: 'auto' }}>
              {
                cartSims && (
                  cartSims?.map(sim => (
                    <SimcardAgregadas id={sim} key={sim} simcards={bodegaOrigen.simcards} handleRemoveItem={handleRemoveItem} />
                  ))
                )
              }
            </section>

          </main>
        </article>
      </section>

      <MessageDisplay message={message} error={error} />
    </main>
  )
}
