import { useSelector } from 'react-redux';
import Movie from './Movie'

export default function Favorites() {

  const favorites = useSelector((state) => state.favorites);

  return (
    <div>
      <h2>Favorite Movies</h2>
      {favorites.length > 0 ? (
        favorites.map((favorite) => (
          <Movie key={favorite.imdbID} movie={favorite} />
        ))
      ) : (
        <p>No favorite movies yet.</p>
      )}
    </div>
  );
}