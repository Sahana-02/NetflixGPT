import React, { useRef, useState } from 'react'
import Header from './Header'
import Login_bg from '../imgs/Login_bg.jpg'
import { checkValidData } from '../utils/validate.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { auth } from '../utils/firebase.js'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice.js'
import { ProfilePhoto } from '../utils/constants.js'
const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true)
  const [errMsg, setErrMsg] = useState(null)
  const email = useRef(null)
  const password = useRef(null)
  const name = useRef(null)
  const dispatch = useDispatch()
  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm)
  }

  const handleSubmitButton = () => {
    const msg = checkValidData(email.current.value, password.current.value)
    if (msg) return
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: ProfilePhoto
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = user
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL
                })
              )
            })
            .catch((error) => {
              // An error occurred
              // ...
            })
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          setErrMsg(errorMessage)
        })
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          setErrMsg(errorMessage)
        })
    }
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          className='h-screen object-cover md:h-max'
          src={Login_bg}
          alt='bg'
        ></img>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className=' w-full md:w-3/12 absolute text-white p-12 bg-opacity-60 bg-black my-36 mx-auto right-0 left-0 rounded-sm'
      >
        <h1 className='font-bold text-3xl py-4 '>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type='text'
            placeholder='Full Name'
            className='rounded-sm p-3 my-2 w-full bg-gray-700'
          />
        )}
        <input
          ref={email}
          type='text'
          placeholder='Email Address'
          className='rounded-sm p-3 my-2 w-full bg-gray-700'
        />
        <input
          ref={password}
          type='password'
          placeholder='Password'
          className='rounded-sm p-3 my-2 w-full bg-gray-700'
        />
        <p className='text-red-600 font-bold'>{errMsg != null ? errMsg : ''}</p>
        <button
          className='rounded-sm bg-red-600 p-4 my-4 w-full'
          onClick={handleSubmitButton}
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p
          className='p-4 my-4 font-bold underline cursor-pointer'
          onClick={toggleSignInForm}
        >
          {' '}
          {isSignInForm
            ? 'New to Netflix? Sign Up Now.'
            : 'Already registered? Sign In Now.'}
        </p>
      </form>
    </div>
  )
}

export default Login
