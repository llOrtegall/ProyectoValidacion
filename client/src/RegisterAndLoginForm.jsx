import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from './User.context';

export const RegisterAndLoginForm = () => {

  // * username, setUsername, id, setId, name, setName, lastName, setLastName
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext)

  // TODO: Para Registro
  const [names, setNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [document, setDocument] = useState('');

  // TODO: Para Logín
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  // TODO: Para controlar el formulario
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('Iniciar Session')



  async function iniciarSession(ev) {
    ev.preventDefault()
    const { data } = await axios.post('/login', { user, password })
    setLoggedInUsername(user);
    setId(data.id)
    setName(data.nombres)
  }

  async function Registrarse(ev) {
    ev.preventDefault()

    console.log(ev.target.value);

    const data = await axios.post('/register', { names, document, lastNames })
    console.log(data);

    // setLoggedInUsername(username);
    // setId(data.id)
    // setNames(data.nombres)
  }

  return (
    <section className="bg-blue-200 h-screen flex flex-col items-center justify-center pb-16 text-center">
      {
        isLoginOrRegister === 'Iniciar Session' && (
          <div>
            <form className="w-72" onSubmit={iniciarSession}>
              <h1 className='text-center font-semibold pb-4 text-xl'>Iniciar Session</h1>
              <input value={user} onChange={ev => setUser(ev.target.value)} type="text" placeholder="Usuario"
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
              <input value={names} onChange={ev => setNames(ev.target.value)} type="text" placeholder="Nombres"
                className="block w-full rounded-md  border p-2 mb-2" />
              <input value={lastNames} onChange={ev => setLastNames(ev.target.value)} type="text" placeholder="Apellidos"
                className="block w-full rounded-md border p-2 mb-2" />
              <input value={document} onChange={ev => setDocument(ev.target.value)} type="text" placeholder="Número De Cédula / ID"
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
