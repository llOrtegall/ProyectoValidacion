import { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { CloseSession, UserIcon } from './IconsSvg'

export function LoginUserComponent () {
  const { user: User, logout } = useContext(AuthContext)
  const { user, name, lastName, email, proceso, iat } = User

  return (
    <section className=''>
      <nav className='flex items-center justify-between bg-slate-600 m-2 px-4 py-4 mx rounded-xl text-white'>
        <figure className='flex items-center'>
          <UserIcon />
          <section>
            <h3 className='font-semibold text-xl'>
              Bienvenid@ <span>{name}</span><span>{lastName}{email}{proceso}</span>
            </h3>
            <div className='flex'>
              <p className='small-text'>{user}</p>
              <p className='small-text pl-2'>{iat}</p>
            </div>
          </section>
        </figure>

        <button id='close-session' className='flex flex-col items-center text-center' onClick={logout}>
          <CloseSession />
          <p>Cerrar Sesión</p>
        </button>
      </nav>
    </section>
  )
}
