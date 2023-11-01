export function separarNombre (nombre) {
  const nombreseparado = nombre.split(' ', 4)
  const nombre1 = nombreseparado[0]
  const nombre2 = nombreseparado[1] === undefined ? '' : nombreseparado[1]
  const apellido1 = nombreseparado[2]
  const apellido2 = nombreseparado[3] === undefined ? '' : nombreseparado[1]
  return { nombre1, nombre2, apellido1, apellido2 }
}

export function obtenerFechaActual () {
  const fecha = new Date()
  const dia = String(fecha.getDate()).padStart(2, '0')
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const ano = fecha.getFullYear().toString().substr(-2)
  return { dia, mes, ano }
}
