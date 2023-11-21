import { useState, useEffect, useCallback } from 'react'
import { UserTable } from './UserTable'
import { ValidacionUsers } from './ValidacionUsers'
import axios from 'axios'
import { InfoUserChat } from './InfoUserChat'

export function RenderUsuarios () {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [user, setUser] = useState(null)

  const handleClick = async (user) => {
    const foundUser = users.find(u => u.cedula == user.user)
    setUser(foundUser)
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get('/clientes')
      setUsers(response.data)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <main className='p-2 h-96 overflow-auto'>
        <h1 className='bg-blue-600 py-2 rounded-lg text-center font-semibold text-white text-2xl'>Usuarios Registrados Por Chat Boot</h1>
        <section className='flex'>
          <UserTable users={users} />
          <ValidacionUsers users={users} fun={handleClick} />
        </section>
      </main>

      {user && <InfoUserChat user={user} />}

    </>
  )
}
