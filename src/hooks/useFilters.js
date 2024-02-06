import { useState, useMemo } from 'react'

export function useFiltersItems (initialItems) {
  const [search, setSearch] = useState('')

  const filteredItems = useMemo(() => {
    return initialItems.filter(({ Nombre, Bodega, Descripcion, Estado, Placa, Serial, Sucursal }) =>
      Nombre.toLowerCase().includes(search.toLowerCase()) ||
      (Bodega ? Bodega.toLowerCase().includes(search.toLowerCase()) : false) ||
      (Sucursal ? Sucursal.toString().toLowerCase().includes(search.toLowerCase()) : false) ||
      Descripcion.toLowerCase().includes(search.toLowerCase()) ||
      Estado.toLowerCase().includes(search.toLowerCase()) ||
      Placa.toLowerCase().includes(search.toLowerCase()) ||
      Serial.toLowerCase().includes(search.toLowerCase())
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

export function useFilterSimcards2 (initialSimcards2) {
  const [searchSimcard2, setSearchSimcard2] = useState('')

  const filteredSimcards2 = useMemo(() => {
    return initialSimcards2.filter(({ numero, operador, serial }) =>
      numero.toLowerCase().includes(searchSimcard2.toLowerCase()) ||
      operador.toLowerCase().includes(searchSimcard2.toLowerCase()) ||
      serial.toLowerCase().includes(searchSimcard2.toLowerCase())
    )
  }, [searchSimcard2, initialSimcards2])

  return { searchSimcard2, setSearchSimcard2, filteredSimcards2 }
}
