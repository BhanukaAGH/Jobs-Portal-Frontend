import React from 'react'
import Navbar from '../components/Home/Navbar'
import { useSelector } from 'react-redux'

const Events = () => {
  const { authModal } = useSelector((state) => state.ui)

  return (
    <div className={`${authModal && 'h-screen overflow-hidden'}`}>
      <Navbar />
      <header className='header-container'>
        <h1 className='header-title'>Find all events here</h1>

        <div className='header-search-container'>
          <div className='flex items-center w-full space-x-2'>
            <input
              type='text'
              className='header-input'
              placeholder='Event name or keyword'
            />

            <button className='header-search-button'>Search</button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Events
