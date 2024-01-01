import { useState, useMemo } from 'react'

export function useFilters (initialItems) {
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

export function useFiltersBodegas (initialBodegas) {
  const [searchBodega, setSearchBodega] = useState('')

  console.log(initialBodegas)

  const filteredBodegas = useMemo(() => {
    return initialBodegas.filter(({ nombre, sucursal, direccion }) =>
      nombre.toLowerCase().includes(searchBodega.toLowerCase()) ||
      sucursal.toLowerCase().includes(searchBodega.toLowerCase()) ||
      direccion.toLowerCase().includes(searchBodega.toLowerCase())
    )
  }, [searchBodega, initialBodegas])

  return { searchBodega, setSearchBodega, filteredBodegas }
}
