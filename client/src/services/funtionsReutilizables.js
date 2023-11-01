export function separarNombre (nombre) {
  const nombres = nombre.split(' ', 4)

  let nombre1, nombre2, apellido1, apellido2

  switch (nombres.length) {
    case 2:
      nombre1 = nombres[0]
      nombre2 = ''
      apellido1 = nombres[1]
      apellido2 = ''
      break
    case 3:
      nombre1 = nombres[0]
      nombre2 = nombres[1]
      apellido1 = nombres[2]
      apellido2 = ''
      break
    case 4:
      nombre1 = nombres[0]
      nombre2 = nombres[1]
      apellido1 = nombres[2]
      apellido2 = nombres[3]
      break
    default:
      console.log('Nombre no válido')
      break
  }

  return { nombre1, nombre2, apellido1, apellido2 }
}
export function obtenerFechaActual () {
  const fecha = new Date()
  const dia = String(fecha.getDate()).padStart(2, '0')
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const ano = fecha.getFullYear().toString().substr(-2)
  return { dia, mes, ano }
}
