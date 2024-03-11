import { useCallback, useEffect, useMemo, useState } from 'react'
import { getItemsFecht } from '../services/Items.services.js'

export function useItems (company) {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  const fetchItems = useCallback(() => {
    setLoading(true)
    getItemsFecht(company)
      .then(items => setItems(items))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, [company])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const filterItems = (item) => {
    const lowerSearch = search.toLowerCase()
    for (const key in item) {
      if (item[key] && item[key].toString().toLowerCase().includes(lowerSearch)) {
        return true
      }
    }
    return false
  }

  const ItemsFiltrados = useMemo(() => {
    return items.filter(filterItems)
  }, [search, items])

  return { ItemsFiltrados, search, setSearch, loading, error }
}
