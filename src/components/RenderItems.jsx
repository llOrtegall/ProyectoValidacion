import { LockIcon } from './Icons.jsx'

export const RenderItems = ({ rol, handleClick, filteredItems }) => {
  return (

    <section>
      <article className='flex justify-around text-center bg-blue-500 uppercase text-sm shadow-lg py-2'>
        <p className="font-semibold">Items</p>
        <p className="font-semibold">Descripción</p>
        <p className="font-semibold">Serial</p>
        <p className="font-semibold">Placa</p>
        <p className="font-semibold">Estado</p>
        <p className="font-semibold">Ubicación</p>
        <p className='font-semibold'>Sucursal</p>
        <p className="font-semibold">Acciones</p>
      </article>
      <article>
        {filteredItems && filteredItems.map(item => (
          <article key={item.Id}
            className='grid grid-cols-8 shadow-md bg-slate-200 uppercase text-sm py-2 my-2 text-center  place-items-center'>
            <p className="font-semibold">{item.Nombre}</p>
            <p className="text-gray-500">{item.Descripcion}</p>
            <p className="text-gray-500">{item.Serial}</p>
            <p className="text-gray-700">{item.Placa}</p>
            <p className="text-gray-500">{item.Estado}</p>
            <p className='text-gray-500'>{item.Bodega !== undefined ? item.Bodega : 'No Asignado'}</p>
            <p className='text-gray-500'>{item.Bodega !== undefined ? item.Sucursal : 'No Asignado'}</p>
            {
              rol === 'Administrador' || rol === 'Aux Administrativa'
                ? <button onClick={() => handleClick(item)} className='bg-green-500 w-28 p-1 rounded-md font-semibold hover:bg-green-400 hover:text-white'>Editar Item</button>
                : <figure className='text-red-500'><LockIcon /></figure>
            }
          </article>
        ))
        }
      </article>
    </section>

  )
}
