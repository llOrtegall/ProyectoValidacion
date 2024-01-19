import moment from 'moment-timezone'
import axios from 'axios'

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

export function getCookie (name) {
  const cookies = document.cookie.split('; ')
  const cookie = cookies.find(cookie => cookie.startsWith(name + '='))
  return cookie ? cookie.split('=')[1] : null
}

export const GetUserCookie = async (token) => {
  const response = await axios.get('/profile', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const user = response.data
  return user
}
