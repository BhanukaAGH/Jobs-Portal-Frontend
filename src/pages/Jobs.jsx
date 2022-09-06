import React from 'react'
import Navbar from '../components/Home/Navbar'
import JobsCard from '../components/Candidate/JobCards'
import { useSelector } from 'react-redux'
const Jobs = () => {
  const { authModal } = useSelector((state) => state.ui)

  return (
    <div className={`${authModal && 'h-screen overflow-hidden'}`}>
      <Navbar />
      <header className='relative h-60 bg-[#14163A] flex justify-center items-center'>
        <div className='pt-16'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-12 text-center text-white'>
            Find Your Dream Job
          </h1>
        </div>
        <div className='w-full md:w-2/3 xl:w-1/2 px-3 md:px-0 absolute -bottom-6 mx-auto '>
          <div className='flex items-center w-full space-x-2'>
            <input
              type='text'
              className='placeholder:italic rounded-lg w-full p-3 py-4 font-[Poppins] text-sm !outline-hidden !border-hidden !ring-0 shadow-xl'
              placeholder='Job title or keyword'
            />
            <input
              type='text'
              className='placeholder:italic rounded-lg w-full p-3 py-4 font-[Poppins] text-sm !outline-hidden !border-hidden !ring-0 shadow-xl'
              placeholder='Location'
            />
            <button className='px-6 py-3.5 w-1/2 font-medium rounded-md bg-blue-700 text-white shadow-xl'>
              Search
            </button>
          </div>
        </div>
      </header>
      <div className='flex flex-col items-center mt-16'>
        <div className='flex items-center space-x-2'>
          <select
            id='countries'
            className=' border-2 border-[#E2E2E2] text-gray-900 text-sm  shadow-inner-2xl rounded-lg !outline-hidden !ring-0 w-40 p-2.5 '
          >
            <option defaultValue>Job-Type</option>
            <option value='US'>United States</option>
            <option value='CA'>Canada</option>
            <option value='FR'>France</option>
            <option value='DE'>Germany</option>
          </select>

          <select
            id='countries'
            className=' border-2 border-[#E2E2E2] text-gray-900 text-sm  shadow-inner-2xl rounded-lg !outline-hidden !ring-0 w-40 p-2.5 '
          >
            <option defaultValue>Country</option>
            <option value='US'>United States</option>
            <option value='CA'>Canada</option>
            <option value='FR'>France</option>
            <option value='DE'>Germany</option>
          </select>

          <select
            id='countries'
            className=' border-2 border-[#E2E2E2] text-gray-900 text-sm  shadow-inner-2xl rounded-lg !outline-hidden !ring-0 w-40 p-2.5 '
          >
            <option defaultValue>Category</option>
            <option value='US'>United States</option>
            <option value='CA'>Canada</option>
            <option value='FR'>France</option>
            <option value='DE'>Germany</option>
          </select>

          <select
            id='countries'
            className=' border-2 border-[#E2E2E2] text-gray-900 text-sm  shadow-inner-2xl rounded-lg !outline-hidden !ring-0 w-40 p-2.5 '
          >
            <option defaultValue>Mediality</option>
            <option value='US'>United States</option>
            <option value='CA'>Canada</option>
            <option value='FR'>France</option>
            <option value='DE'>Germany</option>
          </select>
        </div>

        <div className='flex justify-center w-1/2 mt-3'>
          <div className='box-border grow-0 h-auto'>
            {/* card starts here */}
            <JobsCard />
            {/* card ends here */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
