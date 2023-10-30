import { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { CloseSession, UserIcon } from './IconsSvg'

// eslint-disable-next-line react/prop-types
export function LoginUserComponent () {
  // eslint-disable-next-line react/prop-types
  const { user } = useContext(AuthContext)
  const { name, lastname, id, usuario } = user
  const { logout } = useContext(AuthContext)

  return (
    <section className=' '>
      <nav className='flex items-center justify-between bg-slate-600 m-2 px-4 py-4 mx rounded-xl text-white'>
        <figure className='flex items-center'>
          <UserIcon />
          <section>
            <h3 className='font-semibold text-xl'>Bienvenido <span>{name}</span><span>{lastname}</span></h3>
            <div className='flex '>
              <p style={{ fontSize: '10px' }}>{usuario}</p>
              <p className='pl-2' style={{ fontSize: '10px' }}>{id}</p>
            </div>
          </section>
        </figure>

        <button id='close session' className='flex flex-col items-center text-center' onClick={logout}>
          <CloseSession />
          <p>Cerrar Session</p>
        </button>
      </nav>
    </section>
  )
}
