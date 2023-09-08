import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from './User.context';

export const RegisterAndLoginForm = () => {

  // TODO: Para Registro
  const [name, setName] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [cedula, setCedula] = useState('');

  // TODO: Para Logín
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('Iniciar Session')

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext)


  async function iniciarSession(ev) {
    ev.preventDefault()
    // TODO: Aqui la respuesta data
    const { data } = await axios.post('/login', { username, password })
    setLoggedInUsername(username);
    setId(data.id)
  }

  async function Registrarse(ev) {
    ev.preventDefault()
    await axios.post('/register', { name, cedula, apellidos })
  }


  return (
    <section className="bg-blue-200 h-screen flex flex-col items-center justify-center pb-16 text-center">
      {
        isLoginOrRegister === 'Iniciar Session' && (
          <div>
            <form className="w-72" onSubmit={iniciarSession}>
              <h1 className='text-center font-semibold pb-4 text-xl'>Iniciar Session</h1>
              <input value={username} onChange={ev => setUsername(ev.target.value)} type="text" placeholder="Usuario"
                className="block w-full rounded-md  border p-2 mb-2" />
              <input value={password} onChange={ev => setPassword(ev.target.value)} type="password" placeholder="Contraseña"
                className="block w-full rounded-md border p-2 mb-2" />
              <button className="bg-blue-500 text-white block w-full rounded-md p-2 font-semibold shadow-lg">
                Iniciar Session
              </button>
            </form>
            No Estás Registrado ?
            {isLoginOrRegister === 'Iniciar Session' && (
              <button onClick={() => setIsLoginOrRegister('Registrarse')} className='pl-2 pt-4 font-semibold'>
                Registrarse
              </button>
            )}
          </div>
        )
      }
      {
        isLoginOrRegister === 'Registrarse' && (
          <div>
            <form className="w-72" onSubmit={Registrarse}>
              <h1 className='text-center font-semibold pb-4 text-xl'>Ingresa Tus Datos De Registro</h1>
              <input value={name} onChange={ev => setName(ev.target.value)} type="text" placeholder="Nombres"
                className="block w-full rounded-md  border p-2 mb-2" />
              <input value={apellidos} onChange={ev => setApellidos(ev.target.value)} type="text" placeholder="Apellidos"
                className="block w-full rounded-md border p-2 mb-2" />
              <input value={cedula} onChange={ev => setCedula(ev.target.value)} type="text" placeholder="Número De Cédula / ID"
                className="block w-full rounded-md border p-2 mb-2" />
              <button className="bg-blue-500 text-white block w-full rounded-md p-2 font-semibold shadow-lg">
                Registrarse
              </button>
            </form>

            Ya Estás Registrado ?
            {isLoginOrRegister === 'Registrarse' && (
              <button onClick={() => setIsLoginOrRegister('Iniciar Session')} className='pl-2 pt-4 font-semibold'>
                Iniciar Session
              </button>
            )}
          </div>
        )
      }
    </section >
  )
}

