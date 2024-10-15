import { createSlice } from '@reduxjs/toolkit'

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    nowPlayingMovies: null,
    trailer: null,
    popularMovies: null,
    upComingMovies: null
  },
  reducers: {
    addNowPlayingMovies(state, action) {
      state.nowPlayingMovies = action.payload
    },
    addMovieTrailer(state, action) {
      state.trailer = action.payload
    },
    addPopularMovies(state, action) {
      state.popularMovies = action.payload
    },
    addUpcomingMovies(state, action) {
      state.upComingMovies = action.payload
    }
  }
})

export const {
  addNowPlayingMovies,
  addMovieTrailer,
  addPopularMovies,
  addUpcomingMovies
} = movieSlice.actions
export default movieSlice.reducer
