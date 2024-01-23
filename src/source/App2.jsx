import './index.css'
import { Items } from './components/Items'
import { useItems } from './hooks/useItems.js'
import { useEffect } from 'react'

export function App2 () {
  const { items, getItems, error, loading } = useItems()

  useEffect(() => {
    getItems()
  }, [])

  return (
    <div className='page'>
      <header className='form'>
        <h1>Items</h1>
      </header>

      <main>
        {
          loading
            ? <p>Loading...</p>
            : error
              ? <p>{error}</p>
              : <Items items={items} />
        }
      </main>
    </div>
  )
}
