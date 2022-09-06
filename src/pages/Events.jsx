import React from 'react'
import Navbar from '../components/Home/Navbar'
import EventsCards from '../components/Candidate/EventsCards'
import { useSelector } from 'react-redux'

const Events = () => {
  const { authModal } = useSelector((state) => state.ui)
  return (
    <div className={`${authModal && 'h-screen overflow-hidden'}`}>
      <Navbar />
      <header className='header-container'>
        <h1 className='header-title'>Event Postings</h1>

        <div className='header-search-container'>
          <div className='flex items-center w-full space-x-2'>
            <input
              type='text'
              className='header-input'
              placeholder='Job title or keyword'
            />
            <input
              type='text'
              className='header-input'
              placeholder='Location'
            />
            <button className='header-search-button'>Search</button>
          </div>
        </div>
      </header>
      <div class="box-border h-auto w-full pt-16 pr-36 pl-36">
        {/* card starts here */}
        <EventsCards />
        {/* card ends here */}
      </div>
    </div>
  )
}

export default Events
