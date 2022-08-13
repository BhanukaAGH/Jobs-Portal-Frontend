import React from 'react'

const CompanyDashboard = () => {
  return (
    <div className='w-full h-full bg-[#F9FAFF]'>
      {/* Title Section */}
      <div className='dashboard-title'>
        <h3 className='text-lg md:text-2xl xl:text-3xl'>Company Details</h3>
        <div>
          <button className='dashbord-title-button'>Edit</button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className='dashboard-content'>
        <div className='grid grid-cols-12 w-full h-full px-3 md:px-6 py-6 overflow-auto scrollbar-thin !scrollbar-track-gray-200 !scrollbar-thumb-gray-800'>
          <div className='col-span-12 lg:col-span-9 w-full h-full'>
            <form className='grid grid-cols-6 gap-3 pr-12'>
              <div className='col-span-6 lg:col-span-3'>
                <label
                  htmlFor='company-name'
                  className='mb-2 block text-sm font-medium text-gray-900'
                >
                  Company name
                </label>
                <input
                  type='text'
                  name='company-name'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                  placeholder='company name'
                />
              </div>

              <div className='col-span-6 lg:col-span-3'>
                <label
                  htmlFor='company-email'
                  className='mb-2 block text-sm font-medium text-gray-900'
                >
                  Company email
                </label>
                <input
                  type='email'
                  name='company-email'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                  placeholder='company email'
                />
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='company-website'
                  className='mb-2 block text-sm font-medium text-gray-900'
                >
                  Company website{' '}
                  <span className='text-[#333333]/50'>(optional)</span>
                </label>
                <input
                  type='url'
                  name='company-website'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                  placeholder='company website url'
                />
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='company-location'
                  className='mb-2 block text-sm font-medium text-gray-900'
                >
                  Company location
                </label>
                <input
                  type='text'
                  name='company-location'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                  placeholder='company location'
                />
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='company-employees'
                  className='block text-sm font-medium text-gray-700'
                >
                  Company's number of employees
                </label>
                <select
                  id='company-employees'
                  name='company-employees'
                  autoComplete='country-name'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                >
                  <option>1 to 49</option>
                  <option>50 to 149</option>
                  <option>150 to 249</option>
                  <option>250 to 499</option>
                  <option>500 to 749</option>
                  <option>750 to 999</option>
                  <option>1000+</option>
                </select>
              </div>

              <div className='col-span-6'>
                <label
                  htmlFor='company-description'
                  className='mb-2 block text-sm font-medium text-gray-900'
                >
                  Company description
                </label>
                <textarea
                  name='company-description'
                  rows='3'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500'
                  placeholder='company description'
                />
              </div>
            </form>
          </div>

          <div className='order-first lg:order-none col-span-12 lg:col-span-3 w-full h-full'>
            <div className='flex items-center justify-center w-48 h-48 bg-white p-6 shadow-lg rounded-xl mb-8'>
              <img
                src='https://img.icons8.com/color/48/000000/google-logo.png'
                alt='company-logo'
                className='w-24 object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard
