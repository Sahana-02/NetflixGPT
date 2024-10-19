import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import usePopularMovies from '../hooks/usePopularMovies'
import useUpcomingMovies from '../hooks/useUpcomingMovies'
import { useSelector } from 'react-redux'
import GPTSearchPage from './GPTSearchPage'

const Browse = () => {
  useNowPlayingMovies()
  usePopularMovies()
  useUpcomingMovies()
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch)
  return (
    <div className=' w-screen overflow-x-auto no-scrollbar'>
      <Header />
      {showGPTSearch ? (
        <GPTSearchPage />
      ) : (
        <>
          {' '}
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  )
}

export default Browse
