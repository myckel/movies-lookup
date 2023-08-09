import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/UseMovies'
import { useState, useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'

// import debounce from 'just-debounce-it'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError("Can't search an empty text")
      return
    }

    if (search.match(/^\d+$/)) {
      setError('can not search numbers')
      return
    }

    if (search.length < 3) {
      setError('The search text is too short, must have at least 3 characters')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, isLoading, getMovies } = useMovies({ search, sort })

  const debounced = useDebouncedCallback((search) => {
    getMovies({ search })
  }, 400)

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }
  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debounced(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movies Search</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            placeholder='Avengers, Transformers ...'
          />
          <button type='submit'>Search</button>
          <input
            type='checkbox'
            onChange={handleSort}
            checked={sort}
            id='sortMovies'
          />
          <label htmlFor='sortMovies'>Sort Movies</label>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>{isLoading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  )
}

export default App
