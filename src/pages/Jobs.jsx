import React from 'react'
import Navbar from '../components/Home/Navbar'
import JobsCard from '../components/Candidate/JobCards'
const Jobs = () => {

  const test = () => {
    console.log('works')
  }
  return (
    <>
      <Navbar />
      <header className='h-screen relative h-52 bg-[#14163A] flex justify-center items-center'>
        <div className='pt-16'>
          <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-12 text-center text-white'>
            Find Your Dream Job
          </h1>
        </div>
      </header>
      <div>
        <div className='flex justify-center w-full select-none'>
          <div className=' flex items-center py-1 pl-3 pr-1 rounded-lg md:w-1/2 gap-x-2'>
            <input
              type='text'
              className=' border-2 border-[#E2E2E2] placeholder:italic  shadow-2xl rounded-lg w-full py-2 px-1 font-[Poppins] text-sm !outline-hidden  !ring-0'
              placeholder='Job title or keyword'
            />
            <input
              type='text'
              className='border-2 border-[#E2E2E2] placeholder:italic shadow-2xl rounded-lg w-full py-2 px-1 font-[Poppins] text-sm !outline-hidden !ring-0'
              placeholder='Location'
            />
            <button className='px-6 py-2 w-1/2 font-medium rounded-md bg-blue-700 text-white'>
              Search
            </button>
          </div>
        </div>
        <br />
        <div className='flex justify-center'>
          <div className='pl-2'>
            <select id="countries" className=" border-2 border-[#E2E2E2] text-gray-900 text-sm  shadow-inner-2xl rounded-lg !outline-hidden !ring-0 w-40 p-2.5 ">
              <option selected>Job-Type</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className='pl-2'>
            <select id="countries" className=" border-2 border-[#E2E2E2] text-gray-900 text-sm  shadow-inner-2xl rounded-lg !outline-hidden !ring-0 w-40 p-2.5 ">
              <option selected>Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className='pl-2'>
            <select id="countries" className=" border-2 border-[#E2E2E2] text-gray-900 text-sm  shadow-inner-2xl rounded-lg !outline-hidden !ring-0 w-40 p-2.5 ">
              <option selected>Category</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className='pl-2'>
            <select id="countries" className=" border-2 border-[#E2E2E2] text-gray-900 text-sm  shadow-inner-2xl rounded-lg !outline-hidden !ring-0 w-40 p-2.5 ">
              <option selected>Mediality</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
        <div className='flex justify-center p-10'>
          <div className="box-border grow-0  h-auto w-3/4 p-4 ">
            {/* card starts here */}
            <JobsCard/>
            {/* card ends here */}
          </div>

        </div>
      </div>

    </>
  )


}

export default Jobs
