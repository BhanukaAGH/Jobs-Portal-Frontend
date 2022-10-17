import React, { useState, useEffect } from 'react'
import api from '../../utils/api'
import moment from 'moment'
import generatePDF from '../../utils/AdminEventsReport'
import { useSelector } from 'react-redux'

const EventReport = () => {
  const { user } = useSelector((state) => state.auth)
  const [reportData, setReportData] = useState([])
  //total applied count
  const [total, setTotal] = useState(1)

  const getEventsData = async () => {
    const API_URL = `adminreport/eventreport`
    const response = await api.get(API_URL)
    console.log(response.data)
    setTotal(response.data.totalapplied)
    setReportData(response.data.report)
  }
  let asc = (a, b) => (a.report.length < b.report.length ? 1 : -1)

  useEffect(() => {
    getEventsData()
    console.log('user', user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full h-full bg-[#F9FAFF]'>
      {/* Title Section */}
      <div className='dashboard-title'>
        <h3 className='text-lg md:text-2xl xl:text-3xl'>Events Report</h3>
        <div className='space-x-3'>
          <button
            className='dashbord-title-button bg-white text-black border border-black hidden md:inline-block'
            onClick={() => generatePDF(reportData, total, user.name)}
          >
            Download Report
          </button>
        </div>
      </div>
      {/* Dashboard Content */}
      <div className='dashboard-content'>
        <div className='flex flex-1 overflow-hidden relative h-full w-full'>
          <div className='absolute inset-0 overflow-auto !scrollbar-thin !scrollbar-track-gray-200 !scrollbar-thumb-gray-800'>
            <div className='overflow-x-auto relative p-2 pt-4'>
              <table className='w-full text-sm text-left text-gray-400'>
                <thead className='text-xs uppercase bg-gray-300  text-gray-400'>
                  <tr>
                    <th scope='col' className='py-3  text-black px-6'>
                      Event Posted Date
                    </th>
                    <th scope='col' className='py-3 text-black px-6'>
                      Event Hosting Date
                    </th>
                    <th scope='col' className='py-3 text-black px-6'>
                      Company Name
                    </th>
                    <th scope='col' className='py-3 text-black px-6'>
                      Event Name
                    </th>
                    <th scope='col' className='py-3 text-black px-6'>
                      Event Sign-up Count
                    </th>
                    <th scope='col' className='py-3 text-black px-6'>
                      Event Sign-up Rate
                    </th>
                    <th scope='col' className='py-3 text-black px-6'>
                      Event Mode
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* render data in ascending order */}
                  {reportData.sort(asc).map((data) => (
                    <tr
                      key={data._id}
                      className='bg-white border-b border-gray-600'
                    >
                      <td className='py-2 text-black px-6'>
                        {moment(data.createdAt).utc().format('YYYY-MM-DD')}
                      </td>
                      <td className='py-2 text-black px-6'>
                        {moment(data.date).utc().format('YYYY-MM-DD')}
                      </td>
                      <td className='py-2 text-black px-6'>
                        {data.company.name}
                      </td>
                      <td className='py-2 text-black px-6'>
                        {data.eventTitle}
                      </td>
                      <td className='py-2 text-black px-6'>
                        {data.report.length}
                      </td>
                      <td className='py-2 text-black px-6'>
                        {Math.round((data.report.length * 100) / total)}%
                      </td>
                      <td className='py-2 text-black px-6'>
                        {data.deliveryType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventReport
