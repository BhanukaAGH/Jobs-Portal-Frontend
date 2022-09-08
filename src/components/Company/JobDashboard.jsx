import React, { useEffect } from 'react'
import {
  MdOutlineRemoveRedEye,
  MdOutlineEdit,
  MdDeleteOutline,
  MdSearch,
} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteJob, getAllJobs, reset } from '../../features/job/jobSlice'
import Loading from '../../components/Loading'
import moment from 'moment/moment'
import { editJob, viewJob } from '../../features/ui/uiSlice'
import { toast } from 'react-toastify'

const JobDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { jobs, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.job
  )

  const handleViewJob = (jobData) => {
    dispatch(viewJob({ state: true, viewData: jobData }))
    navigate('/company/post-job')
  }

  const handleEditJob = (jobData) => {
    dispatch(editJob({ state: true, editData: jobData }))
    navigate('/company/post-job')
  }

  const handleRemoveJob = (jobId) => {
    dispatch(deleteJob(jobId))
  }

  useEffect(() => {
    dispatch(getAllJobs())
    dispatch(viewJob({ state: false, viewData: null }))
    dispatch(editJob({ state: false, editData: null }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSuccess && message) {
      dispatch(getAllJobs())
      toast(message, { type: 'success' })
    }

    if (isError && message) {
      toast(message, { type: 'error' })
    }

    dispatch(reset())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, message])

  return (
    <div className='w-full h-full bg-[#F9FAFF]'>
      {/* Title Section */}
      <div className='dashboard-title'>
        <h3 className='text-lg md:text-2xl xl:text-3xl'>Company Jobs List</h3>
        <div className='space-x-3'>
          <button className='dashbord-title-button bg-white text-black border border-black hidden md:inline-block'>
            Job Report
          </button>
          <Link to={'/company/post-job'} className='dashbord-title-button'>
            Post Job
          </Link>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className='dashboard-content'>
        <div className='flex flex-1 overflow-hidden relative h-full w-full'>
          <div className='absolute inset-0 overflow-auto !scrollbar-thin !scrollbar-track-gray-200 !scrollbar-thumb-gray-800'>
            <div className='flex flex-col items-start space-y-2 pt-3 pb-2 px-4'>
              <button className='dashbord-title-button bg-white text-black border border-black block md:hidden'>
                Job Report
              </button>
              <div className='relative'>
                <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                  <MdSearch className='w-5 h-5 text-gray-500' />
                </div>
                <input
                  type='text'
                  className='block p-2 pl-10 w-72 md:w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Search for items'
                />
              </div>
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                  <tr>
                    <th scope='col' className='py-3 px-6'>
                      Title
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      Job Category
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      Posted Date
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      No of Position
                    </th>
                    <th scope='col' className='py-3 px-6'>
                      Actions
                    </th>
                  </tr>
                </thead>
                {jobs.length > 0 ? (
                  <tbody>
                    {jobs.map((job) => (
                      <tr
                        key={job._id}
                        className='bg-white border-b hover:bg-gray-50'
                      >
                        <td className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'>
                          {job.jobTitle}
                        </td>
                        <td className='py-4 px-6'>{job.jobCategory}</td>
                        <td className='py-4 px-6'>
                          {moment(job.createdAt).format('YYYY-MM-DD')}
                        </td>
                        <td className='py-4 px-6'>{job.numberOfVacancy}</td>
                        <td className='flex items-center py-4 px-6 space-x-3'>
                          <MdOutlineRemoveRedEye
                            className='text-lg cursor-pointer'
                            onClick={() => handleViewJob(job)}
                          />
                          <MdOutlineEdit
                            className='text-lg text-blue-500 cursor-pointer'
                            onClick={() => handleEditJob(job)}
                          />
                          <MdDeleteOutline
                            className='text-lg text-red-500 cursor-pointer'
                            onClick={() => handleRemoveJob(job._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td
                        colSpan={5}
                        className='text-lg md:text-2xl font-[Poppins] font-semibold text-center pt-8'
                      >
                        No Posted Jobs
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDashboard
