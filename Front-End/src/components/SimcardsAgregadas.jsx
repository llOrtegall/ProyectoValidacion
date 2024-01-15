import { DeleteIcon } from './Icons'

// eslint-disable-next-line react/prop-types
export function SimcardAgregadas ({ id, simcards, handleRemoveItem }) {
  console.log(id)
  console.log(simcards)
  // eslint-disable-next-line react/prop-types
  const simcard = simcards?.find(sim => sim._id === id)
  const { _id, numero, serial } = simcard || {}
  return (
    <main key={_id} className="grid grid-cols-3 place-items-center mb-2 p-2 rounded-md bg-green-300 border">
      <p>{ numero === undefined ? simcard.numero : numero }</p>
      <p>{serial === undefined ? simcard.serial.slice(-6) : serial}</p>
      <button onClick={() => handleRemoveItem(id)} className="hover:bg-red-400 rounded-full p-1 hover:text-white">
        <DeleteIcon />
      </button>
    </main>
  )
}

// eslint-disable-next-line react/prop-types
export function SimcardRetiradas ({ id, simcards, handleRemoveItem }) {
  console.log(id)
  console.log(simcards)
  // eslint-disable-next-line react/prop-types
  const simcard = simcards?.find(sim => sim._id === id)
  const { _id, numero, serial } = simcard || {}
  return (
    <main key={_id} className="grid grid-cols-3 place-items-center mb-2 p-2 rounded-md bg-red-300 border">
      <p>{ numero === undefined ? simcard.numero : numero }</p>
      <p>{serial === undefined ? simcard.serial.slice(-6) : serial}</p>
      <button onClick={() => handleRemoveItem(id)} className="hover:bg-red-400 rounded-full p-1 hover:text-white">
        <DeleteIcon />
      </button>
    </main>
  )
}
