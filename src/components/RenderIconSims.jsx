import { ClaroIcon, MovistarIcon, TigoIcon } from '../components/Icons.jsx'

export function RenderIconSims ({ operador }) {
  if (operador === 'Claro') {
    return (
      <figure>
        <ClaroIcon />
      </figure>
    )
  } else if (operador === 'Movistar') {
    return (
      <figure>
        <MovistarIcon />
      </figure>
    )
  } else if (operador === 'Tigo') {
    return (
      <figure>
        <TigoIcon />
      </figure>
    )
  }

  return null
}
