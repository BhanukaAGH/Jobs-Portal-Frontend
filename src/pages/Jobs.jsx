import React from 'react'
import Navbar from '../components/Home/Navbar'
import BGImage from '../assets/bg.webp'

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
            <div className="flex flex-col pt-4 ...">
              <div className=" h-56 w-full bg-gray-50 rounded-lg  shadow-md">
                <div className=' h-5/6 w-full pl-4 pt-4 bg-white rounded-t-lg '>
                  <div className='flex'>
                    <img src={BGImage} className="object-cover h-24 w-24 rounded-lg border-2 shadow-2xl" />
                    <div className='pl-4 grid grid-cols-1 '>
                      <div className='font-sans text-4xl font-bold'>JOB TITLE</div>
                      <div className='flex pt-2 '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                        Company
                      </div>
                      <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        Location
                      </div>
                      <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                        </svg>
                        Mediality
                      </div>
                      <div><p className="truncate text-sm text-gray-500">Line 110:51:  The href attribute requires a valid value to be accessible. Provide a valid, navigable address as tLine 110:51:  The href attribute requires a valid value to be accessible. Provide a valid, navigable address as tLine 110:51:  The href attribute requires a valid value to be accessible. Provide a valid, navigable address as t</p></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="grid grid-cols-2">
                    <div className='pl-4 pt-2'>
                      Posted
                    </div>
                    <div className='flex justify-end pr-4 pt-2'>
                      <button onClick={test}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                      </button>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
                      </svg>

                      <div className='pr-4 pl-4 '><a href='#' className='no-underline hover:underline text-red-700'>Apply</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* card ends here */}
          </div>

        </div>
      </div>

    </>
  )


}

export default Jobs
