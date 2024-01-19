import { DeleteIcon } from './Icons'

// eslint-disable-next-line react/prop-types
export function ItemsAgregados ({ id, items, handleRemoveItem }) {
  // eslint-disable-next-line react/prop-types
  const item = items?.find(item => item._id === id)
  const { _id, nombre, placa } = item || {}
  return (
    <main key={_id} className="grid grid-cols-3 place-items-center p-2 rounded-md bg-orange-300 border">
      <p>{ nombre === undefined ? item.numero : nombre }</p>
      <p>{placa === undefined ? item.serial.slice(-6) : placa}</p>
      <button onClick={() => handleRemoveItem(id)} className="hover:bg-red-400 rounded-full p-1 hover:text-white">
        <DeleteIcon />
      </button>
    </main>
  )
}
