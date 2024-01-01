import { useState, useMemo } from 'react'

export function useFilter (initialItems) {
  const [search, setSearch] = useState('')
  const filteredItems = useMemo(() => {
    return initialItems.filter(({ nombre, placa, serial }) =>
      nombre.toLowerCase().includes(search.toLowerCase()) ||
      placa.toLowerCase().includes(search.toLowerCase()) ||
      serial.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, initialItems])

  return { search, setSearch, filteredItems }
}
