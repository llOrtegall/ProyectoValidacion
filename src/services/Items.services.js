import axios from 'axios'

export const getItemsFecht = async (company) => {
  try {
    // BodegasMongoDB.get('/itemsConBodegas/:company', setDatabaseConnection, findBodegaWithItems) <= este es el endpoint en el backend
    const { data: items } = await axios.get(`/itemsConBodegas/${company}`)

    return items?.map(item => ({
      Id: item._id,
      Nombre: item.nombre,
      Descripcion: item.descripcion,
      Placa: item.placa,
      Serial: item.serial,
      Estado: item.estado,
      Bodega: item.bodega.nombre,
      Sucursal: item.bodega.sucursal
    }))
  } catch (error) {
    throw new Error('Error al obtener los items')
  }
}
