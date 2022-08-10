import React from 'react'
import GoogleImage from '../../assets/GImage.png'

const Popular = () => {
  return (
    <div className='flex flex-col justify-center items-center py-16'>
      <div className='flex flex-col md:flex-row items-center justify-between w-5/6 lg:w-4/6 mb-8'>
        <div className='flex flex-col items-center md:items-start justify-center text-center md:text-left mb-2 md:mb-0'>
          <h1 className='text-3xl md:text-4xl font-[Poppins] text-black font-bold'>
            Explore popular Jobs
          </h1>
          <p className='text-sm text-[#6B7E8B] hidden sm:block'>
            Check our featured jobs from popular companies. Start applying now.
          </p>
        </div>
        <button className='text-white font-[Poppins] bg-[#312ECB] px-4 py-2 rounded-md'>
          View all Jobs
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-5/6 lg:w-4/6 gap-x-6 xl:gap-x-8 2xl:gap-x-20 gap-y-4 md:gap-y-12'>
        {[...Array(6)].map((item, index) => (
          <div className='flex flex-col items-center justify-center rounded-md w-full h-80 cursor-pointer bg-[#4285F4]/20 px-2 sm:px-4 hover:bg-[#4285F4]/80'>
            <img
              src={GoogleImage}
              alt='google-logo'
              className='w-14 lg:w-20 mb-3'
            />
            <h1 className='text-2xl font-[Poppins] font-semibold text-center text-black'>
              Software Engineer
            </h1>
            <p className='font-[Poppins] text-[#6B7E8B] text-center mb-6'>
              We are looking for a senior software engineer
            </p>
            <button className='text-white bg-[#0A2537] rounded-md px-3 py-1 text-center'>
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Popular
