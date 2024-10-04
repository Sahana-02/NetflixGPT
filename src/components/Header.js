import React from 'react'
import Netflix_logo from '../imgs/Netflix_Logo_PMS.png'
const Header = () => {
  return (
    <div className='absolute px-8 py-2 bg-gradient-to-t from-black z-20'>
      {' '}
      <img src={Netflix_logo} alt='logo' className='w-44'></img>
    </div>
  )
}

export default Header
