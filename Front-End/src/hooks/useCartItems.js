import { useState, useCallback } from 'react'

export function useCarItems (initialItems = []) {
  const [carItems, setCarItems] = useState(initialItems)

  const handleAddItem = useCallback((id) => {
    setCarItems(prevItems => {
      if (!prevItems.includes(id)) {
        return [...prevItems, id]
      } else {
        return prevItems
      }
    })
  }, [])

  const handleRemoveItem = useCallback((id) => {
    setCarItems(prevItems => {
      return prevItems.filter(item => item !== id)
    })
  }, [])

  return { carItems, handleAddItem, handleRemoveItem, setCarItems }
}

export function useCarSimcards (initialItems = []) {
  const [cartSims, setCartSims] = useState(initialItems)

  const handleAddSimcard = useCallback((id) => {
    setCartSims(prevItems => {
      if (!prevItems.includes(id)) {
        return [...prevItems, id]
      } else {
        return prevItems
      }
    })
  }, [])

  const handleRemoveItem = useCallback((id) => {
    setCartSims(prevItems => {
      return prevItems.filter(item => item !== id)
    })
  }, [])

  return { cartSims, handleAddSimcard, handleRemoveItem, setCartSims }
}

export function useCarSimcards2 (initialItems = []) {
  const [cartSims2, setCartSims2] = useState(initialItems)

  const handleAddSimcard2 = useCallback((id) => {
    setCartSims2(prevItems => {
      if (!prevItems.includes(id)) {
        return [...prevItems, id]
      } else {
        return prevItems
      }
    })
  }, [])

  const handleRemoveItem2 = useCallback((id) => {
    setCartSims2(prevItems => {
      return prevItems.filter(item => item !== id)
    })
  }, [])

  return { cartSims2, handleAddSimcard2, handleRemoveItem2, setCartSims2 }
}
