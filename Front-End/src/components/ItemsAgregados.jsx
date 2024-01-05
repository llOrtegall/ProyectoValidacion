import { DeleteIcon } from './Icons'

// eslint-disable-next-line react/prop-types
export function ItemsAgregados ({ id, items, handleRemoveItem }) {
  // eslint-disable-next-line react/prop-types
  const item = items?.find(item => item._id === id)
  const { _id, nombre, placa } = item || {}
  return (
    <main key={_id} className="grid grid-cols-3 place-items-center mb-2 p-2 rounded-md bg-orange-300 border">
      <p>{nombre}</p>
      <p>{placa}</p>
      <button onClick={() => handleRemoveItem(id)} className="hover:bg-red-400 rounded-full p-1 hover:text-white">
        <DeleteIcon />
      </button>
    </main>
  )
}
