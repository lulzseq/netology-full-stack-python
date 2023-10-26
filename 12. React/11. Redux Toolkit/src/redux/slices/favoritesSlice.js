import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: JSON.parse(localStorage.getItem('favorites')) || [],
  reducers: {
    addFavorite: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state));
    },
    removeFavorite: (state, action) => {
      const imdbID = action.payload.imdbID;
      state = state.filter((movie) => movie.imdbID !== imdbID);
      localStorage.setItem('favorites', JSON.stringify(state));
      return state;
    },
    loadFavorites: (state, action) => {
      return action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, loadFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;