import axios from 'axios'
import { useState, useEffect, useMemo } from 'react'

function User ({ user, fun }) {
  const handleClick = (user) => {
    fun(user)
  }

  if (user.Estado === 'Si Existe') {
    return (
      <section className='flex justify-center'>
        <div className='w-full p-2 border bg-green-400'>Registrado</div>
        <div className='w-full p-2 border bg-green-400'>User Ok</div>
      </section>
    )
  } else {
    return (
      <section className='flex justify-center'>
        <div className='w-full p-2 border bg-red-400'>No Registrado</div>
        <div className='w-full p-2 border bg-yellow-400 hover:cursor-pointer hover:bg-blue-400' onClick={() => handleClick(user)}>Opc Usuario</div>
      </section>
    )
  }
}

export function ValidacionUsers ({ users, fun }) {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  const handleClick = fun

  const ccs = useMemo(() => users.map(user => user.cedula), [users])

  useEffect(() => {
    axios.post('/getCF', { ccs })
      .then(response => setData(response.data))
      .catch(error => {
        console.error(error)
        setError('Hubo un error al obtener los datos.')
      })
  }, [ccs])

  if (error) {
    return <div>Error: {error}</div>
  }
  return (
    <section className='w-1/3 md:text-xs xl:text-base'>
      <div className='flex justify-around p-2 bg-indigo-600 border text-white font-bold'>
        <h3 className='text-center'>User Cliente Fiel</h3>
        <h3 className='text-center'>Opciones Usuario</h3>
      </div>
      <div className='flex flex-col w-full h-auto text-center'>
        {data.map((user, index) => (
          <User key={index} user={user} fun={handleClick} />
        ))}
      </div>
    </section>
  )
}
