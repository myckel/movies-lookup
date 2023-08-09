function MoviesResults({ movies }) {
  return (
    <ul className='movies'>
      {movies.map((movie) => (
        <li className='movie' key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.title} />
        </li>
      ))}
    </ul>
  )
}

function EmptyResults() {
  return <p>Movies not found for your search</p>
}

export function Movies({ movies }) {
  if (movies === undefined) return null
  const hasMovies = movies?.length > 0

  return (
    <section>
      {hasMovies ? <MoviesResults movies={movies} /> : <EmptyResults />}
    </section>
  )
}
