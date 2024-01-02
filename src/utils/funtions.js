import moment from 'moment-timezone'

export function asignarTipo (num) {
  if (num === 1) {
    return 'MI'
  } else if (num === 2) {
    return 'MA'
  } else {
    return null
  }
}

export const formatFecha = (fecha) => {
  const fechaLocal = moment(fecha).tz(moment.tz.guess()).format('YYYY-MM-DD hh:mm A')
  return fechaLocal
}
