import { useState, useMemo } from 'react'

export function useFiltersItems (initialItems) {
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

  const filteredBodegas = useMemo(() => {
    return initialBodegas.filter(({ nombre, sucursal, direccion }) =>
      nombre.toLowerCase().includes(searchBodega.toLowerCase()) ||
      sucursal.toString().toLowerCase().includes(searchBodega.toLowerCase()) ||
      direccion.toLowerCase().includes(searchBodega.toLowerCase())
    )
  }, [searchBodega, initialBodegas])

  return { searchBodega, setSearchBodega, filteredBodegas }
}

export function useFilterMovimientos (initialMovimientos) {
  const [searchMovimiento, setSearchMovimiento] = useState('')

  const filteredMovimientos = useMemo(() => {
    return initialMovimientos.filter(({ incidente, encargado }) =>
      incidente.toLowerCase().includes(searchMovimiento.toLowerCase()) ||
      encargado.toLowerCase().includes(searchMovimiento.toLowerCase())
    )
  }, [searchMovimiento, initialMovimientos])

  return { searchMovimiento, setSearchMovimiento, filteredMovimientos }
}

export function useFilterSimcards (initialSimcards) {
  const [searchSimcard, setSearchSimcard] = useState('')

  const filteredSimcards = useMemo(() => {
    return initialSimcards.filter(({ numero, operador, serial }) =>
      numero.toLowerCase().includes(searchSimcard.toLowerCase()) ||
      operador.toLowerCase().includes(searchSimcard.toLowerCase()) ||
      serial.toLowerCase().includes(searchSimcard.toLowerCase())
    )
  }, [searchSimcard, initialSimcards])

  return { searchSimcard, setSearchSimcard, filteredSimcards }
}
