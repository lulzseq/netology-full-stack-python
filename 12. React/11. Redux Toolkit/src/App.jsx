import './App.css'

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';

import Movie from './components/Movie';
import Movies from './components/Movies';
import Favorites from './components/Favorites';

import { fetchMovies } from "./redux/slices/moviesSlice";
import { loadFavorites } from './redux/slices/favoritesSlice';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { Navbar, NavbarBrand, Form, Button, Row, Col, Input, Spinner, Alert } from 'reactstrap';


function AppContent() {

  const { movies, loading, error } = useSelector((state) => state.movies);
  const { movie } = useSelector((state) => state.movie);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchMovies(searchTerm));
    navigate('/');
  };

  return (
    <>
      <Navbar
        color="secondary"
        dark
        style={{ padding: '20px', marginBottom: '20px' }}
      >
        <NavbarBrand href="/">
          Movie finder
        </NavbarBrand>
        <Form onSubmit={handleSubmit}>
          <Row className="row-cols-lg-auto g-3 align-items-center">
            <Col style={{ width: '400px' }}>
              <Input
                id="inputMovie"
                name="inputMovie"
                placeholder="find something"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col>
              <Button type='submit' color='warning'>
                FIND
              </Button>
            </Col>
          </Row>
        </Form>
        <Link to='/favorites'>
          <FavoriteIcon style={{ color: 'orange' }} />
        </Link>
      </Navbar>

      {loading && <Spinner color="secondary">...</Spinner>}
      {error && <Alert color="danger">{error}</Alert>}

      <Routes>
        <Route path='/' element={<Movies movies={movies} dispatch={dispatch} />} />
        <Route path='/:imdbID' element={<Movie movie={movie} />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </>
  );
}

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites) {
      dispatch(loadFavorites(favorites));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
