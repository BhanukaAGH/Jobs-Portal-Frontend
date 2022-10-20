import React from 'react'
import { BiMapPin, BiGlobe, BiUser } from 'react-icons/bi'

const SingleView = ({
  showView,
  name,
  email,
  photoUrl,
  companyLocation,
  companyDescription,
}) => {
  const closeView = () => {
    showView({})
  }
  return (
    <article className='absolute inset-0 flex items-center justify-center bg-black  bg-opacity-50 mb-4 '>
      <div className='rounded-lg bg-white py-4 px-6 border-1 border-black w-1/2'>
        <h1 className='text-2xl font-bold text-center mb-4'>
          Company Information
        </h1>
        <div className='flex justify-between items-start'>
          <div>
            <div className='flex items-center mb-5'>
              <BiUser className='h-10 w-10 mr-5' />
              <p> {name}</p>
            </div>
            <div className='flex items-center mb-5'>
              <BiMapPin className='h-10 w-10 mr-5' />
              <p> {companyLocation}</p>
            </div>
            <div className='flex items-center mb-5 justify-center'>
              <BiGlobe className='h-10 w-10 mr-5' />
              <p> {email}</p>
            </div>
          </div>
          <img
            src={photoUrl}
            alt=''
            height={150}
            width={150}
            // style={{ borderRadius: 500 }}
          />
        </div>
        <div className='flex  flex-wrap mb-5'>
          <p className='text-lg font-bold'>Company Description</p>
          <p className=''>{companyDescription}</p>
        </div>
        <div className='flex justify-center'>
          <button
            className=' text-center admin-btn bg-red-600 '
            onClick={closeView}
          >
            Close
          </button>
        </div>
      </div>
    </article>
  )
}

export default SingleView
