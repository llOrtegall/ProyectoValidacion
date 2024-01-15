import { DeleteIcon } from './Icons'

// eslint-disable-next-line react/prop-types
export function SimcardAgregadas ({ id, simcards, handleRemoveItem }) {
  // eslint-disable-next-line react/prop-types
  const simcard = simcards?.find(sim => sim._id === id)
  const { _id, numero, serial } = simcard || {}
  return (
    <>
      <p className='grid grid-cols-3 place-items-center bg-green-400 text-black font-semibold'><span>Número</span> <span>Serial</span> <span> - </span></p>
      <main key={_id} className="grid grid-cols-3 place-items-center p-1 bg-green-400 text-black my-1 rounded-lg">
        <p>{numero === undefined ? simcard.numero : numero}</p>
        <p>{serial === undefined ? simcard.serial.slice(-6) : serial}</p>
        <button onClick={() => handleRemoveItem(id)} className="hover:bg-red-400 rounded-full p-1 hover:text-white">
          <DeleteIcon />
        </button>
      </main>
    </>

  )
}

// eslint-disable-next-line react/prop-types
export function SimcardRetiradas ({ id, simcards, handleRemoveItem }) {
  // eslint-disable-next-line react/prop-types
  const simcard = simcards?.find(sim => sim._id === id)
  const { _id, numero, serial } = simcard || {}
  return (
    <>
      <p className='grid grid-cols-3 place-items-center bg-red-400 text-black font-semibold'><span>Número</span> <span>Serial</span> <span> - </span></p>
      <main key={_id} className="grid grid-cols-3 place-items-center p-1 bg-red-400 text-black my-1 rounded-lg">
        <p>{numero === undefined ? simcard.numero : numero}</p>
        <p>{serial === undefined ? simcard.serial.slice(-6) : serial}</p>
        <button onClick={() => handleRemoveItem(id)} className="hover:bg-red-400 rounded-full p-1 hover:text-white">
          <DeleteIcon />
        </button>
      </main>
    </>

  )
}
