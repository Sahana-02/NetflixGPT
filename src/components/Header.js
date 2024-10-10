import React from 'react'
import Netflix_logo from '../imgs/Netflix_Logo_PMS.png'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useSelector } from 'react-redux'

const Header = () => {
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {})
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-20 flex justify-between'>
      {' '}
      <img src={Netflix_logo} alt='logo' className='w-44'></img>
      {user && (
        <div className='flex p-4 '>
          <img
            className='w-14 h-14 p-2'
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
