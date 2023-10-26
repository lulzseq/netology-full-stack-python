import { useSelector, useDispatch } from 'react-redux';

import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Button, Card, CardBody, CardTitle, CardSubtitle, Row, Col, CardText, Spinner, Alert } from 'reactstrap';


export default function Movie({ movie }) {
  const { loading, error } = useSelector((state) => state.movie);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  if (loading) {
    return <Spinner color="secondary">Loading...</Spinner>;
  } else if (error) {
    return <Alert color="danger">Error: {error}</Alert>;
  } else if (!movie) {
    return <Alert color="danger">Movie not found.</Alert>;
  } else {
    const isFavorite = favorites.some((favorite) => favorite.imdbID === movie.imdbID);

    const toggleFavoriteHandler = () => {
      if (isFavorite) {
        dispatch(removeFavorite(movie));
      } else {
        dispatch(addFavorite(movie));
      }
    };

    return (
      <>
        {movie ? (
          <div>
            <Row>
              <Card style={{ display: 'flex', flexDirection: 'row', padding: '10px', width: '70%' }}>
                <Col style={{ display: 'flex' }}>
                  <img
                    alt="no poster for this movie"
                    src={movie.Poster}
                  />
                </Col>
                <Col style={{ display: 'flex' }}>
                  <CardBody>
                    <CardTitle><h3>{movie.Title}</h3></CardTitle>
                    <CardSubtitle><h6>({movie.Year})</h6></CardSubtitle>
                    <div style={{ margin: '40px 0px' }}>
                      <CardText><b>Director</b><br />{movie.Director}</CardText>
                      <CardText><b>Actors</b><br />{movie.Actors}</CardText>
                    </div>
                    <CardText><b>Runtime</b><br />{movie.Runtime}</CardText>
                    <div style={{ margin: '40px 0px' }}>
                      <b>Ratings</b><br />
                      {movie.Ratings ? (
                        movie.Ratings.map((rating) => (
                          <p key={rating.Source} style={{ margin: '0px' }}>
                            {rating.Source}: {rating.Value}
                          </p>
                        ))
                      ) : null}
                    </div>
                    <Button onClick={toggleFavoriteHandler}>
                      {isFavorite ? (
                        <FavoriteIcon style={{ color: 'red' }} />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </Button>
                  </CardBody>
                </Col>
              </Card>
            </Row>
          </div>
        ) : (
          <Alert color="danger">Error</Alert>
        )}
      </>
    );
  }
}
