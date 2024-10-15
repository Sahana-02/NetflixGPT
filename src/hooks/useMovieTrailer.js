import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addMovieTrailer } from '../utils/movieSlice'

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch()
  const trailerData = useSelector((Store) => Store.movies.trailer)

  const getMovieVideos = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/' +
        movieId +
        '/videos?language=en-US',
      API_OPTIONS
    )
    const json = await data.json()
    const filteredData = json.results.filter(
      (video) => video.type === 'Trailer'
    )
    const trailer = filteredData.length ? filteredData[0] : json.results[0]
    dispatch(addMovieTrailer(trailer))
  }
  useEffect(() => {
    !trailerData && getMovieVideos()
  }, [])
}

export default useMovieTrailer
