import React, { useState, useEffect } from 'react'
import api from '../../utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { applyJob } from '../../features/ui/uiSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
const SavedJobsCard = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //saved jobs
  const [savedJobs, setSavedjobs] = useState([])

  //get all saved jobs
  const getSavedJobs = async () => {
    const API_URL = `candidate/getsaveJobs/${user.userId}`
    const response = await api.get(API_URL)
    let mapped = response.data.find.map((ele) => ele.JobID)
    setSavedjobs(mapped)
  }
  //remove from saved
  const removeJob = async (Jid) => {
    let text = 'Are You sure you want to unsave job'
    if (window.confirm(text) === true) {
      try {
        const API_URL = `candidate/delsaveJob/${Jid}`
        const response = await api.delete(API_URL)
        toast.info(response.data.msg, { theme: 'dark' })
      } catch (error) {
        console.log('err', error)
        toast.error('error', { theme: 'dark' })
      }
    } else {
      return
    }
    getSavedJobs()
  }
  //onclick apply
  const onClickApply = async (job) => {
    const jobData = {
      job: job,
      savedJobs: savedJobs,
    }
    dispatch(applyJob({ state: true, viewData: jobData }))
    navigate('/candidate/view-job')
  }
  useEffect(() => {
    if (user !== null) {
      getSavedJobs()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {savedJobs.map((job) => (
        <div key={job._id} className='flex flex-col pt-4 ...'>
          <div className=' h-56 w-full bg-gray-50 rounded-lg  shadow-md'>
            <div className=' h-5/6 w-full pl-4 pt-4 bg-white rounded-t-lg '>
              <div className='flex'>
                <img
                  src={job.company.photoUrl}
                  alt='company-img'
                  className='object-cover h-24 w-24 rounded-lg shadow-2xl'
                />
                <div className='pl-4 grid grid-cols-1 '>
                  <div
                    onClick={(e) => {
                      onClickApply(job)
                    }}
                    className='font-sans text-4xl font-bold'
                  >
                    {job.jobTitle}
                  </div>
                  <div className='flex pt-2 '>
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
                        d='M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21'
                      />
                    </svg>
                    {job.company.name}
                  </div>
                  <div className='flex'>
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
                        d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                      />
                    </svg>
                    {job.country}
                  </div>
                  <div className='flex'>
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
                        d='M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25'
                      />
                    </svg>
                    {job.workType}
                  </div>
                  <div>
                    <p className='truncate text-sm text-gray-500'>
                      {job.jobDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='grid grid-cols-2'>
                <div className='pl-4 pt-2'>
                  Posted on: {moment(job.createdAt).utc().format('YYYY-MM-DD')}
                </div>
                <div className='flex justify-end pr-4 pt-2'>
                  <div className='pr-4 pl-4 '>
                    <button
                      onClick={(e) => {
                        removeJob(job._id)
                      }}
                      className='no-underline hover:underline text-red-700'
                    >
                      Remove
                    </button>
                  </div>
                  <div className='pr-4 pl-4 '>
                    <button
                      onClick={(e) => {
                        onClickApply(job)
                      }}
                      className='no-underline hover:underline text-blue-700'
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default SavedJobsCard
