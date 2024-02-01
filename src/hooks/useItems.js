import { useState } from 'react'
import { getItemsFecht } from '../services/Items.services.js'

export function useItems ({ empresa: company }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const newItems = await getItemsFecht(company)
      setItems(newItems)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { items, getItems, loading, error }
}
