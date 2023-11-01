import { ValidarUsuario } from './ValidarUsuario'

export function ListaUsuarioChat ({ usuario }) {
  return (
    <tbody className='text-center'>
      {usuario.length && usuario.map((user) => (
        <tr key={user.id}>
          <td>{user.nombre}</td>
          <td>{user.cedula}</td>
          <td>{user.telefono}</td>
          <td>{user.correo}</td>
          <td>{user.telwhats}</td>
          <ValidarUsuario user={user.cedula} />
        </tr>
      ))}
    </tbody>
  )
}
