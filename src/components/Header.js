import React, { useEffect } from 'react'
import Netflix_logo from '../imgs/Netflix_Logo_PMS.png'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)

  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {})
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
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
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
