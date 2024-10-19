import React, { useEffect } from 'react'
import Netflix_logo from '../imgs/Netflix_Logo_PMS.png'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { SUPPORTED_LANGUAGES } from '../utils/constants'
import { toggleGPTSearch } from '../utils/gptSlice'
import { changeLanguage } from '../utils/configSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch)

  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate('/error')
      })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL
          })
        )
        navigate('/browse')
      } else {
        dispatch(removeUser())
        navigate('/')
      }
    })
    return () => unsubscribe()
  }, [])

  const handleToggleGPTSearchBar = () => {
    dispatch(toggleGPTSearch())
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
      {' '}
      <img src={Netflix_logo} alt='logo' className='w-44 mx-auto md:mx-0'></img>
      {user && (
        <div className='flex p-4 justify-between'>
          {showGPTSearch && (
            <select
              className='bg-gray-700 text-white py-3 px-4 m-2 rounded-lg'
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.langIdentifier} value={lang.langIdentifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className='m-2 px-4 py-2 bg-red-700 text-white rounded-lg'
            onClick={handleToggleGPTSearchBar}
          >
            {showGPTSearch ? 'Home Page' : 'GPT Search'}
          </button>
          <img
            className='w-14 h-14 p-2 hidden md:block'
            alt='userIcon'
            src={user.photoURL}
          ></img>
          <button className='font-bold text-white' onClick={handleSignout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
