import { CloseIcon } from './Icons.jsx'

// eslint-disable-next-line react/prop-types
export function ItemsInBodega ({ bodega, fun }) {
  const restartActive = fun

  return (
    <article className="border-r border-b border-l px-4 border-gray-400 rounded-md text-sm">
      <section className="grid grid-cols-4 border-b-2 font-semibold border-gray-400 py-2 relative uppercase">
        <p>Nombre Item</p>
        <p>Descripción</p>
        <p>Placa</p>
        <p>Serial</p>
        <button className='right-0 top-2 absolute hover:bg-red-500 rounded-full hover:text-white' onClick={restartActive}>
          <CloseIcon />
        </button>
      </section>

      <section style={{ height: '110px', overflow: 'auto' }}>
        {bodega.items.map(item => (
          <div key={item._id} className="grid grid-cols-4 gap-4">
            <p className='uppercase'>{item.nombre}</p>
            <p className='uppercase'>{item.descripcion}</p>
            <p>{item.placa}</p>
            <p>{item.serial}</p>
          </div>
        ))}
      </section>
    </article>
  )
}
