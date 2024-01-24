import { DeleteIcon } from './Icons'

export function ItemsAgregados ({ id, items, handleRemoveItem }) {
  const item = items?.find(item => item.Id === id)
  const { Id, Nombre, Placa } = item || {}
  return (
    <article key={Id} className="grid grid-cols-3 place-items-center p-2 rounded-md bg-orange-300 border">
      <p>{ Nombre === undefined ? item.Numero : Nombre }</p>
      <p>{Placa === undefined ? item.Serial.slice(-6) : Placa}</p>
      <button onClick={() => handleRemoveItem(id)} className="hover:bg-red-400 rounded-full p-1 hover:text-white">
        <DeleteIcon />
      </button>
    </article>
  )
}
