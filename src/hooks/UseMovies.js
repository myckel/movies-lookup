import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(
    async ({ search }) => {
      try {
        setIsLoading(true)
        setError(null)
        previousSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (e) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    },
    [search]
  )

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [movies, sort])

  return { movies: sortedMovies, getMovies, isLoading }
}
