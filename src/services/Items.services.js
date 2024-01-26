const URL = 'http://172.20.1.70:3000/itemsConBodegas/'

export const getItemsFecht = async (company) => {
  try {
    const response = await fetch(`${URL}${company}`)
    const json = await response.json()

    const items = json

    return items?.map(item => ({
      Id: item._id,
      Nombre: item.nombre,
      Descripcion: item.descripcion,
      Placa: item.placa,
      Serial: item.serial,
      Estado: item.estado,
      Bodega: item.bodega.nombre
    }))
  } catch (error) {
    throw new Error('Error al obtener los items')
  }
}
