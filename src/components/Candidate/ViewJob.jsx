import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getJob } from '../../features/job/jobSlice'
import api from '../../utils/api'
import Navbar from '../Home/Navbar'
import Loading from '../Loading'
import moment from 'moment'

const ViewJob = () => {
  const [params] = useSearchParams()
  const jobIdParams = params.get('job')
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { jobApply, authModal } = useSelector((state) => state.ui)
  const { isLoading: loading, job } = useSelector((state) => state.job)

  //for loading animation
  const [isLoading, setisLoading] = useState(false)

  //saved jobs jobid
  const [savedJobs, setSavedjobs] = useState([])

  //get all saved jobs
  const getSavedJobs = async () => {
    const API_URL = `candidate/getsaveJob/${user.userId}`
    const response = await api.get(API_URL)
    let mapped = response.data.find.map((ele) => ele.JobID)
    setSavedjobs(mapped)
  }
  //get resume details
  const getResume = async () => {
    const API_URL = `candidate/viewResume/${user.userId}`
    const response = await api.get(API_URL)
    console.log(response)
    if (!response.data.find) {
      return null
    } else {
      return response.data.find._id
    }
  }

  const applyJob = async () => {
    if (user === null) {
      toast.info('you must be logged in to apply for job', { theme: 'dark' })
      return
    }
    setisLoading(true)
    const ResumeID = await getResume()

    if (!ResumeID) {
      setisLoading(false)
      toast.info('resume no setup', { theme: 'dark' })
      return
    }
    const userID = user.userId //logged user
    const JobID = jobIdParams ? job?._id : jobApply.viewData.job._id
    const CompanyID = jobIdParams
      ? job?.company?._id
      : jobApply.viewData.job.company._id

    try {
      const API_URL = `candidate/apply`
      const response = await api.post(API_URL, {
        userID: userID,
        JobID: JobID,
        ResumeID: ResumeID,
        CompanyID: CompanyID,
      })
      setisLoading(false)
      toast.info(response.data.msg, { theme: 'dark' })
    } catch (error) {
      console.log(error)
      setisLoading(false)
      toast.info('error occured when applying', { theme: 'dark' })
    }
  }
  //save method
  const saveJob = async () => {
    if (
      savedJobs.includes(jobIdParams ? job?._id : jobApply.viewData.job._id)
    ) {
      //delete job
      try {
        const API_URL = `candidate/delsaveJob/${
          jobIdParams ? job?._id : jobApply.viewData.job._id
        }`
        const response = await api.delete(API_URL)
        toast.info(response.data.msg, { theme: 'dark' })
      } catch (error) {
        console.log('err', error)
        toast.error('error', { theme: 'dark' })
      }
    } else {
      //save job
      try {
        const API_URL = `candidate/saveJob`
        const response = await api.post(API_URL, {
          userID: user.userId,
          JobID: jobIdParams ? job?._id : jobApply.viewData.job._id,
        })
        toast.info(response.data.msg, { theme: 'dark' })
      } catch (error) {
        toast.error('error', { theme: 'dark' })
      }
    }
    getSavedJobs()
  }
  useEffect(() => {
    if (jobIdParams) {
      dispatch(getJob(jobIdParams))
    }

    if (user !== null) {
      getSavedJobs()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className='w-screen h-screen'>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <div className={`${authModal && 'h-screen overflow-hidden'}`}>
        <Navbar />
        <header className='relative h-72 bg-[#14163A] flex  items-center'>
          <br />
          <div className='pt-10 pl-10 pr-10 w-full '>
            <div className='box-content h-48 w-full '>
              <div className='relative pl-4 pr-4 pt-4 h-full '>
                <img
                  src={
                    jobIdParams
                      ? job?.company?.photoUrl
                      : jobApply.viewData.job.company.photoUrl
                  }
                  alt='job-img'
                  className='float-left object-cover bg-white h-36 w-36 rounded-lg shadow-2xl'
                />
                <div className='pl-48'>
                  <div className='w-3/4'>
                    <h1 className='text-white font-sans text-4xl font-bold'>
                      {jobIdParams
                        ? job?.jobTitle
                        : jobApply.viewData.job.jobTitle}
                    </h1>
                    <br />
                    <h1 className='text-white font-sans text-2xl font-bold'>
                      Company:{' '}
                      {jobIdParams
                        ? job?.company?.name
                        : jobApply.viewData.job.company.name}
                    </h1>
                    <h1 className='text-white font-sans text-xl font-bold'>
                      Category:{' '}
                      {jobIdParams
                        ? job?.jobCategory
                        : jobApply.viewData.job.jobCategory}
                    </h1>
                  </div>
                </div>
                <h1 className='text-white absolute right-4 top-6 '>
                  Posted on:{' '}
                  {moment(jobIdParams
                    ? job?.createdAt
                    : jobApply.viewData.job.createdAt).utc().format('YYYY-MM-DD')}
                </h1>
                <button
                  onClick={applyJob}
                  className='bg-red-700 hover:bg-red-500  text-white absolute float-right right-4 bottom-0 px-5 py-2.2 rounded-sm '
                >
                  Apply
                </button>

                {savedJobs.includes(
                  jobIdParams ? job?._id : jobApply.viewData.job._id
                ) && (
                  <button onClick={saveJob}>
                    <h1 className='text-white absolute float-right right-28 bottom-0'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          fillRule='evenodd'
                          d='M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </h1>
                  </button>
                )}

                {!savedJobs.includes(
                  jobIdParams ? job?._id : jobApply.viewData.job._id
                ) && (
                  <button onClick={saveJob}>
                    <h1 className='text-white absolute float-right right-28 bottom-0'>
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
                          d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
                        />
                      </svg>
                    </h1>
                  </button>
                )}

                {user === null && (
                  <button
                    title='login to save'
                    disabled={true}
                    className='cursor-not-allowed'
                  >
                    <h1 className='text-white absolute float-right right-28 bottom-0'>
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
                          d='M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5'
                        />
                      </svg>
                    </h1>
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className='pl-10 pr-10'>
              <div className='box-content h-14 w-full pt-2'>
                <div className='grid grid-cols-5 gap-4 '>
                  <div className='flex text-base text-slate-600 font-sans font-medium'>
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
                        d='M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25'
                      />
                    </svg>
                    {jobIdParams ? job?.country : jobApply.viewData.job.country}
                  </div>
                  <div className='flex text-base text-slate-600 font-sans font-medium'>
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
                        d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
                      />
                    </svg>
                    {jobIdParams
                      ? job?.jobDeadline
                      : jobApply.viewData.job.jobDeadline}
                  </div>
                  <div className='flex text-base text-slate-600 font-sans font-medium'>
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
                        d='M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
                      />
                    </svg>
                    {jobIdParams
                      ? job?.averageSalary
                      : jobApply.viewData.job.averageSalary}
                  </div>
                  <div className='flex text-base text-slate-600 font-sans font-medium'>
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
                        d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z'
                      />
                    </svg>
                    {jobIdParams ? job?.jobType : jobApply.viewData.job.jobType}
                  </div>
                  <div className='flex text-base text-slate-600 font-sans font-medium'>
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
                        d='M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z'
                      />
                    </svg>
                    {jobIdParams
                      ? job?.workType
                      : jobApply.viewData.job.workType}
                  </div>
                </div>
              </div>
            </div>
            <div className='pl-10 pr-6'>
              <div className='box-content h-auto w-full  pt-2 '>
                <h1 className='text-lg font-sans font-bold'>Job Description</h1>
                <p className=''>
                  {jobIdParams
                    ? job?.jobDescription
                    : jobApply.viewData.job.jobDescription}
                </p>
              </div>
              <div className='box-content h-auto w-full pt-2 '>
                <div className='pt-6 '>
                  <h1 className='text-lg font-sans font-bold'>Requirements</h1>
                  <ul className='list-disc pl-4'>
                    {jobIdParams
                      ? job?.jobRequirements.map((data, i) => (
                          <li key={i}>{data}</li>
                        ))
                      : jobApply.viewData.job.jobRequirements.map((data, i) => (
                          <li key={i}>{data}</li>
                        ))}
                  </ul>
                </div>
                <div className='pt-6 '>
                  <h1 className='text-lg font-sans font-bold'>Expectations</h1>
                  <ul className='list-disc pl-4'>
                    {jobIdParams
                      ? job?.jobExpectations.map((data, i) => (
                          <li key={i}>{data}</li>
                        ))
                      : jobApply.viewData.job.jobExpectations.map((data, i) => (
                          <li key={i}>{data}</li>
                        ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ViewJob
