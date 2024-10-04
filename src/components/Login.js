import React, { useState } from 'react'
import Netflix_logo from '../imgs/Netflix_Logo_PMS.png'
import Header from './Header'
import Login_bg from '../imgs/Login_bg.jpg'

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true)

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm)
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src={Login_bg} alt='bg'></img>
      </div>
      <form className='w-3/12 absolute text-white p-12 bg-opacity-60 bg-black my-36 mx-auto right-0 left-0 rounded-sm'>
        <h1 className='font-bold text-3xl py-4 '>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignInForm && (
          <input
            type='text'
            placeholder='Full Name'
            className='rounded-sm p-4 my-3 w-full'
          />
        )}
        <input
          type='text'
          placeholder='Email Address'
          className='rounded-sm p-4 my-3 w-full'
        />
        <input
          type='password'
          placeholder='Password'
          className='rounded-sm p-4 my-3 w-full'
        />
        <button className='rounded-sm bg-red-600 p-4 my-6 w-full'>
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
