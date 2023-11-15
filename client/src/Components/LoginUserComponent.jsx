import { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { CloseSession, UserIcon } from './IconsSvg'

export function LoginUserComponent () {
  const { user: User, logout } = useContext(AuthContext)
  const { user, name, lastName, email } = User

  return (
    <section className=''>
      <nav className='flex items-center justify-between bg-slate-600 m-2 px-4 py-4 mx rounded-xl text-white'>
        <figure className='flex items-center'>
          <UserIcon />
          <section>
            <h3 className='font-semibold text-xl'>
              Bienvenid@ <span>{name}</span><span> {lastName} </span>
            </h3>
            <div className='flex'>
              <p className='small-text'>Usuario: <span className='font-bold pr-2'>{user}</span>  Correo: <span className='font-semibold lowercase'>{email} </span></p>
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
