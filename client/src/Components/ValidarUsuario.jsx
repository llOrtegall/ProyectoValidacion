import { useState, useEffect } from 'react'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
export function ValidarUsuario ({ user }) {
  const [isValid, setIsValid] = useState(null)

  useEffect(() => {
    async function fetchData () {
      try {
        const { data } = await axios.post('http://localhost:3000/getCF', { cc: user })
        setIsValid(data.Estado === 'Si Existe')
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsValid(false)
        }
      }
    }
    fetchData()
  }, [user])

  return (
    <>
      <td className={isValid ? 'bg-green-400' : 'bg-red-400'}>
        {isValid ? 'Si Existe' : 'No Existe'}
      </td>
      <td className={isValid ? 'bg-green-400' : 'bg-yellow-300 hover: cursor-pointer hover:bg-purple-400 hover:text-white'} id={user}>
        {isValid ? 'User Ok' : 'Opc Usuario'}
      </td>
    </>
  )
}
