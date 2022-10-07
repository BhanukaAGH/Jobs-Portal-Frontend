import moment from 'moment'
import React from 'react'
import { MdDone, MdClear } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { updateApplicantStatus } from '../../features/applicant/applicantSlice'

const ApplicantCard = ({ applicant, setViewResume }) => {
  const dispatch = useDispatch()

  return (
    <div className='relative block p-8 overflow-hidden border border-gray-200 rounded-lg h-full select-none'>
      <span className='absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'></span>

      <div className='justify-between sm:flex'>
        <div>
          <h5 className='text-xl font-bold text-gray-900'>
            {applicant?.userID?.name}
          </h5>
          <p className='mt-1 text-xs font-medium text-gray-600'>
            {applicant?.ResumeID?.PrimaryRole}
          </p>
          <p
            onClick={() => setViewResume(applicant?.ResumeID?.CV)}
            className='text-xs font-medium text-blue-600 underline cursor-pointer'
          >
            resume
          </p>
        </div>

        <div className='flex-shrink-0 hidden ml-3 sm:block'>
          <img
            className='object-cover w-16 h-16 rounded-lg shadow-sm'
            src={applicant?.userID?.photoUrl}
            alt='user-profile'
          />
        </div>
      </div>

      <div className='mt-4 sm:pr-8'>
        <p className='text-sm text-gray-500'>
          {applicant?.ResumeID?.Statement}
        </p>
      </div>

      <dl className='flex justify-between mt-6'>
        <div className='flex'>
          <div className='flex flex-col-reverse'>
            <dt className='text-sm font-medium text-gray-600'>Applied</dt>
            <dd className='text-xs text-gray-500'>
              {moment(applicant?.createdAt).format('Do MMM, yyyy')}
            </dd>
          </div>
          {/* 31st June, 2021 */}
          <div className='hidden sm:flex flex-col-reverse ml-3 sm:ml-6'>
            <dt className='text-sm font-medium text-gray-600'>Job status</dt>
            <dd
              data-content={applicant?.ApplicationStatus}
              className='text-xs text-gray-500 apply-state'
            >
              {applicant?.ApplicationStatus}
            </dd>
          </div>
        </div>
        <div className='flex space-x-2 items-end text-lg font-medium'>
          <button
            data-tip='Reject'
            onClick={() =>
              dispatch(
                updateApplicantStatus({
                  appliedJobId: applicant._id,
                  applicantStatus: 'rejected',
                })
              )
            }
            className='bg-red-200 text-red-600 px-3 py-1 rounded-md'
          >
            <MdClear />
          </button>
          <button
            data-tip='Accept'
            onClick={() =>
              dispatch(
                updateApplicantStatus({
                  appliedJobId: applicant._id,
                  applicantStatus: 'accepted',
                })
              )
            }
            className='bg-blue-200 text-blue-700 px-3 py-1 rounded-md'
          >
            <MdDone />
          </button>
        </div>
      </dl>
      <ReactTooltip
        place='bottom'
        type='dark'
        effect='solid'
        className='!py-1 !px-4 !rounded-md'
      />
    </div>
  )
}

export default ApplicantCard
