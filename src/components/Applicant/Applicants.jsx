import React, { useEffect } from 'react'
import { TiArrowLeft } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  applicantUpdate,
  getAllJobApplicants,
  reset,
} from '../../features/applicant/applicantSlice'
import ApplicantCard from './ApplicantCard'
import Loading from '../Loading'

const Applicants = ({ selectJob, setSelectRow, setViewResume }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const {
    updateApplicant,
    applicants,
    isSuccess,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.applicant)

  useEffect(() => {
    dispatch(
      getAllJobApplicants({ companyId: user?.userId, jobId: selectJob._id })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSuccess && updateApplicant) {
      dispatch(applicantUpdate(null))
      dispatch(
        getAllJobApplicants({ companyId: user?.userId, jobId: selectJob._id })
      )
    }

    if (isError) {
      toast(message, { type: 'error' })
    }
    dispatch(reset())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isLoading, isError, message, dispatch])

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

      {isLoading ? (
        <Loading />
      ) : (
        <div className='grid grid-cols-1 w-full px-4 pb-8 pt-4'>
          {applicants?.length > 0 ? (
            <div className='col-span-1 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4'>
              {applicants.map((applicant, index) => (
                <ApplicantCard
                  key={index}
                  applicant={applicant}
                  setViewResume={setViewResume}
                />
              ))}
            </div>
          ) : (
            <div className='col-span-1 font-medium font-[Poppins] text-black text-lg text-center py-3'>
              Not Applicants yet
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Applicants
