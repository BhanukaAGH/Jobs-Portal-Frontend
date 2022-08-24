import React from 'react'
import { Link } from 'react-router-dom'
import NotFoundImage from '../assets/notFound.webp'

const NotFound = () => {
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-black'>
      <div className='flex flex-col md:flex-row items-center w-full md:w-2/3 lg:h-1/2 gap-y-8'>
        <div className='flex flex-1 flex-col items-center'>
          <h1 className='font-bold text-white text-6xl md:text-9xl'>404</h1>

          <h6 className='mb-2  text-xl font-bold text-center text-gray-300 md:text-3xl 2xl:text-6xl'>
            <span className='text-red-500'>Oops!</span> Page not found
          </h6>

          <p className='mb-8 text-center text-gray-200 md:text-lg 2xl:text-xl'>
            The page you’re looking for doesn’t exist.
          </p>

          <Link
            to={'/'}
            className='px-6 py-2 text-sm font-semibold text-black rounded-md bg-white hover:bg-gray-500 hover:text-white'
          >
            Go Home
          </Link>
        </div>
        <div className='flex-1'>
          <img
            src={NotFoundImage}
            alt='not-found'
            className='w-full h-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default NotFound
