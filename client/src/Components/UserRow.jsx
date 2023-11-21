export function UserRow ({ user }) {
  return (
    <tr className='md:text-xs'>
      <td>{user.nombre}</td>
      <td>{user.cedula}</td>
      <td>{user.telefono}</td>
      <td>{user.correo}</td>
      <td>{user.telwhats}</td>
    </tr>
  )
}
