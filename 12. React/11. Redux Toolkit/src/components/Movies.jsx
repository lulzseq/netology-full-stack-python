import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

import { fetchMovie } from '../redux/slices/movieSlice';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Button, Card, CardBody, CardTitle, CardSubtitle, Alert } from 'reactstrap';


export default function Movies({ movies, dispatch }) {

  const showError = movies && movies.Error && (!movies.Search || movies.Search.length === 0);
  const favorites = useSelector((state) => state.favorites);

  const toggleFavorite = (movie) => {
    if (favorites.some((favorite) => favorite.imdbID === movie.imdbID)) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div className="cards">
      {movies?.Search?.length ? (
        movies.Search.map((movie) => (
          <Card
            style={{
              width: '10rem',
              display: 'inline-flex',
            }}
            key={movie.imdbID}
          >
            <Link to={`/${movie.imdbID}`} onClick={() => dispatch(fetchMovie(movie.imdbID))}>
              <img
                alt="no poster for this movie"
                src={movie.Poster}
                width={'100%'}
              />
            </Link>
            <CardBody>
              <CardTitle tag="h5">{movie.Title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                ({movie.Year})
              </CardSubtitle>
              <Link to={`/${movie.imdbID}`} onClick={() => dispatch(fetchMovie(movie.imdbID))}>
                <Button>Watch</Button>
              </Link>
              <Button onClick={() => toggleFavorite(movie)}>
                {favorites.some((favorite) => favorite.imdbID === movie.imdbID) ? (
                  <FavoriteIcon style={{ color: 'red' }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </Button>
            </CardBody>
          </Card>
        ))
      ) : showError ? (
        <Alert color="danger">{movies.Error}</Alert>
      ) : null}
    </div>
  );
}
