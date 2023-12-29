import { useState } from "react"
import { AddIcon, DeleteIcon } from '../components/Icons.jsx'
import axios from "axios"

export function CrearMovimiento() {
  const [bodegaOrigen, setBodegaOrigen] = useState(null)
  const [bodegaDestino, setBodegaDestino] = useState(null)
  const [search2, setSearch2] = useState('')
  const [search, setSearch] = useState('')

  const [encargado, setEncargado] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [incidente, setIncidente] = useState('')
  const [filtro, setFiltro] = useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [items, setItems] = useState([])

  const handleAddItem = (id) => {
    setItems(prevItems => {
      if (!prevItems.includes(id)) {
        return [...prevItems, id];
      } else {
        return prevItems;
      }
    })
  }

  const handleRemoveItem = (id) => {
    setItems(prevItems => {
      return prevItems.filter(item => item !== id);
    });
  }


  // eslint-disable-next-line react/prop-types
  function ItemsAgregados({ id }) {
    const item = bodegaOrigen?.items.find(item => item._id === id);
    return (
      <main key={item._id} className="grid grid-cols-2 place-items-center mb-2 p-2 rounded-md bg-yellow-500">
        <p>{item?.placa}</p>
        <button onClick={() => handleRemoveItem(id)} className="hover:bg-red-400 rounded-full p-1 hover:text-white">
          <DeleteIcon />
        </button>
      </main>
    );
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
      itemsIds: items,
      encargado,
      descripcion,
      incidente
    })
      .then(res => {
        setMessage(res.data.message)
        // resetea los estados
        setBodegaOrigen(null)
        setBodegaDestino(null)
        setSearch('')
        setSearch2('')
        setItems([])
        setEncargado('')
        setDescripcion('')
        setIncidente('')
        setTimeout(() => {
          setMessage('')
        }, 4000)
      })
      .catch(err => setError(err.response.data.error))
  }

  const filteredItems = bodegaOrigen?.items.filter(item =>
    item.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    item.placa.toLowerCase().includes(filtro.toLowerCase()) ||
    item.serial.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <main className="w-full bg-yellow-100">

      <section className="grid grid-cols-3 bg-blue-200 place-items-center py-4">

        <form className="p-2 bg-blue-400 rounded-lg flex flex-col gap-2 text-center col-span-2" onSubmit={searchBodegaOrigen}>
          <h3 className="font-semibold">Bodega De Origen</h3>
          <input type="text" value={search} onChange={ev => setSearch(ev.target.value)}
            placeholder="40001 | 34545"
            className="bg-slate-100 w-64 p-2 rounded-md" />
          <button className="bg-green-300 rounded-md p-2 hover:bg-white">Buscar Sucursal</button>
        </form>

        <form className="p-2 bg-blue-400 rounded-lg flex flex-col gap-2 text-center col-span-1" onSubmit={searchBodegaDestino}>
          <h3 className="font-semibold">Bodega De Destino</h3>
          <input type="text" value={search2} onChange={ev => setSearch2(ev.target.value)}
            placeholder="40001 | 34545"
            className="bg-slate-100 w-64 p-2 rounded-md" />
          <button className="bg-green-300 rounded-md p-2 hover:bg-white">Buscar Sucursal</button>
        </form>
      </section>

      <section className="grid grid-cols-3 p-2 bg-red-100 gap-6">

        <article className="col-span-2">

          <header className="w-full rounded-md p-2 bg-slate-600 text-white grid grid-cols-3 place-items-center mb-2">
            <h3> <span className="font-bold">Nombre:</span>  {bodegaOrigen?.nombre}</h3>
            <p> <span className="font-bold">Direccion:</span>  {bodegaOrigen?.direccion}</p>
            <p> <span className="font-bold">Sucursal:</span>  {bodegaOrigen?.sucursal}</p>
          </header>

          <section className="grid grid-cols-2 w-full place-items-center gap-6 bg-yellow-400 rounded-md px-4 py-2 mb-2">
            <p><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
            <input type="text" placeholder="Buscar Items..." className="bg-slate-100 w-64 rounded-md p-1" value={filtro} onChange={ev => setFiltro(ev.target.value)} />
          </section>

          <section className="grid grid-cols-4 w-full place-items-center p-2 bg-slate-500 rounded-md mb-2">
            <p className="font-semibold">Nombre Item</p>
            <p className="font-semibold">Placa</p>
            <p className="font-semibold">Serial</p>
            <p className="font-semibold">Agregar</p>
          </section>

          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {
              bodegaOrigen && (
                filteredItems.map(p => (
                  <section key={p._id} className="w-full grid grid-cols-4 p-2 bg-blue-300 rounded-md mb-2 place-items-center">
                    <p>{p.nombre}</p>
                    <p>{p.placa}</p>
                    <p>{p.serial}</p>
                    <button
                      onClick={() => handleAddItem(p._id)}
                      className={items.includes(p._id) ? 'added' : ''}
                    >
                      <AddIcon />
                    </button>
                  </section>
                ))
              )
            }
          </div>

          <section>
            <form className="grid grid-cols-2">
              <div>

              </div>
              <input type="text" className="w-full p-2 rounded-md" value={encargado} onChange={ev => setEncargado(ev.target.value)}
                placeholder="Persona Responsable Del Movimiento" />

              <input type="text" className="w-full p-2 rounded-md" value={descripcion} onChange={ev => setDescripcion(ev.target.value)}
                placeholder="Observaciones" />

              <input type="text" className="w-full p-2 rounded-md" value={incidente} onChange={ev => setIncidente(ev.target.value)}
                placeholder="N° Incidente" />
            </form>
          </section>

          <button className="p-2 w-44 bg-green-400 rounded-md" onClick={handleClick}>
            Hacer Traslado
          </button>

        </article>

        <article className="">
          <header>
            <h3> <span className="font-semibold">Nombre:</span>  {bodegaDestino?.nombre}</h3>
            <p> <span className="font-semibold">Sucursal:</span>  {bodegaDestino?.sucursal}</p>
            <p> <span className="font-semibold">Direccion:</span>  {bodegaDestino?.direccion}</p>
          </header>
          <main className="">
            <h2 className="text-center py-2 font-semibold bg-green-400 mb-2 rounded-md">Items Que Ingresarán :</h2>
            {
              bodegaOrigen && (
                items?.map((item, index) => (
                  <ItemsAgregados id={item} key={index} />
                ))
              )
            }
          </main>
        </article>
      </section>
    </main>
  )
}