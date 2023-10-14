const API = 'http://localhost:3000/clientes';

export const getData = async () => {
  const res = await fetch(API)
  const data = await res.json()
  return data
}
