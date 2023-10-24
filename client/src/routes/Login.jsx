import axios from 'axios';
import { useContext, useState } from "react";
import { AuthContext } from '../auth/AuthContext';


export const Login = () => {

  // TODO: Para Logín
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  const { setUser: setUserWithLogin, setName, setLastName, setId } = useContext(AuthContext);

  async function iniciarSession(ev) {
    ev.preventDefault()

    await axios.post('/login', { user, password })
      .then(data => {
        const { apellidos, id, nombres, username } = data.data
        setUserWithLogin(username), setName(nombres), setLastName(apellidos), setId(id)
      }).catch((err) => {
        setErrorMessage(err.response.data.detalle);
      })

    setTimeout(() => {
      setErrorMessage('')
    }, 8000)
  }

  return (
    <section className='flex justify-center items-center h-screen w-screen bg-blue-200 '>
      <form className="w-80" onSubmit={iniciarSession}>
        <h1 className='text-center font-semibold pb-4 text-xl'>Iniciar Session</h1>
        <input value={user} onChange={ev => setUser(ev.target.value)} type="text" placeholder="Usuario"
          className="block w-full rounded-md  border p-2 mb-2" required={true} />
        <input value={password} onChange={ev => setPassword(ev.target.value)} type="password" placeholder="Contraseña"
          className="block w-full rounded-md border p-2 mb-2" required={true} />
        <button className="bg-blue-500 text-white block w-full rounded-md p-2 font-semibold shadow-lg">
          Iniciar Session
        </button>
        <article className='w-auto mt-12 text-center text-red-700 font-medium'>
          {errorMessage}
        </article>
      </form>
    </section>

  )
}
