import React, { useEffect, useState } from 'react'
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
import useConfirm from '../../hooks/useConfirm'
import useDebounce from '../../hooks/useDebounce'
import { AnimatePresence, motion } from 'framer-motion'
import Applicants from '../Applicant/Applicants'
import ApplicantResume from '../Applicant/ApplicantResume'
import generatePDF from '../../utils/generatePDF'

const tableVariant = {
  initial: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const JobDashboard = () => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectRow, setSelectRow] = useState(null)
  const [viewResume, setViewResume] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { jobs, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.job
  )

  const debouncedSearchTerm = useDebounce(searchText, 300)

  const [Dialog, confirmDelete] = useConfirm(
    'Are you sure?',
    'Are you sure you want to delete job post ?'
  )

  const handleViewJob = (jobData) => {
    dispatch(viewJob({ state: true, viewData: jobData }))
    navigate('/company/post-job')
  }

  const handleEditJob = (jobData) => {
    dispatch(editJob({ state: true, editData: jobData }))
    navigate('/company/post-job')
  }

  const handleRemoveJob = async (jobId) => {
    const ans = await confirmDelete()
    if (ans) {
      dispatch(deleteJob(jobId))
    }
  }

  useEffect(() => {
    dispatch(getAllJobs())
    dispatch(viewJob({ state: false, viewData: null }))
    dispatch(editJob({ state: false, editData: null }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSuccess) {
      setData(jobs)
    }

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

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      setData(
        jobs.filter(
          (item) =>
            item.jobTitle
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase().trim()) ||
            item.jobCategory
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase().trim())
        )
      )
    } else {
      setData(jobs)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm])

  return (
    <div className='w-full h-full bg-[#F9FAFF]'>
      {/* Title Section */}
      <div className='dashboard-title'>
        <h3 className='text-lg md:text-2xl xl:text-3xl'>Company Jobs List</h3>
        <div className='space-x-3'>
          <button
            className='dashbord-title-button bg-white text-black border border-black hidden md:inline-block'
            onClick={() => generatePDF(user.name, user.userId, data)}
          >
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
          {/* Job Lists */}
          {!selectRow && (
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
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
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
                  {data.length > 0 ? (
                    <motion.tbody layout variants={tableVariant}>
                      {data.map((job) => (
                        <AnimatePresence key={job._id}>
                          <motion.tr
                            layout
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            className='bg-white border-b hover:bg-gray-50'
                          >
                            <td
                              className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap cursor-pointer hover:underline hover:text-blue-600'
                              onClick={() => setSelectRow(job)}
                            >
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
                          </motion.tr>
                        </AnimatePresence>
                      ))}
                    </motion.tbody>
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
          )}

          {/* One Job Applicants List */}
          {selectRow && (
            <Applicants
              selectJob={selectRow}
              setSelectRow={setSelectRow}
              setViewResume={setViewResume}
            />
          )}
        </div>
      </div>
      <Dialog />
      {viewResume && (
        <ApplicantResume
          viewResume={viewResume}
          setViewResume={setViewResume}
        />
      )}
    </div>
  )
}

export default JobDashboard
