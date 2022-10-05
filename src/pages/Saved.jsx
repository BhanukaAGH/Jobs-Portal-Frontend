import React, { useState } from 'react'
import Navbar from '../components/Home/Navbar'
import { useSelector } from 'react-redux'
import SavedJobsCard from '../components/Candidate/SavedJobs'
import SavedEvents from '../components/Candidate/SavedEvents'

const Saved = () => {
  const { authModal } = useSelector((state) => state.ui)
  const [type, setType] = useState(0)

  const SavedType = () => {
    if (type === 0) {
      setType(1)
    }
    if (type === 1) {
      setType(0)
    }
  }

  return (
    <div className={`${authModal && 'h-screen overflow-hidden'}`}>
      <Navbar />
      <header className='header-container'>
        {type === 0 && <h1 className='header-title'>Book Marked Jobs</h1>}
        {type === 1 && <h1 className='header-title'>Book Marked Events</h1>}
        <div className='header-search-container'>
          <div className='flex items-center w-full space-x-2'>
            {type === 0 && (
              <input
                type='text'
                className='header-input'
                placeholder='Job title or keyword'
              />
            )}
            {type === 1 && (
              <input
                type='text'
                className='header-input'
                placeholder='Event title or keyword'
              />
            )}
            <button className='header-search-button'>Search</button>
          </div>
        </div>
      </header>
      <div className='flex justify-center flex-col items-center mt-16 '>
        <div className='flex justify-center items-center space-x-2 w-full  '>
          <button onClick={SavedType}>
            <div>
              {type === 0 && (
                <span className='text-sm font-medium mr-2 px-5 py-1.5 rounded-full  bg-blue-400 text-black'>
                  Saved Jobs
                </span>
              )}
              {type === 1 && (
                <span className='text-sm font-medium mr-2 px-5 py-1.5 rounded-full  bg-blue-200 text-black'>
                  Saved Jobs
                </span>
              )}
            </div>
          </button>
          <button onClick={SavedType}>
            <div>
              {type === 1 && (
                <span className='text-sm font-medium mr-2 px-5 py-1.5 rounded-full  bg-blue-400 text-black'>
                  Saved Events
                </span>
              )}
              {type === 0 && (
                <span className='text-sm font-medium mr-2 px-5 py-1.5 rounded-full  bg-blue-200 text-black'>
                  Saved Events
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
      {/* Jobs */}
      {type === 0 && (
        <div className='flex flex-col items-center mt-16 '>
          <div className='flex justify-center w-1/2  mt-3'>
            <div className='box-border grow-0 h-auto w-full'>
              {/* card starts here */}
              <SavedJobsCard />
              {/* card ends here */}
            </div>
          </div>
        </div>
      )}
      {/* job */}
      {/* EVENTS */}
      {type === 1 && (
        <div className='box-border h-auto w-full pt-16 pr-36 pl-36'>
          {/* card starts here */}
          <SavedEvents />
          {/* card ends here */}
        </div>
      )}
      {/* EVENTS */}
    </div>
  )
}

export default Saved
