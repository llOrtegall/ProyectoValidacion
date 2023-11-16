import { useState, useEffect } from 'react'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
export function ValidarUsuario ({ user, onDatoDeValidacion }) {
  const [isValid, setIsValid] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleClick = (ev) => {
    const dato = ev.target.id
    onDatoDeValidacion(dato)
  }

  useEffect(() => {
    async function fetchData () {
      setIsLoading(true)
      try {
        const { data } = await axios.post('/getCF', { cc: user })
        setIsValid(data.Estado === 'Si Existe')
        setIsLoading(false)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsValid(false)
          setIsLoading(false)
        }
      }
    }
    fetchData()
  }, [user])

  return (
    isLoading
      ? (
        <>
          <td className='bg-blue-400'>Cargando...</td>
          <td className='bg-blue-400'>Cargando...</td>
        </>
        )
      : isValid
        ? (
          <>
            <td className='bg-green-400'>Si Existe</td>
            <td className='bg-green-400'>User Ok</td>
          </>
          )
        : (
          <>
            <td className='bg-red-400'>No Existe</td>
            <td
              className='bg-yellow-300 hover:cursor-pointer hover:bg-purple-400 hover:text-white'
              id={user} onClick={handleClick}
            >
              Opc Usuario
            </td>
          </>
          )
  )
}
