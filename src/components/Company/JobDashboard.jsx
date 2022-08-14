import React from 'react'
import {
  MdOutlineRemoveRedEye,
  MdOutlineEdit,
  MdDeleteOutline,
  MdSearch,
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { MockData } from './TestData'

const JobDashboard = () => {
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
              <tbody>
                {MockData.map((data) => (
                  <tr
                    key={data.id}
                    className='bg-white border-b hover:bg-gray-50'
                  >
                    <td className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'>
                      {data.job_title}
                    </td>
                    <td className='py-4 px-6'>{data.job_category}</td>
                    <td className='py-4 px-6'>{data.posted}</td>
                    <td className='py-4 px-6'>{data.no_of_position}</td>
                    <td className='flex items-center py-4 px-6 space-x-3'>
                      <MdOutlineRemoveRedEye className='text-lg cursor-pointer' />
                      <MdOutlineEdit className='text-lg text-blue-500 cursor-pointer' />
                      <MdDeleteOutline className='text-lg text-red-500 cursor-pointer' />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDashboard
