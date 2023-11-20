import { UserRow } from './UserRow'

export function UserTable ({ users }) {
  return (
    <table className='w-2/3'>
      <thead className=''>
        <tr>
          <th>Nombres</th>
          <th>Documento</th>
          <th>Telefono</th>
          <th>Correo</th>
          <th>N° Registro</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {users.map((user, index) => (
          <UserRow key={index} user={user} />
        ))}
      </tbody>
    </table>
  )
}
