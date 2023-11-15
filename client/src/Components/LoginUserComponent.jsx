import { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { CloseSession, UserIcon } from './IconsSvg'
import { ChangedPassword } from './ChangedPasword'

export function LoginUserComponent () {
  const [showChangePasword, setShowChangePasword] = useState(false)
  const { user: User, logout } = useContext(AuthContext)
  const { user, name, lastName, email } = User

  const handleShowChangePassword = () => {
    setShowChangePasword(!showChangePasword)
  }

  return (
    <>
      <section className=''>
        <nav className='flex items-center justify-between bg-slate-600 m-2 px-4 py-6 mx rounded-xl text-white'>
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

          <button onClick={handleShowChangePassword} className='bg-blue-400 p-3 font-bold rounded-md hover:bg-green-200 hover:text-gray-700'>
            Cambiar Contraseña
          </button>

          <button id='close-session' className='flex flex-col items-center text-center' onClick={logout}>
            <CloseSession />
            <p>Cerrar Sesión</p>
          </button>

        </nav>
        <section className='absolute right-1/3'>
          {showChangePasword === true ? <ChangedPassword username={user} /> : null}
        </section>
      </section>
    </>

  )
}
