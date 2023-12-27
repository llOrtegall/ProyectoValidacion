import { CloseIcon } from '../components/Icons.jsx'

// eslint-disable-next-line react/prop-types
export function ItemsInBodega({ bodega, fun }) {
  const restartActive = fun

  return (
    <article className="border-r border-b border-l px-4 border-gray-400 rounded-md">
      <section className="grid grid-cols-4 border-b-2 font-semibold border-gray-400 py-2 relative">
        <p>Nombre Item</p>
        <p>Descripción</p>
        <p>Placa</p>
        <p>Serial</p>
        <button className='right-0 top-2 absolute hover:bg-red-500 rounded-full hover:text-white' onClick={restartActive}>
          <CloseIcon />
        </button>
      </section>
      <section>

        {bodega.items.map(item => (
          <div key={item._id} className="grid grid-cols-4">
            <p>{item.nombre}</p>
            <p>{item.descripcion}</p>
            <p>{item.placa}</p>
            <p>{item.serial}</p>
          </div>
        ))}
      </section>
    </article>
  )
}