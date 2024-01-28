import { ClaroIcon, MovistarIcon, TigoIcon } from '../components/Icons.jsx'

const IconMap = {
  Claro: ClaroIcon,
  Movistar: MovistarIcon,
  Tigo: TigoIcon
}

export function RenderIconSims ({ operador }) {
  const IconComponent = IconMap[operador]

  return IconComponent
    ? (
        <figure>
          <IconComponent />
        </figure>
      )
    : null
}
