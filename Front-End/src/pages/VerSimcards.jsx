import axios from 'axios'
import { useEffect, useState } from 'react'

export function VerSimcards () {
  const [simcards, setSimcards] = useState([])

  useEffect(() => {
    axios.get('/simcard')
      .then((res) => {
        setSimcards(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='mx-2'>
      <article className='grid grid-cols-7 place-items-center bg-blue-400 p-1'>
        <h2>Numero</h2>
        <h2>Operador</h2>
        <h2>Estado</h2>
        <h2>Serial</h2>
        <h2>Apn</h2>
        <h2>User</h2>
        <h2>Pass</h2>
      </article>
      {simcards && simcards.map(simcard => (
        <article key={simcard._id} className='grid grid-cols-7 place-items-center bg-slate-400 p-1'>
          <h2>{simcard.numero}</h2>
          <p>{simcard.operador}</p>
          <p>{simcard.estado}</p>
          <p>{simcard.serial}</p>
          <p>{simcard.apn}</p>
          <p>{simcard.user}</p>
          <p>{simcard.pass}</p>
        </article>
      ))}
    </div>
  )
}
