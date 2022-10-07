import React from 'react'
import moment from 'moment'

const AppliedJobsCards = ({ data }) => {
  return (
    <>
      <h1 className='font-sans font-normal italic text-gray-500'>
        {data.length} results found
      </h1>
      {data.map((data) => (
        <div key={data._id} className='flex flex-col pt-4 ...'>
          <div className=' h-48 relative w-full bg-gray-50   shadow-xl'>
            <div className=' h-5/6 w-full pl-4 pt-4 bg-white  '>
              <div className='flex relative'>
                <div className='pr-4'>
                  <img
                    src={data.CompanyID.photoUrl}
                    alt='company-img'
                    className='object-cover h-24 w-24  shadow-xl'
                  />
                </div>
                <div>
                  <h1 className='text-xl font-bold'>{data.JobID.jobTitle}</h1>
                  <h1 className='pt-4 text-lg'>{data.CompanyID.name}</h1>
                  <h1 className='pt-2 text-sm'>{data.JobID.jobCategory}</h1>
                </div>
                <div className=' absolute right-12 top-2'>
                  {data.ApplicationStatus === 'rejected' && (
                    <span className='text-lg font-bold mr-2 px-8 py-1 rounded-full bg-red-700 text-white'>
                      {data.ApplicationStatus}
                    </span>
                  )}
                  {data.ApplicationStatus === 'accepted' && (
                    <span className='text-lg font-bold mr-2 px-8 py-1 rounded-full bg-green-700 text-white'>
                      {data.ApplicationStatus}
                    </span>
                  )}
                  {data.ApplicationStatus === 'pending' && (
                    <span className='text-lg font-bold mr-2 px-8 py-1 rounded-full bg-gray-500 text-white'>
                      {data.ApplicationStatus}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className='flex font-sans font-medium text-gray-600 absolute left-6'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              Applied On: {moment(data.createdAt).utc().format('YYYY-MM-DD')}
            </div>
            <div className='flex font-sans font-medium text-gray-600 absolute right-6 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              Last Update: {moment(data.updatedAt).utc().format('YYYY-MM-DD')}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default AppliedJobsCards
