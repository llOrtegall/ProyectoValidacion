import { DeleteIcon } from './Icons'

// eslint-disable-next-line react/prop-types
export function SimcardAgregada ({ id, simcards, handleRemoveItem, color }) {
  // eslint-disable-next-line react/prop-types
  const simcard = simcards?.find(sim => sim._id === id)
  const { _id, numero, serial } = simcard || {}
  return (
    <>
      <main key={_id} className={`grid grid-cols-3 place-items-center p-1 bg-${color}-400 text-black my-1 rounded-lg`}>
        <p>{numero === undefined ? simcard.numero : numero}</p>
        <p>{serial === undefined ? simcard.serial.slice(-6) : serial}</p>
        <button onClick={() => handleRemoveItem(id)} className={`hover:bg-${color}-400 rounded-full p-1 hover:text-white`}>
          <DeleteIcon />
        </button>
      </main>
    </>
  )
}
