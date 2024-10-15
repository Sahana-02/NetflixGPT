import React from 'react'
import useMovieTrailer from '../hooks/useMovieTrailer'
import { useSelector } from 'react-redux'

const VideoBackground = ({ movieId }) => {
  const trailerData = useSelector((Store) => Store.movies.trailer)
  useMovieTrailer(movieId)

  return (
    <div className='w-screen'>
      <iframe
        className='w-screen aspect-video'
        src={
          'https://www.youtube.com/embed/' +
          trailerData?.key +
          '?autoplay=1&mute=1&rel=0&showinfo=0&controls=0&autohide=1'
        }
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      ></iframe>
    </div>
  )
}

export default VideoBackground
