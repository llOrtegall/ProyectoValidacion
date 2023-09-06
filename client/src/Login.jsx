import axios from 'axios';
import { useState } from 'react';

export const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function LoginUser(ev) {
    ev.preventDefault()
    const { data } = await axios.post('/login', { username, password })
    console.log(data)
  }

  return (
    <section className="bg-blue-200 h-screen flex items-center">
      <form className="w-72 mx-auto mb-14" onSubmit={LoginUser}>

        <input value={username} onChange={ev => setUsername(ev.target.value)} type="text" placeholder="Usuario"
          className="block w-full rounded-md  border p-2 mb-2" />

        <input value={password} onChange={ev => setPassword(ev.target.value)} type="password" placeholder="Contraseña"
          className="block w-full rounded-md border p-2 mb-2" />

        <button className="bg-blue-500 text-white block w-full rounded-md p-2 font-semibold shadow-lg">Login</button>
      </form>
    </section>
  )
}

