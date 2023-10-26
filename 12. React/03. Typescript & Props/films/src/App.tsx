import './App.css'
import Stars from './components/Stars'

interface Movie {
  name?: string
  rating: number
}

const movies: Movie[] = [
  {
    name: 'Movie #1',
    rating: 0
  },
  {
    name: 'Movie #2',
    rating: 1
  },
  {
    name: 'Movie #3',
    rating: 5
  },
  {
    name: 'Movie #4',
    rating: 6
  }
]


function App() {
  return (
    <>
      {movies.map(movie => (
        <Stars
          name={movie.name}
          rating={movie.rating}
          key={movie.name}
          count={movie.rating >= 1 && movie.rating <= 5 ? movie.rating : 0}
        />
      ))}
    </>
  )
}

export default App
