import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  movie: [],
  loading: false,
  error: ""
};

export const fetchMovie = createAsyncThunk(
  "fetchMovie",
  async (imdbID, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${import.meta.env.VITE__OMDB_API_KEY}&i=${imdbID}`
      );

      if (!response.ok) {
        return rejectWithValue("Loading error!");
      }

      return await response.json();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.movie = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default movieSlice.reducer;
