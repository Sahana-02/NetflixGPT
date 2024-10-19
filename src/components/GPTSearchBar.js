import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from '../utils/languageConstants'
import openAI from '../utils/openAI'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'

const GPTSearchBar = () => {
  const dispatch = useDispatch()
  const langKey = useSelector((store) => store.config.langkey)
  const searchText = useRef(null)
  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=' +
        movie +
        '&include_adult=false&language=en-US&page=1',
      API_OPTIONS
    )
    const json = await data.json()

    return json.results
  }

  const handleGPTSearchResults = async () => {
    console.log(searchText.current.value)
    // Make an API call to GPT API and get Movie Results

    const gptQuery =
      'Act as a Movie Recommendation system and suggest some movies for the query : ' +
      searchText.current.value +
      '. only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya'

    const gptResults = await openAI.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo'
    })

    if (!gptResults.choices) {
      // TODO: Write Error Handling
    }

    console.log(gptResults.choices?.[0]?.message?.content)

    // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(',')

    // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

    // For each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie))
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray)

    console.log(tmdbResults)

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    )
  }
  return (
    <div className='pt-[30%] md:pt-[10%] flex justify-center'>
      <form
        className='w-full md:w-1/2  bg-black grid grid-cols-12 rounded-md'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type='text'
          placeholder={lang[langKey].searchPlaceholder}
          className='col-span-9 p-4 m-3 text-black rounded-lg'
        />
        <button
          className=' bg-red-700 col-span-3 m-4 py-2 px-4 rounded-lg text-white cursor-pointer'
          onClick={handleGPTSearchResults}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GPTSearchBar
