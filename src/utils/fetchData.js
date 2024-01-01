import axios from 'axios'

export async function fetchData () {
  try {
    const [bodegaResponse, itemsResponse] = await Promise.all([
      axios.get('/findBodegaWithItems'),
      axios.get('/getItems')
    ])

    return {
      bodega: bodegaResponse.data,
      items: itemsResponse.data
    }
  } catch (err) {
    console.error(err)
    // Aquí podrías manejar el error de una manera más robusta
  }
}
