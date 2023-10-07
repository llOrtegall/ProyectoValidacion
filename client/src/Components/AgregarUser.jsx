export function AgregarUser(data) {

  // TODO: Tomamos el objeto y filtramos por usuarios no creados
  const usuariosNoCreados = data.data.filter(item => !item.userCreated);


  return (
    <button className='ml-3 px-1 bg-white rounded p-1 '>Crear Cliente</button>
  )
}