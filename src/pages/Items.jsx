import axios from "axios"
import { useEffect, useState } from "react"
import { RenderBodega } from '../components/RenderBodega.jsx'

export function Items() {

  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get('/getItems')
      .then(res => {
        setItems(res.data)
      })
      .catch(err => console.log(err))
  }, [])



  return (
    <main className="bg-gray-300 p-2">
      <section className="flex flex-col gap-2">
        <article className="grid grid-cols-6 text-center mb-2 bg-green-300 p-4 shadow-md rounded-md gap-2">
          <p className="text-lg font-semibold">Items</p>
          <p className="text-lg font-semibold">Descripción</p>
          <p className="text-lg font-semibold">Serial</p>
          <p className="text-lg font-semibold">Placa</p>
          <p className="text-lg font-semibold">Estado</p>
          <p className="text-lg font-semibold">Ubicación</p>
        </article>
      </section>
      <section className="flex flex-col gap-2">
        {items.map(item => (
          <article key={item._id} className="grid grid-cols-6 text-center p-4 shadow-md rounded-md gap-2 bg-white">
            <p className="font-semibold">{item.nombre}</p>
            <p className="text-gray-500 ">{item.descripcion}</p>
            <p className="text-gray-500 ">{item.serial}</p>
            <p className="text-gray-700 ">{item.placa}</p>
            <p className="text-gray-500 ">{item.estado}</p>
            <RenderBodega id={item._id} />
          </article>
        ))}
      </section>
    </main>
  )
}