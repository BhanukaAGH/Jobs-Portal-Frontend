import React from 'react'
import Navbar from '../components/Home/Navbar'
import EventsCards from '../components/Candidate/EventsCards'
import BGImage from '../assets/event.webp'
import { useSelector } from 'react-redux'

const Events = () => {
  const { authModal } = useSelector((state) => state.ui)
  return (
    <div className={`${authModal && 'h-screen overflow-hidden'}`}>
      <Navbar />
      <header className='flex justify-center relative bg-[#14163A] items-center h-96'>
        <img
          src={BGImage}
          alt='background-img'
          className='absolute top-0 left-0 object-cover w-full h-full opacity-40 select-none'
        />

        <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-12 text-center text-white'>
          Event Postings
        </h1>

        <div className='header-search-container'>
          <div className='flex items-center w-full space-x-2'>
            <input
              type='text'
              className='header-input'
              placeholder='Event title or keyword'
            />
            <input type='text' className='header-input' placeholder='Company' />
            <button className='header-search-button'>Search</button>
          </div>
        </div>
      </header>
      <div className='box-border h-auto w-full pt-16 pr-36 pl-36'>
        {/* card starts here */}
        <EventsCards />
        {/* card ends here */}
      </div>
    </div>
  )
}

export default Events
