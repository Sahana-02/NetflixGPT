import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestions from './GPTMovieSuggestions'
import Login_bg from '../imgs/Login_bg.jpg'

const GPTSearchPage = () => {
  return (
    <>
      <div className='absolute -z-10'>
        <img
          className='h-screen object-cover md:h-max'
          src={Login_bg}
          alt='bg'
        ></img>
      </div>{' '}
      <div className='pt-[20%] md:pt-0'>
        <GPTSearchBar />
        <GPTMovieSuggestions />
      </div>
    </>
  )
}

export default GPTSearchPage
