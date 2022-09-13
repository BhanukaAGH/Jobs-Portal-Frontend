import React from 'react'
import { TiArrowLeft } from 'react-icons/ti'
import ApplicantCard from './ApplicantCard'

const Applicants = ({ selectJob, setSelectRow }) => {
  return (
    <div className='absolute inset-0 overflow-auto !scrollbar-thin !scrollbar-track-gray-200 !scrollbar-thumb-gray-800'>
      <div className='flex items-center justify-start pt-4 pb-3 px-4 space-x-4 divide-x-2 divide-gray-500 sticky top-0 bg-white z-[2] border-b'>
        <button
          className=' flex items-center justify-center gap-x-1 bg-[#14163A] text-white rounded-md pr-6 pl-5 py-1'
          onClick={() => setSelectRow(null)}
        >
          <TiArrowLeft className='text-xl' />
          Back
        </button>
        <p className='md:text-xl font-[Poppins] pl-4 font-semibold'>
          Job Applicants
        </p>
      </div>

      <div className='grid grid-cols-1 w-full px-4 pb-8 pt-4'>
        <div className='col-span-1 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4'>
          {[...Array(8)].map((_, index) => (
            <ApplicantCard key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Applicants
