import axios from 'axios'

export async function ItemsData () {
  try {
    const itemsResponse = await axios.get('http://localhost:3030/getItems')
    return itemsResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function fechtItemsBodegas () {
  try {
    const itemsResponse = await axios.get('http://localhost:3030/itemsConBodegas')
    return itemsResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function BodegaData () {
  try {
    const bodegaResponse = await axios.get('http://localhost:3030/getBodegas')
    return bodegaResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const createBodega = async (itemToSend) => {
  try {
    const res = await axios.post('http://localhost:3030/createBodega', itemToSend)
    return { data: res.data, error: null }
  } catch (err) {
    return { data: null, error: err.response.data.error }
  }
}

export async function BodegaDataSims () {
  try {
    const bodegaResponse = await axios.get('http://localhost:3030/getBodegasSim')
    return bodegaResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function simcardsBodegas () {
  try {
    const simcardsResponse = await axios.get('http://localhost:3030/simcardWhitBodega')
    return simcardsResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}
