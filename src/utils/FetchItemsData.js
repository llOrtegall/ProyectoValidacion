import axios from 'axios'

export async function ItemsData () {
  try {
    const [bodegaResponse, itemsResponse] = await Promise.all([
      axios.get('/findBodegaWithItems'),
      axios.get('/getItems')
    ])

    return {
      bodega: bodegaResponse.data,
      items: itemsResponse.data
    }
  } catch (error) {
    console.error(error)
    // Aquí podrías manejar el error de una manera más robusta
  }
}

export async function BodegaData () {
  try {
    const bodegaResponse = await axios.get('/getBodegas')
    return bodegaResponse.data
  } catch (error) {
    console.log(error)
  }
}
