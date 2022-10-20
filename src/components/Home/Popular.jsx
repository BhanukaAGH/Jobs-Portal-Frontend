import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../utils/api'

const Popular = () => {
  const [popularJobs, setPopularJobs] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const getPopularJobs = async () => {
      setLoading(true)
      const res = await api.get('/applicant/getPopularJobs')
      setPopularJobs(res.data)
      setLoading(false)
    }

    getPopularJobs()
  }, [])

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
        <Link
          to={'/jobs'}
          className='text-white font-[Poppins] bg-[#312ECB] px-4 py-2 rounded-md'
        >
          View all Jobs
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-5/6 lg:w-4/6 gap-x-6 xl:gap-x-8 2xl:gap-x-20 gap-y-4 md:gap-y-12'>
        {!loading
          ? popularJobs?.map((data) => (
              <div
                key={data.job?._id}
                onClick={() =>
                  navigate(`/candidate/view-job?job=${data.job?._id}`)
                }
                className='flex flex-col items-center justify-center rounded-lg w-full h-80 cursor-pointer bg-[#4285F4]/10 px-2 sm:px-4 shadow-lg hover:shadow-xl hover:shadow-blue-200'
              >
                <img
                  src={data?.job?.company?.photoUrl}
                  alt='google-logo'
                  className='w-14 lg:w-20 mb-3'
                />
                <h1 className='text-2xl font-[Poppins] font-semibold text-center text-black'>
                  {data.job?.jobTitle}
                </h1>
                <p className='font-[Poppins] text-[#6B7E8B] text-center mb-6'>
                  We are looking for a {data.job?.jobTitle}
                </p>
                <button className='text-white bg-[#0A2537] rounded-md px-3 py-1 text-center'>
                  Apply Now
                </button>
              </div>
            ))
          : [...Array(6)].map((_, index) => (
              <div
                key={index}
                className='flex flex-col items-center justify-center space-y-3 rounded-lg w-full h-80 cursor-pointer bg-[#4285F4]/10 px-2 sm:px-4 shadow-lg hover:shadow-xl hover:shadow-blue-200 animate-pulse'
              >
                <div className='w-14 h-14 bg-slate-300 rounded-md animate-pulse'></div>
                <div className='w-1/2 bg-slate-300 rounded-md h-4 animate-pulse'></div>
                <div className='w-3/4 rounded-md h-8 bg-slate-300 animate-pulse'></div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default Popular
