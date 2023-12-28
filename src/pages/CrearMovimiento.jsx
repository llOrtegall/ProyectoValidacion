import { useState } from "react"
import axios from "axios"

export function CrearMovimiento() {
  const [bodegaOrigen, setBodegaOrigen] = useState(null)
  const [bodegaDestino, setBodegaDestino] = useState(null)
  const [search2, setSearch2] = useState('')
  const [search, setSearch] = useState('')

  const [items, setItems] = useState([])

  const handleAddItem = (ev) => {
    setItems([...items, ev])
  }

  const searchBodegaOrigen = (ev) => {
    ev.preventDefault()

    axios.get(`/getBodega/${search}`)
      .then(response => {
        setBodegaOrigen(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const searchBodegaDestino = (ev) => {
    ev.preventDefault()

    axios.get(`/getBodega/${search2}`)
      .then(response => {
        setBodegaDestino(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleClick = () => {
    axios.post('/moveItem', {
      bodegaOrigen: bodegaOrigen._id,
      bodegaDestino: bodegaDestino._id,
      itemsIds: items
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  return (
    <main className="w-full bg-yellow-100">

      <section className="grid grid-cols-2 bg-blue-200 place-items-center py-4">

        <form className="p-2 bg-blue-400 rounded-lg flex flex-col gap-2 text-center" onSubmit={searchBodegaOrigen}>
          <h3 className="font-semibold">Bodega De Origen</h3>
          <input type="text" value={search} onChange={ev => setSearch(ev.target.value)}
            placeholder="40001 | 34545"
            className="bg-slate-100 w-64 p-2 rounded-md" />
          <button className="bg-green-300 rounded-md p-2 hover:bg-white">Buscar Sucursal</button>
        </form>

        <form className="p-2 bg-blue-400 rounded-lg flex flex-col gap-2 text-center" onSubmit={searchBodegaDestino}>
          <h3 className="font-semibold">Bodega De Destino</h3>
          <input type="text" value={search2} onChange={ev => setSearch2(ev.target.value)}
            placeholder="40001 | 34545"
            className="bg-slate-100 w-64 p-2 rounded-md" />
          <button className="bg-green-300 rounded-md p-2 hover:bg-white">Buscar Sucursal</button>
        </form>
      </section>

      <section className="grid grid-cols-2 p-2 bg-red-100">

        <article className="">
          <header className="rounded-md p-2 bg-slate-600 text-white grid grid-cols-3 place-items-center">
            <h3> <span className="font-bold">Nombre:</span>  {bodegaOrigen?.nombre}</h3>
            <p> <span className="font-bold">Direccion:</span>  {bodegaOrigen?.direccion}</p>
            <p> <span className="font-bold">Sucursal:</span>  {bodegaOrigen?.sucursal}</p>
          </header>

          <section className="flex items-center justify-center gap-6 bg-yellow-400 rounded-md px-4 py-2 mb-2">
            <p><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
            <input type="text" placeholder="Buscar Items..." className="bg-slate-100 w-64 rounded-md p-1" />
          </section>

          <section className="grid grid-cols-3">
            <p className="font-semibold">Nombre Item</p>
            <p className="font-semibold">Placa</p>
            <p className="font-semibold">Agregar</p>
          </section>

          {bodegaOrigen?.items.map(producto => (
            <section key={producto._id} className="grid grid-cols-3">
              <p>{producto.nombre}</p>
              <p>{producto.placa}</p>
              <button value={producto._id} onClick={ev => handleAddItem(ev.target.value)}> + </button>
            </section>
          ))}

          <button className="p-2 bg-green-400 rounded-md" onClick={handleClick}>
            Hacer Traslado
          </button>

        </article>

        <article>
          <h3> <span className="font-semibold">Nombre:</span>  {bodegaDestino?.nombre}</h3>
          <p> <span className="font-semibold">Sucursal:</span>  {bodegaDestino?.sucursal}</p>
          <p> <span className="font-semibold">Direccion:</span>  {bodegaDestino?.direccion}</p>
        </article>
      </section>
    </main>
  )
}