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
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('Registrarse')

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext)

  async function handleSubmit(ev) {
    ev.preventDefault()
    const url = isLoginOrRegister === 'Iniciar Session' ? 'login' : 'register'
    // TODO: Aqui la respuesta data
    const { data } = await axios.post(url, { username, password })
    setLoggedInUsername(username);
    setId(data.id)
  }

  return (
    <section className="bg-blue-200 h-screen flex items-center">
      <form className="w-72 mx-auto mb-14" onSubmit={handleSubmit}>
        <div className='text-center pt-4'>

          {isLoginOrRegister === 'Registrarse' && (
            <div>
              <h1 className='text-center font-semibold pb-4 text-xl'>Ingresa Tus Datos De Registro</h1>
              <input value={name} onChange={ev => setName(ev.target.value)} type="text" placeholder="Nombres"
                className="block w-full rounded-md  border p-2 mb-2" />
              <input value={apellidos} onChange={ev => setApellidos(ev.target.value)} type="text" placeholder="Apellidos"
                className="block w-full rounded-md border p-2 mb-2" />
              <input value={cedula} onChange={ev => setCedula(ev.target.value)} type="text" placeholder="Número De Cédula / ID"
                className="block w-full rounded-md border p-2 mb-2" />
              <button className="bg-blue-500 text-white block w-full rounded-md p-2 font-semibold shadow-lg">
                {isLoginOrRegister === 'Registrarse' ? 'Registrarse' : 'Iniciar Session'}
              </button>
              Ya Estás Registrado ?
              <button onClick={() => setIsLoginOrRegister('Iniciar Session')} className='mt-4 pl-2 font-semibold'>
                Inicia Sessión
              </button>
            </div>
          )}

          {isLoginOrRegister === 'Iniciar Session' && (
            <div>
              <h1 className='text-center font-semibold pb-4 text-xl'>Iniciar Session</h1>
              <input value={username} onChange={ev => setUsername(ev.target.value)} type="text" placeholder="Usuario"
                className="block w-full rounded-md  border p-2 mb-2" />
              <input value={password} onChange={ev => setPassword(ev.target.value)} type="password" placeholder="Contraseña"
                className="block w-full rounded-md border p-2 mb-2" />
              <button className="bg-blue-500 text-white block w-full rounded-md p-2 font-semibold shadow-lg">
                {isLoginOrRegister === 'Registrarse' ? 'Registrarse' : 'Iniciar Session'}
              </button>
              No Estoy Registrado ?
              <button onClick={() => setIsLoginOrRegister('Registrarse')} className='mt-4 pl-2 font-semibold'>
                Registrarse
              </button>
            </div>
          )}
        </div>

      </form>
    </section>
  )
}

