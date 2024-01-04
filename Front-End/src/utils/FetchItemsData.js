import axios from 'axios'

export async function ItemsData () {
  try {
    const itemsResponse = await axios.get('/getItems')
    return itemsResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function ItemsWthitBodegas () {
  try {
    const itemsResponse = await axios.get('/findBodegaWithItems')
    return itemsResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function BodegaData () {
  try {
    const bodegaResponse = await axios.get('/getBodegas')
    return bodegaResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}
